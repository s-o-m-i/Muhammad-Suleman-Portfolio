import Link from "next/link";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Project, ProjectImage } from "@/data/projects";
import { cn } from "@/lib/utils";

export type Tone = "light" | "dark";

export function hostOf(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export function Shot({
  image,
  href,
  host,
  sizes,
  aspect = "16 / 10",
  position = "top",
  clip = "up",
  tone = "light",
  chrome = true,
  className,
}: {
  image: ProjectImage;
  href?: string;
  host?: string;
  sizes: string;
  aspect?: string;
  position?: "top" | "center";
  clip?: "up" | "down" | "left" | "right";
  tone?: Tone;
  chrome?: boolean;
  className?: string;
}) {
  const frame = (
    <div
      data-clip={clip}
      className={cn(
        "overflow-hidden border",
        tone === "dark"
          ? "border-cream/10 bg-pine-deep shadow-[0_60px_120px_-60px_rgba(0,0,0,0.7)]"
          : "border-line bg-bg-2 shadow-[0_40px_90px_-55px_rgba(16,43,35,0.45)]",
      )}
    >
      {chrome ? (
        <div
          className={cn(
            "flex h-7 items-center gap-1.5 border-b px-3 sm:h-8",
            tone === "dark" ? "border-cream/10 text-cream/50" : "border-line text-muted",
          )}
          aria-hidden="true"
        >
          <span className="h-2 w-2 rounded-full bg-current opacity-40" />
          <span className="h-2 w-2 rounded-full bg-current opacity-40" />
          <span className="h-2 w-2 rounded-full bg-current opacity-40" />
          {host ? (
            <span className="ml-3 truncate text-[0.65rem] tracking-wide">{host}</span>
          ) : null}
        </div>
      ) : null}
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/shot:scale-[1.035]">
          <SmartImage
            data-clip-inner
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className={cn("object-cover", position === "top" ? "object-top" : "object-center")}
          />
        </div>
      </div>
    </div>
  );

  if (!href) return <div className={className}>{frame}</div>;

  return (
    <Link href={href} tabIndex={-1} className={cn("group/shot block", className)}>
      {frame}
    </Link>
  );
}

export function ChapterIndex({
  number,
  kicker,
  tone = "light",
}: {
  number: string;
  kicker: string;
  tone?: Tone;
}) {
  return (
    <p className="flex items-center gap-3" data-reveal>
      <span className="font-display text-sm font-semibold tabular-nums text-gold">{number}</span>
      <span
        data-draw
        aria-hidden="true"
        className={cn("h-px w-10", tone === "dark" ? "bg-gold/60" : "bg-gold/70")}
      />
      <span className="label">{kicker}</span>
    </p>
  );
}

export function Meta({
  label,
  children,
  tone = "light",
  className,
}: {
  label: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("border-t pt-4", tone === "dark" ? "border-cream/15" : "border-line", className)}>
      <p className="label">{label}</p>
      <p className={cn("mt-2 text-sm leading-6", tone === "dark" ? "text-cream/85" : "text-ink")}>
        {children}
      </p>
    </div>
  );
}

export function CaseLinks({ project, tone = "light" }: { project: Project; tone?: Tone }) {
  const host = hostOf(project.liveUrl);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <Link
        href={`/work/${project.slug}`}
        className={cn(
          "group/link inline-flex items-center gap-3 rounded-full py-2.5 pr-2.5 pl-5 text-sm font-medium transition-opacity hover:opacity-90",
          tone === "dark" ? "bg-cream text-pine" : "bg-btn text-btn-text",
        )}
      >
        Read case study
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover/link:rotate-45",
            tone === "dark" ? "bg-pine text-cream" : "bg-btn-text/15",
          )}
          aria-hidden="true"
        >
          <IconArrowUpRight size={14} />
        </span>
        <span className="sr-only">: {project.name}</span>
      </Link>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1.5 text-sm underline decoration-gold/50 underline-offset-[6px] transition-colors hover:decoration-gold",
            tone === "dark" ? "text-cream" : "text-forest",
          )}
        >
          {host ? `Visit ${host}` : "Visit live site"}
          <IconArrowUpRight size={14} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  );
}
