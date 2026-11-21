import { MotionScope } from "@/components/motion/MotionScope";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { disciplines } from "@/data/expertise";
import { cn } from "@/lib/utils";

export function Expertise() {
  return (
    <MotionScope as="section" id="expertise" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Expertise"
          title="Two disciplines, one practice."
          description="I build digital products and I understand how those products become findable. The two are presented as equal capabilities."
        />

        <div className="relative mt-16 grid gap-16 lg:mt-20 lg:grid-cols-2 lg:gap-0">
          <span
            data-draw="y"
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-1/2 hidden w-px bg-line lg:block"
          />
          {disciplines.map((discipline, index) => (
            <article
              key={discipline.id}
              className={cn("relative", index === 0 ? "lg:pr-14 xl:pr-20" : "lg:pl-14 xl:pl-20")}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="label" data-reveal>
                    {discipline.kicker}
                  </p>
                  <h3
                    data-split
                    className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-[2.5rem] sm:leading-[1.1]"
                  >
                    {discipline.title}
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  data-reveal
                  className="numeral-outline font-display -mt-3 text-7xl leading-none font-bold sm:text-8xl"
                >
                  {index === 0 ? "A" : "B"}
                </span>
              </div>
              <p data-reveal className="mt-5 max-w-md text-base leading-7 text-muted">
                {discipline.description}
              </p>

              <dl className="mt-10 border-t border-line" data-reveal-group data-stagger="0.06">
                {discipline.groups.map((group) => (
                  <div
                    key={group.title}
                    className="grid gap-2 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="text-sm font-semibold text-forest">{group.title}</dt>
                    <dd className="text-sm leading-6 text-ink">{group.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </MotionScope>
  );
}
