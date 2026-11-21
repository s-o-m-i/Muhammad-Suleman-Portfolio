"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { MotionScope } from "@/components/motion/MotionScope";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { formatPeriod } from "@/lib/utils";

function Timeline({ onOpenCertificate }: { onOpenCertificate: (trigger: HTMLElement) => void }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = ref.current;
      if (!list) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 62%", end: "bottom 62%", scrub: 0.4 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-node]", list).forEach((node) => {
          node.dataset.active = "false";
          ScrollTrigger.create({
            trigger: node,
            start: "top 62%",
            onEnter: () => (node.dataset.active = "true"),
            onLeaveBack: () => (node.dataset.active = "false"),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-px bg-line sm:left-[9px]" />
      <span
        aria-hidden="true"
        data-progress
        className="absolute top-3 bottom-3 left-[7px] w-px origin-top bg-gold sm:left-[9px]"
      />
      {experiences.map((role, index) => (
        <li key={role.id} className="group/role relative pl-10 sm:pl-14 [&+li]:mt-12">
          <span
            data-node
            data-active="true"
            aria-hidden="true"
            className="absolute top-2 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-gold bg-bg-2 transition-colors duration-500 data-[active=true]:bg-gold sm:h-[19px] sm:w-[19px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-bg-2" />
          </span>
          <article
            className="border-b border-line pb-12 group-last/role:border-b-0 group-last/role:pb-0"
            data-reveal
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="label">
                {formatPeriod(role.start, role.end)}
                {role.current ? " · Current" : ""}
              </p>
              <span className="font-display text-xs font-semibold tabular-nums text-muted">
                {String(experiences.length - index).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
              {role.company}
            </h3>
            <p className="mt-1 text-sm text-forest">
              {role.title}
              {role.location ? <span className="text-muted"> · {role.location}</span> : null}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              {role.summary}
            </p>
            {role.highlights.length > 0 ? (
              <ul className="mt-5 max-w-2xl space-y-2.5 text-sm leading-6 text-ink">
                {role.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {role.technologies.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                {role.technologies.map((tech) => (
                  <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
            ) : null}
            {role.recognition ? (
              <div className="mt-7 flex flex-wrap items-center gap-5 border border-gold/40 bg-bg p-4 sm:p-5">
                {role.recognition.image ? (
                  <button
                    type="button"
                    onClick={(event) => onOpenCertificate(event.currentTarget)}
                    className="group overflow-hidden border border-line"
                    aria-label={`View ${role.recognition.title} certificate`}
                  >
                    <Image
                      src={role.recognition.image.src}
                      alt=""
                      width={220}
                      height={156}
                      className="h-20 w-auto transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                ) : null}
                <div className="min-w-0 flex-1 basis-48">
                  <p className="font-display text-base font-semibold text-gold">
                    {role.recognition.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">{role.recognition.detail}</p>
                </div>
              </div>
            ) : null}
          </article>
        </li>
      ))}
    </ol>
  );
}

export function Experience() {
  const [openCertificate, setOpenCertificate] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const certificate = experiences.find((item) => item.recognition?.image)?.recognition;

  useEffect(() => {
    if (!openCertificate) return;
    lockScroll();
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenCertificate(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      triggerRef.current?.focus();
    };
  }, [openCertificate]);

  return (
    <MotionScope as="section" id="experience" className="border-y border-line bg-bg-2 py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              kicker="Professional Experience"
              title="A concise timeline for recruiters."
              description="Roles, dates, and verified recognition — without inflated metrics."
            />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Timeline
            onOpenCertificate={(trigger) => {
              triggerRef.current = trigger;
              setOpenCertificate(true);
            }}
          />
        </div>
      </Container>

      {openCertificate && certificate?.image ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-pine-deep/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpenCertificate(false);
          }}
        >
          <div data-lenis-prevent className="relative max-h-[90vh] w-full max-w-3xl overflow-auto bg-bg-2 p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 id="certificate-title" className="font-display text-lg font-semibold text-ink">
                {certificate.title}
              </h3>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpenCertificate(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
                aria-label="Close certificate"
              >
                <X size={16} />
              </button>
            </div>
            <Image
              src={certificate.image.src}
              alt={certificate.image.alt}
              width={1200}
              height={853}
              className="h-auto w-full"
            />
          </div>
        </div>
      ) : null}
    </MotionScope>
  );
}
