import type { Metadata } from "next";
import { PrintButton } from "@/components/resume/PrintButton";
import { experiences } from "@/data/experience";
import { disciplines } from "@/data/expertise";
import { getFeaturedProjects } from "@/data/projects";
import { site } from "@/data/site";
import { formatPeriod } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, ${site.title}.`,
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="bg-bg py-12 sm:py-16">
      <div className="mx-auto max-w-[820px] px-5 print:max-w-none print:px-0">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <p className="text-sm text-muted">Print this page to save a PDF.</p>
          <PrintButton />
        </div>

        <article className="border border-line bg-bg-2 p-8 sm:p-12 print:border-0 print:p-0">
          <header className="border-b border-line pb-6">
            <h1 className="font-display text-4xl font-semibold text-ink">{site.name}</h1>
            <p className="mt-2 text-forest">{site.title}</p>
            <p className="mt-3 text-sm text-muted">
              {site.location} · {site.email} · {site.github.replace("https://", "")}
            </p>
          </header>

          <section className="mt-8">
            <h2 className="label">Profile</h2>
            <p className="mt-3 text-sm leading-7 text-ink">{site.hero.description}</p>
          </section>

          <section className="mt-8">
            <h2 className="label">Experience</h2>
            <div className="mt-4 space-y-5">
              {experiences.map((role) => (
                <div key={role.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {role.title} — {role.company}
                    </h3>
                    <p className="text-sm text-muted">{formatPeriod(role.start, role.end)}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{role.summary}</p>
                  {role.recognition ? (
                    <p className="mt-1 text-sm text-gold">{role.recognition.title}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="label">Selected work</h2>
            <div className="mt-4 space-y-4">
              {featured.map((project) => (
                <div key={project.slug}>
                  <h3 className="font-display text-lg font-semibold text-ink">{project.name}</h3>
                  <p className="text-sm text-muted">{project.category}</p>
                  <p className="mt-1 text-sm leading-6 text-ink">{project.purpose}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="label">Expertise</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {disciplines.map((discipline) => (
                <div key={discipline.id}>
                  <h3 className="text-sm font-semibold text-forest">{discipline.title}</h3>
                  {discipline.groups.map((group) => (
                    <p key={group.title} className="mt-2 text-sm leading-6 text-ink">
                      <span className="text-muted">{group.title}: </span>
                      {group.items.join(", ")}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
