"use client";

import { useRef } from "react";
import { DESKTOP, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

export function HeroMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

        tl.from('[data-intro="label"]', { autoAlpha: 0, y: 12, duration: 0.7 })
          .from(
            '[data-intro="line"]',
            { autoAlpha: 0, yPercent: 110, duration: 1.15, ease: "power4.out", stagger: 0.12 },
            0.15,
          )
          .fromTo(
            '[data-intro="portrait"]',
            { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
            0.3,
          )
          .from('[data-intro-inner]', { scale: 1.28, duration: 2, ease: "expo.out" }, 0.45)
          .from('[data-intro="panel"]', { autoAlpha: 0, xPercent: -6, duration: 1.1 }, 0.75)
          .from('[data-intro="frame"]', { autoAlpha: 0, duration: 1.2 }, 1)
          .from('[data-intro="copy"]', { autoAlpha: 0, y: 18, duration: 0.8, stagger: 0.08 }, 0.6)
          .from('[data-intro="cta"] > *', { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.08 }, 0.95)
          .set('[data-intro="cta"]', { autoAlpha: 1 }, 0.95)
          .from('[data-intro="meta"]', { autoAlpha: 0, y: 10, duration: 0.6, stagger: 0.06 }, 1.2);
      });

      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        gsap.to("[data-hero-parallax]", {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
