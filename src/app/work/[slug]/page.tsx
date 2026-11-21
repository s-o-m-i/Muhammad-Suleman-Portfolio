import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { IconArrowLeft, IconArrowUpRight } from "@/components/ui/Icons";
import { SmartImage } from "@/components/ui/SmartImage";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

type WorkParams = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<WorkParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} — Case Study`;
  const description = project.purpose;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} | ${site.name}`,
      description,
      url: `/work/${project.slug}`,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<WorkParams>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);

  return (
    <article className="pb-24">
      <Container className="pt-10 sm:pt-14">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <IconArrowLeft size={15} />
          All work
        </Link>

        <p className="label mt-10">{project.category}</p>
        <h1 className="font-display mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
          {project.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{project.purpose}</p>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              className="inline-flex items-center gap-1 text-forest"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live site
              <IconArrowUpRight size={15} />
            </a>
          ) : null}
        </div>
      </Container>

      <div className="mt-12 bg-bg-2">
        <Container className="py-6">
          <SmartImage
            src={project.cover.src}
            alt={project.cover.alt}
            width={1600}
            height={1000}
            priority
            className="h-auto w-full object-cover"
          />
        </Container>
      </div>

      <Container className="mt-16 grid gap-12 lg:grid-cols-[1fr_280px]">
        <div className="max-w-3xl space-y-10">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Overview</h2>
            <p className="mt-4 text-base leading-8 text-muted">{project.description}</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Contribution</h2>
            <p className="mt-4 text-base leading-8 text-muted">{project.contribution}</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">What the product does</h2>
            <ul className="mt-4 space-y-2 text-base leading-8 text-ink">
              {project.features.map((feature) => (
                <li key={feature} className="border-l border-gold pl-4">
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="h-fit border border-line bg-bg-2 p-6">
          <p className="label">Stack</p>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {project.filters.includes("seo") ? (
            <p className="mt-6 text-sm leading-6 text-muted">
              This project is also presented under SEO &amp; Digital Growth because the work
              includes search-aware architecture and content structure. No rankings or traffic
              figures are claimed.
            </p>
          ) : null}
        </aside>
      </Container>

      {project.images.length > 1 ? (
        <Container className="mt-16 grid gap-5 md:grid-cols-2">
          {project.images.map((image) => (
            <figure key={image.src} className="bg-bg-2">
              <SmartImage
                src={image.src}
                alt={image.alt}
                width={1400}
                height={900}
                className="h-auto w-full object-cover"
              />
              <figcaption className="px-1 py-3 text-sm text-muted">{image.alt}</figcaption>
            </figure>
          ))}
        </Container>
      ) : null}

      <Container className="mt-20 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between">
        {previous ? (
          <Link href={`/work/${previous.slug}`} className="text-sm text-muted hover:text-ink">
            Previous — {previous.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="text-sm text-muted hover:text-ink sm:text-right">
            Next — {next.name}
          </Link>
        ) : null}
      </Container>
    </article>
  );
}
