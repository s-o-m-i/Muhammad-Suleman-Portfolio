import Image from "next/image";
import { MotionScope } from "@/components/motion/MotionScope";
import { ScrubStatement } from "@/components/motion/ScrubStatement";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export function About() {
  return (
    <MotionScope as="section" id="about" className="relative overflow-hidden border-y border-line bg-bg-2 py-24 sm:py-32">
      <Container>
        <p className="flex items-center gap-3" data-reveal>
          <span className="h-px w-8 bg-gold" aria-hidden="true" />
          <span className="label">About</span>
        </p>

        <h2 className="sr-only">About Muhammad Suleman</h2>
        <ScrubStatement
          text={site.brand.message}
          className="font-display mt-8 max-w-5xl text-[2.2rem] leading-[1.08] font-semibold tracking-[-0.035em] text-ink sm:text-6xl lg:text-[5.25rem] lg:leading-[1.02]"
        />

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-6">
            <div data-clip="left" className="relative aspect-[5/4] overflow-hidden bg-bg">
              <div data-parallax="5" className="absolute inset-x-0 -top-[7%] -bottom-[7%]">
                <Image
                  data-clip-inner
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 540px, 92vw"
                  className="object-cover object-[50%_40%]"
                />
              </div>
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-xs text-muted" data-reveal>
              <span className="font-display text-sm font-semibold text-ink">{site.name}</span>
              <span>{site.title}</span>
            </figcaption>
          </figure>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-2">
            <h3
              data-split
              className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              A builder with a search-aware practice.
            </h3>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted" data-reveal-group>
              <p>
                I&apos;m a Full-Stack Developer and SEO Specialist from Pakistan with a passion
                for building useful digital products and solving real-world problems through
                technology.
              </p>
              <p>
                My work combines software engineering, product thinking, and search engine
                optimization. From developing full-stack applications and SaaS platforms to
                researching keywords and improving website discoverability, I enjoy working
                across the complete digital product journey.
              </p>
              <p>
                I&apos;m continuously learning, experimenting, and building — especially where
                product engineering and organic growth meet.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 border-t border-line" data-reveal-group>
              <div className="border-r border-line py-4 pr-4">
                <p className="label">Based in</p>
                <p className="mt-2 text-sm text-ink">{site.location}</p>
              </div>
              <div className="py-4 pl-4 sm:pl-6">
                <p className="label">Practice</p>
                <p className="mt-2 text-sm text-ink">Engineering + SEO</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MotionScope>
  );
}
