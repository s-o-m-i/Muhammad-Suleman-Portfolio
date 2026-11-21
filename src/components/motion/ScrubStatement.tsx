"use client";

import { useRef } from "react";
import { MOTION_OK, SplitText, gsap, useGSAP } from "@/lib/gsap";

export function ScrubStatement({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.16 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.5 },
              },
            ),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
