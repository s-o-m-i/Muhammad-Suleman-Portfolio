"use client";

import { useRef, type ComponentPropsWithoutRef, type ElementType } from "react";
import { DESKTOP, MOTION_OK, gsap, SplitText, useGSAP } from "@/lib/gsap";

const CLIP_FROM = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

function delayOf(el: HTMLElement) {
  return Number(el.dataset.delay ?? 0);
}

// Not `once: true`: once-triggers kill themselves during the refresh that runs when
// reveals are rebuilt mid-page (filters, "View more"), which corrupts ScrollTrigger's list.
function onEnter(trigger: Element, start = "top 86%") {
  return { trigger, start, toggleActions: "play none none none" };
}

/**
 * Animates descendants that opt in through data attributes:
 * data-split (heading lines), data-reveal, data-reveal-group / data-pop (children stagger),
 * data-draw ("x" | "y" hairlines), data-clip (+ data-clip-inner), data-parallax, data-tilt.
 * Nothing is hidden before JavaScript runs, and nothing animates under reduced motion.
 */
export function setupReveals(root: HTMLElement, desktop: boolean) {
  const all = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

  all("[data-split]").forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.09,
          delay: delayOf(el),
          scrollTrigger: onEnter(el, "top 90%"),
        }),
    });
  });

  all("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 26,
      duration: 0.9,
      ease: "power3.out",
      delay: delayOf(el),
      scrollTrigger: onEnter(el),
    });
  });

  all("[data-reveal-group]").forEach((group) => {
    gsap.from(group.children, {
      autoAlpha: 0,
      y: 22,
      duration: 0.8,
      ease: "power3.out",
      stagger: Number(group.dataset.stagger ?? 0.08),
      delay: delayOf(group),
      scrollTrigger: onEnter(group),
    });
  });

  all("[data-pop]").forEach((group) => {
    gsap.from(group.children, {
      autoAlpha: 0,
      scale: 0,
      transformOrigin: "50% 50%",
      duration: 0.6,
      ease: "back.out(2)",
      stagger: Number(group.dataset.stagger ?? 0.025),
      delay: delayOf(group),
      scrollTrigger: onEnter(group),
    });
  });

  all("[data-draw]").forEach((el) => {
    const vertical = el.dataset.draw === "y";
    gsap.from(el, {
      [vertical ? "scaleY" : "scaleX"]: 0,
      transformOrigin: vertical ? "50% 0%" : "0% 50%",
      duration: 1.2,
      ease: "power3.inOut",
      delay: delayOf(el),
      scrollTrigger: onEnter(el, "top 92%"),
    });
  });

  all("[data-clip]").forEach((el) => {
    const direction = (el.dataset.clip || "up") as keyof typeof CLIP_FROM;
    const inner = el.querySelector<HTMLElement>("[data-clip-inner]");
    const tl = gsap.timeline({ delay: delayOf(el), scrollTrigger: onEnter(el, "top 88%") });
    tl.fromTo(
      el,
      { clipPath: CLIP_FROM[direction] ?? CLIP_FROM.up },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35, ease: "expo.inOut", clearProps: "clipPath" },
    );
    if (inner) {
      tl.from(inner, { scale: 1.18, duration: 1.8, ease: "expo.out", clearProps: "scale" }, 0.1);
    }
  });

  if (!desktop) return;

  all("[data-parallax]").forEach((el) => {
    const amount = Number(el.dataset.parallax || 8);
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  all("[data-tilt]").forEach((el) => {
    gsap.fromTo(
      el,
      { rotateX: 16, scale: 0.92, transformPerspective: 1600, transformOrigin: "50% 0%" },
      {
        rotateX: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement ?? el, start: "top 92%", end: "top 30%", scrub: 0.6 },
      },
    );
  });
}

type MotionScopeProps<T extends ElementType> = {
  as?: T;
  deps?: unknown[];
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function MotionScope<T extends ElementType = "div">({
  as,
  deps = [],
  children,
  ...rest
}: MotionScopeProps<T>) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, desktop: DESKTOP }, (context) => {
        if (!context.conditions?.motion) return;
        setupReveals(root, Boolean(context.conditions.desktop));
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: deps, revertOnUpdate: true },
  );

  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
