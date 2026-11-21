import Image from "next/image";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight, IconDownload, IconPin } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { site, socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const disciplines = [
  { label: "Software Engineering", value: "MERN Stack · Next.js · TypeScript · SaaS" },
  { label: "SEO & Growth", value: "Technical SEO · Keyword Research · On-Page SEO · Organic Growth" },
];

const facts = [
  { label: "Based in", value: site.location },
  { label: "Practice", value: "Engineering + SEO" },
  { label: "Currently", value: "Building professionally" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-14">
      <Container>
        <HeroMotion>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <p data-intro="label" className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="label">{site.hero.kicker}</span>
            </p>
            <p data-intro="meta" className="hidden items-center gap-2 text-sm text-muted sm:inline-flex">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold/50 [animation-duration:2.4s]" />
                <span className="relative h-2 w-2 rounded-full bg-gold" />
              </span>
              {site.availability.label}
            </p>
          </div>

          <h1 className="font-display mt-7 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-ink sm:mt-9 sm:text-[clamp(3rem,5.7vw,4.75rem)]">
            {site.hero.headline.map((line, index) => (
              <span key={line} className="mask-line block overflow-hidden">
                <span data-intro="line" className={cn("block", index === 1 && "text-forest")}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-10 grid gap-14 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6 lg:pt-4">
              <p
                data-intro="copy"
                className="max-w-xl text-base leading-7 text-muted sm:text-[1.075rem] sm:leading-8"
              >
                {site.hero.description}
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {disciplines.map((item, index) => (
                  <div key={item.label} data-intro="copy" className="border-t border-line pt-4">
                    <p className="flex items-baseline gap-3">
                      <span className="font-display text-xs font-semibold tabular-nums text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="label">{item.label}</span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink">{item.value}</p>
                  </div>
                ))}
              </div>

              <div data-intro="cta" className="mt-10 flex flex-wrap items-center gap-3">
                <Button href="/#work">Explore My Work</Button>
                <Button href={site.resumePath} variant="secondary">
                  <IconDownload />
                  Download Resume
                </Button>
                <Button href="/#contact" variant="ghost">
                  Let&apos;s Talk
                  <IconArrowUpRight />
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[25rem] sm:max-w-[28rem] lg:col-span-5 lg:col-start-8 lg:max-w-none">
              <div className="relative pr-6 pb-14 pl-10 sm:pl-14">
                <div
                  data-intro="panel"
                  aria-hidden="true"
                  className="absolute top-16 bottom-0 left-0 w-[72%] bg-pine"
                />
                <div
                  data-intro="frame"
                  aria-hidden="true"
                  className="absolute -top-4 right-0 bottom-24 left-20 border border-gold/45 sm:left-24"
                />
                <figure className="relative">
                  <div
                    data-intro="portrait"
                    className="relative aspect-[4/5] overflow-hidden bg-bg-2 shadow-[0_40px_80px_-40px_rgba(16,43,35,0.45)]"
                  >
                    <div data-hero-parallax className="absolute inset-x-0 -top-[4%] -bottom-[8%]">
                      <Image
                        data-intro-inner
                        src={site.portrait.src}
                        alt={site.portrait.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 420px, (min-width: 640px) 26rem, 90vw"
                        className="object-cover object-[50%_25%]"
                      />
                    </div>
                  </div>
                  <figcaption
                    data-intro="meta"
                    className="mt-4 max-w-[62%] text-xs leading-5 text-cream/75"
                  >
                    <span className="font-display block text-sm font-semibold text-cream">
                      {site.name}
                    </span>
                    {site.title}
                  </figcaption>
                </figure>
              </div>

              <div
                data-intro="meta"
                className="mt-5 flex flex-wrap items-center justify-between gap-3 pl-10 text-sm text-muted sm:pl-14"
              >
                <span className="inline-flex items-center gap-2">
                  <IconPin />
                  {site.location}
                </span>
                <span className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1 text-forest transition-colors hover:text-gold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                      <IconArrowUpRight size={14} />
                    </a>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <dl className="mt-16 grid border-y border-line sm:mt-20 sm:grid-cols-3">
            {facts.map((item, index) => (
              <div
                key={item.label}
                data-intro="meta"
                className={cn(
                  "flex items-baseline justify-between gap-4 py-4 sm:block sm:px-6 sm:py-5",
                  index > 0 && "border-t border-line sm:border-t-0 sm:border-l",
                  index === 0 && "sm:pl-0",
                )}
              >
                <dt className="label">{item.label}</dt>
                <dd className="text-sm text-ink sm:mt-2">{item.value}</dd>
              </div>
            ))}
          </dl>
        </HeroMotion>
      </Container>
    </section>
  );
}
