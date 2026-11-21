"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MotionScope } from "@/components/motion/MotionScope";
import { Container } from "@/components/ui/Container";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { SmartImage } from "@/components/ui/SmartImage";
import { ProjectChapter } from "@/components/work/Chapters";
import {
  getFeaturedProjects,
  projectFilters,
  projects,
  type ProjectFilter,
} from "@/data/projects";
import { cn } from "@/lib/utils";

type ActiveFilter = "all" | ProjectFilter;

const featuredOrder = getFeaturedProjects().map((project) => project.slug);

function numberFor(slug: string) {
  return String(featuredOrder.indexOf(slug) + 1).padStart(2, "0");
}

export function Work() {
  const [filter, setFilter] = useState<ActiveFilter>("all");
  const [showMore, setShowMore] = useState(false);

  const visible = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.filters.includes(filter));
  }, [filter]);

  const featured = visible.filter((project) => project.featured);
  const additional = visible.filter((project) => !project.featured);

  return (
    <MotionScope as="section" id="work" deps={[filter, showMore]} className="relative">
      <Container className="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <header className="lg:col-span-7">
            <p className="flex items-center gap-3" data-reveal>
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="label">Selected Work</span>
            </p>
            <h2
              data-split
              className="font-display mt-6 text-[2.15rem] leading-[1.08] font-semibold tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.5rem]"
            >
              Projects that show how I build — and how I think about discovery.
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-base leading-7 text-muted">
              Each featured piece is a real product or client platform, presented as a case study
              rather than a stack badge list.
            </p>
          </header>

          <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
            <nav aria-label="Featured projects" data-reveal>
              <ol className="border-t border-line">
                {featured.map((project) => (
                  <li key={project.slug} className="border-b border-line">
                    <a
                      href={`#work-${project.slug}`}
                      className="group flex items-baseline gap-4 py-3 text-sm text-ink transition-colors hover:text-forest"
                    >
                      <span className="font-display text-xs font-semibold tabular-nums text-gold">
                        {numberFor(project.slug)}
                      </span>
                      <span className="font-display font-semibold">{project.name}</span>
                      <span className="ml-auto text-muted transition-transform duration-300 group-hover:translate-y-0.5">
                        ↓
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects" data-reveal>
              {projectFilters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={filter === item.id}
                  onClick={() => {
                    setFilter(item.id);
                    if (item.id !== "all") setShowMore(true);
                  }}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                    filter === item.id
                      ? "border-forest bg-forest text-btn-text dark:text-forest-deep"
                      : "border-line text-muted hover:border-gold hover:text-ink",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div>
        {featured.map((project) => (
          <ProjectChapter key={project.slug} project={project} number={numberFor(project.slug)} />
        ))}
      </div>

      {additional.length > 0 ? (
        <Container className="py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="label" data-reveal>
                Additional work
              </p>
              <h3
                data-split
                className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                More builds across agencies, CMS and products.
              </h3>
            </div>
            {!showMore ? (
              <button
                type="button"
                onClick={() => setShowMore(true)}
                aria-expanded={false}
                aria-controls="additional-work"
                className="inline-flex items-center gap-2 rounded-full border border-forest px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-btn-text dark:hover:text-forest-deep"
              >
                View more projects ({additional.length})
              </button>
            ) : (
              <p className="text-sm text-muted">{additional.length} projects</p>
            )}
          </div>

          {showMore ? (
            <ul id="additional-work" data-reveal-group data-stagger="0.06">
              {additional.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 border-b border-line py-5 sm:grid-cols-[9rem_1.2fr_1fr_auto] sm:gap-8"
                  >
                    <span className="relative block aspect-[16/10] overflow-hidden border border-line bg-bg-2">
                      <SmartImage
                        src={project.cover.src}
                        alt=""
                        fill
                        sizes="144px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </span>
                    <span>
                      <span className="font-display block text-lg font-semibold text-ink transition-colors group-hover:text-forest sm:text-xl">
                        {project.name}
                      </span>
                      <span className="mt-1 block text-xs text-muted sm:hidden">{project.category}</span>
                    </span>
                    <span className="hidden text-sm leading-6 text-muted sm:block">
                      {project.category}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-forest transition-[transform,border-color] duration-300 group-hover:rotate-45 group-hover:border-gold"
                    >
                      <IconArrowUpRight size={15} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      ) : null}

      {visible.length === 0 ? (
        <Container className="pb-20">
          <p className="text-sm text-muted">No projects in this category yet.</p>
        </Container>
      ) : null}
    </MotionScope>
  );
}
