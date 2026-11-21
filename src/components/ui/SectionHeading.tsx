import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  description,
  className,
  tone = "light",
}: {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <header className={cn("max-w-2xl", className)}>
      <p className="flex items-center gap-3" data-reveal>
        <span className="h-px w-8 bg-gold" aria-hidden="true" />
        <span className="label">{kicker}</span>
      </p>
      <h2
        data-split
        className={cn(
          "font-display mt-5 text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.25rem]",
          tone === "dark" ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          data-reveal
          data-delay="0.1"
          className={cn(
            "mt-5 max-w-xl text-base leading-7",
            tone === "dark" ? "text-cream/70" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
