import { Container } from "@/components/ui/Container";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { CaseLinks, ChapterIndex, Meta, Shot, hostOf } from "./parts";

type ChapterProps = { project: Project; number: string };

function caseHref(project: Project) {
  return `/work/${project.slug}`;
}

function titleId(project: Project) {
  return `work-${project.slug}-title`;
}

/* 01 — Flagship: full-bleed pine surface, oversized title, tilted browser plate. */
function FitnessAddaChapter({ project, number }: ChapterProps) {
  const [main, listing] = project.images;
  const host = hostOf(project.liveUrl);
  const highlights = [0, 1, 5, 6].map((index) => project.features[index]).filter(Boolean);

  return (
    <article
      id={`work-${project.slug}`}
      aria-labelledby={titleId(project)}
      className="relative overflow-hidden bg-pine text-cream"
    >
      <span
        aria-hidden="true"
        data-parallax="12"
        className="numeral-outline font-display pointer-events-none absolute -top-[0.12em] -right-[0.04em] text-[clamp(10rem,34vw,30rem)] leading-none font-bold tracking-tighter select-none"
      >
        {number}
      </span>

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <ChapterIndex number={number} kicker="Flagship product" tone="dark" />
        <p className="mt-4 text-sm text-cream/60" data-reveal>
          {project.category}
        </p>
        <h3
          id={titleId(project)}
          data-split
          className="font-display mt-6 text-[clamp(3rem,11.5vw,9.5rem)] leading-[0.92] font-semibold tracking-[-0.045em]"
        >
          {project.name}
        </h3>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <p
            data-reveal
            className="text-lg leading-8 font-light text-cream/85 sm:text-xl sm:leading-9 lg:col-span-6"
          >
            {project.purpose}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:grid-cols-1" data-reveal-group>
            <Meta label="Role" tone="dark">
              {project.role}
            </Meta>
            <Meta label="Stack" tone="dark">
              {project.stack.join(" · ")}
            </Meta>
            <div className="sm:col-span-2 lg:col-span-1">
              <CaseLinks project={project} tone="dark" />
            </div>
          </div>
        </div>

        <div className="relative mt-16 sm:mt-20 lg:mt-24 lg:pb-20">
          <div data-tilt className="relative z-10 lg:w-[84%]">
            <Shot
              image={main}
              href={caseHref(project)}
              host={host}
              tone="dark"
              sizes="(min-width: 1280px) 940px, (min-width: 1024px) 84vw, 92vw"
            />
          </div>
          {listing ? (
            <div className="relative z-20 -mt-8 ml-auto w-[72%] sm:-mt-20 sm:w-[54%] lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-[40%]">
              <div data-parallax="-10">
                <Shot
                  image={listing}
                  href={caseHref(project)}
                  host={host}
                  tone="dark"
                  clip="right"
                  sizes="(min-width: 1024px) 440px, 60vw"
                />
              </div>
            </div>
          ) : null}
        </div>

        <ol
          className="mt-16 grid border-t border-cream/15 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          data-reveal-group
        >
          {highlights.map((feature, index) => (
            <li
              key={feature}
              className={cn(
                "border-b border-cream/15 py-6 sm:pr-6 lg:border-b-0 lg:px-6",
                index === 0 && "lg:pl-0",
                index > 0 && "lg:border-l",
              )}
            >
              <span className="font-display text-xs font-semibold tabular-nums text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm leading-6 text-cream/80">{feature}</p>
            </li>
          ))}
        </ol>
      </Container>
    </article>
  );
}

/* 02 — Warm minimal: arch with a 33-bead ring, quiet type, SEO architecture grid. */
function BeadArch({ host }: { host?: string }) {
  const beads = Array.from({ length: 33 }, (_, index) => {
    const angle = (index / 33) * Math.PI * 2 - Math.PI / 2;
    return {
      cx: Number((100 + 72 * Math.cos(angle)).toFixed(2)),
      cy: Number((100 + 72 * Math.sin(angle)).toFixed(2)),
      lead: index === 0,
    };
  });

  return (
    <div
      data-clip="up"
      className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-t-full border border-gold/50 bg-bg sm:max-w-[26rem]"
    >
      <div className="absolute inset-3 rounded-t-full border border-forest/15" aria-hidden="true" />
      <div className="absolute inset-x-0 top-[18%] flex justify-center" aria-hidden="true">
        <div data-parallax="6" className="w-[78%]">
          <svg viewBox="0 0 200 200" className="h-auto w-full">
            <circle cx="100" cy="100" r="88" fill="none" className="stroke-gold/40" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="56" fill="none" className="stroke-forest/20" strokeWidth="0.5" />
            <g data-pop data-stagger="0.03">
              {beads.map((bead) => (
                <circle
                  key={`${bead.cx}-${bead.cy}`}
                  cx={bead.cx}
                  cy={bead.cy}
                  r={bead.lead ? 5.5 : 3.4}
                  className={bead.lead ? "fill-gold" : "fill-forest"}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-10 text-center">
        <p className="label">Digital Dhikr</p>
        {host ? <p className="mt-2 text-sm text-muted">{host}</p> : null}
      </div>
    </div>
  );
}

function TasbihHubChapter({ project, number }: ChapterProps) {
  const pillars = [
    { title: "Next.js product", body: project.features[0] },
    { title: "SEO architecture", body: project.features[2] },
    { title: "Technical SEO", body: project.features[3] },
    { title: "Content strategy", body: project.features[4] },
  ].filter((pillar) => pillar.body);

  return (
    <article
      id={`work-${project.slug}`}
      aria-labelledby={titleId(project)}
      className="relative overflow-hidden bg-bg-2"
    >
      <Container className="py-20 sm:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <ChapterIndex number={number} kicker={project.editorialCover?.kicker ?? "Web + SEO"} />
            <h3
              id={titleId(project)}
              data-split
              className="font-display mt-6 text-5xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl"
            >
              {project.name}
            </h3>
            {project.editorialCover ? (
              <p
                data-split
                data-delay="0.15"
                className="font-display mt-6 max-w-md text-2xl leading-snug font-light text-forest sm:text-[2rem]"
              >
                {project.editorialCover.title}
              </p>
            ) : null}
            <p data-reveal className="mt-6 max-w-lg text-base leading-8 text-muted">
              {project.purpose}
            </p>
            <div className="mt-8 max-w-lg" data-reveal>
              <Meta label="Role">{project.role}</Meta>
            </div>
            <div className="mt-8" data-reveal>
              <CaseLinks project={project} />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <BeadArch host={hostOf(project.liveUrl)} />
          </div>
        </div>

        <ol
          className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
          data-reveal-group
        >
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className="bg-bg-2 p-6">
              <span className="font-display text-xs font-semibold tabular-nums text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="font-display mt-3 text-base font-semibold text-ink">{pillar.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </article>
  );
}

/* 03 — SaaS: workflow rail above a full-width product plate. */
function ExpressChartNoteChapter({ project, number }: ChapterProps) {
  const [main] = project.images;
  const workflow = [
    "Patients complete structured, multi-step reports",
    "Doctors review submitted reports",
    "Access is gated by Stripe subscription plans",
    "Reports are managed and printed in one place",
  ];

  return (
    <article
      id={`work-${project.slug}`}
      aria-labelledby={titleId(project)}
      className="relative overflow-hidden bg-bg"
    >
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute top-10 right-4 text-[clamp(6rem,16vw,13rem)] leading-none font-bold tracking-tighter text-gold/10 select-none sm:right-10"
      >
        {number}
      </span>
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <ChapterIndex number={number} kicker="Healthcare SaaS" />
        <h3
          id={titleId(project)}
          data-split
          className="font-display mt-6 text-[clamp(2.1rem,8.6vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-ink"
        >
          {project.name}
        </h3>
        <p data-reveal className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          {project.purpose}
        </p>

        <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span
            data-draw
            aria-hidden="true"
            className="absolute top-[7px] right-0 left-0 hidden h-px bg-gold/50 lg:block"
          />
          {workflow.map((step, index) => (
            <li key={step} className="relative" data-reveal data-delay={String(0.1 * index)}>
              <span
                aria-hidden="true"
                className="relative z-10 block h-[15px] w-[15px] rounded-full border border-gold bg-bg"
              />
              <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-forest uppercase">
                Step {index + 1}
              </p>
              <p className="mt-2 text-sm leading-6 text-ink">{step}</p>
            </li>
          ))}
        </ol>

        <Shot
          className="mt-14 lg:mt-16"
          image={main}
          href={caseHref(project)}
          host={hostOf(project.liveUrl)}
          aspect="1920 / 817"
          clip="left"
          sizes="(min-width: 1280px) 1100px, 92vw"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          <Meta label="Role" className="lg:col-span-3">
            {project.role}
          </Meta>
          <Meta label="Stack" className="lg:col-span-5">
            {project.stack.join(" · ")}
          </Meta>
          <div className="border-t border-line pt-4 lg:col-span-4">
            <CaseLinks project={project} />
          </div>
        </div>
      </Container>
    </article>
  );
}

/* 04 — Social video: copy column against a cascade of layered product screens. */
function ViddeonChapter({ project, number }: ChapterProps) {
  const [signup, feed, profile] = project.images;
  const host = hostOf(project.liveUrl);
  const layers = [
    { image: signup, place: "top-0 left-0", depth: 7, clip: "up" as const },
    { image: feed, place: "top-[22%] left-[8%]", depth: 0, clip: "left" as const },
    { image: profile, place: "top-[44%] left-[16%]", depth: -7, clip: "right" as const },
  ].filter((layer) => layer.image);

  return (
    <article
      id={`work-${project.slug}`}
      aria-labelledby={titleId(project)}
      className="relative overflow-hidden bg-bg-2"
    >
      <Container className="py-20 sm:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-4">
            <ChapterIndex number={number} kicker="Social video platform" />
            <h3
              id={titleId(project)}
              data-split
              className="font-display mt-6 text-6xl font-semibold tracking-[-0.045em] text-ink sm:text-7xl"
            >
              {project.name}
            </h3>
            <p data-reveal className="mt-6 text-base leading-8 text-muted">
              {project.purpose}
            </p>
            <ul className="mt-8 space-y-0 border-t border-line" data-reveal-group>
              {project.features.slice(0, 5).map((feature) => (
                <li
                  key={feature}
                  className="flex items-baseline gap-3 border-b border-line py-3 text-sm text-ink"
                >
                  <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-gold" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8" data-reveal>
              <Meta label="Role">{project.role}</Meta>
            </div>
            <div className="mt-8" data-reveal>
              <CaseLinks project={project} />
            </div>
          </div>

          <div className="relative lg:col-span-8">
            <div className="group/stack relative aspect-[5/4] sm:aspect-[4/3] lg:aspect-[16/12.5]">
              {layers.map((layer, index) => (
                <div
                  key={layer.image.src}
                  className={cn("absolute w-[84%]", layer.place)}
                  style={{ zIndex: index + 1 }}
                >
                  <div data-parallax={layer.depth || undefined}>
                    <div
                      className={cn(
                        "transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                        index === 0 && "group-hover/stack:-translate-x-2 group-hover/stack:-translate-y-2",
                        index === 2 && "group-hover/stack:translate-x-2 group-hover/stack:translate-y-2",
                      )}
                    >
                      <Shot
                        image={layer.image}
                        href={caseHref(project)}
                        host={host}
                        aspect="1912 / 841"
                        clip={layer.clip}
                        sizes="(min-width: 1024px) 560px, 75vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

/* 05 — E-commerce: asymmetric dark automotive mosaic on a light page. */
function QdoptixalChapter({ project, number }: ChapterProps) {
  const [hero, solutions, compare] = project.images;

  return (
    <article
      id={`work-${project.slug}`}
      aria-labelledby={titleId(project)}
      className="relative overflow-hidden bg-bg"
    >
      <Container className="py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <ChapterIndex number={number} kicker="E-commerce · WordPress" />
            <h3
              id={titleId(project)}
              data-split
              className="font-display mt-6 text-6xl font-semibold tracking-[-0.045em] text-ink sm:text-7xl lg:text-8xl"
            >
              {project.name}
            </h3>
          </div>
          <p data-reveal className="max-w-md text-base leading-8 text-muted lg:pb-2">
            {project.purpose}
          </p>
        </div>

        {hero ? (
          <Shot
            className="mt-12 sm:mt-14"
            image={hero}
            href={caseHref(project)}
            chrome={false}
            aspect="1891 / 820"
            position="center"
            sizes="(min-width: 1280px) 1100px, 92vw"
          />
        ) : null}
        <div className="mt-4 grid grid-cols-2 items-start gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-12">
          {solutions ? (
            <Shot
              className="lg:col-span-5 lg:mt-20"
              image={solutions}
              href={caseHref(project)}
              chrome={false}
              aspect="1093 / 840"
              clip="right"
              sizes="(min-width: 1024px) 460px, 46vw"
            />
          ) : null}
          {compare ? (
            <Shot
              className="lg:col-span-6 lg:col-start-7"
              image={compare}
              href={caseHref(project)}
              chrome={false}
              aspect="1204 / 825"
              clip="down"
              sizes="(min-width: 1024px) 560px, 46vw"
            />
          ) : null}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
          <Meta label="Role" className="lg:col-span-3">
            {project.role}
          </Meta>
          <Meta label="Built" className="lg:col-span-5">
            {project.features.slice(1).join(" · ")}
          </Meta>
          <div className="border-t border-line pt-4 sm:col-span-2 lg:col-span-4">
            <CaseLinks project={project} />
          </div>
        </div>
      </Container>
    </article>
  );
}

function DefaultChapter({ project, number }: ChapterProps) {
  const [main] = project.images;
  return (
    <article id={`work-${project.slug}`} aria-labelledby={titleId(project)} className="bg-bg">
      <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <ChapterIndex number={number} kicker={project.category} />
          <h3 id={titleId(project)} data-split className="font-display mt-6 text-5xl font-semibold text-ink">
            {project.name}
          </h3>
          <p data-reveal className="mt-5 text-base leading-8 text-muted">
            {project.purpose}
          </p>
          <div className="mt-8" data-reveal>
            <CaseLinks project={project} />
          </div>
        </div>
        {main ? (
          <Shot
            className="lg:col-span-7"
            image={main}
            href={caseHref(project)}
            host={hostOf(project.liveUrl)}
            sizes="(min-width: 1024px) 640px, 92vw"
          />
        ) : null}
      </Container>
    </article>
  );
}

const chapters: Record<string, (props: ChapterProps) => React.ReactElement> = {
  fitnessadda: FitnessAddaChapter,
  tasbihhub: TasbihHubChapter,
  expresschartnote: ExpressChartNoteChapter,
  viddeon: ViddeonChapter,
  qdoptixal: QdoptixalChapter,
};

export function ProjectChapter(props: ChapterProps) {
  const Chapter = chapters[props.project.slug] ?? DefaultChapter;
  return <Chapter {...props} />;
}
