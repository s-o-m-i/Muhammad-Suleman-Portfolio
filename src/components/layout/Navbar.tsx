"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/data/site";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./ThemeSwitcher";

const sectionIds = navItems.map((item) => item.href.replace("/#", ""));

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const progressRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";
  const activeId = isHome ? active : null;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  useGSAP(
    () => {
      if (!open || !panelRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-menu-item]", {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.05,
        });
      });
      return () => mm.revert();
    },
    { scope: panelRef, dependencies: [open], revertOnUpdate: true },
  );

  const close = () => setOpen(false);

  return (
    <header
      data-site-header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-line bg-bg/90 backdrop-blur-md"
          : "border-transparent bg-bg/0",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:h-[4.25rem] sm:px-8 lg:px-10">
        <Link href="/#home" className="flex items-center gap-3 text-ink" onClick={close}>
          <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-forest text-[0.7rem] font-semibold tracking-[0.18em] text-forest">
            MS
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">{site.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const id = item.href.replace("/#", "");
            const current = activeId === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "relative px-3 py-2 text-[0.8rem] font-medium tracking-wide transition-colors duration-300",
                  current ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px origin-left bg-gold transition-transform duration-500 ease-out",
                    current ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Link
            href="/#contact"
            className="hidden rounded-full bg-btn px-4 py-2 text-sm font-medium text-btn-text transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Let&apos;s Talk
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <span
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold/70"
      />

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        data-lenis-prevent
        className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden"
      >
        <nav className="flex min-h-full flex-col px-5 pt-4 pb-8 sm:px-8" aria-label="Mobile">
          <ol className="flex flex-col">
            {navItems.map((item, index) => {
              const id = item.href.replace("/#", "");
              return (
                <li key={item.href} className="overflow-hidden border-b border-line">
                  <Link
                    href={item.href}
                    data-menu-item
                    aria-current={activeId === id ? "location" : undefined}
                    className="flex items-baseline gap-4 py-3 text-ink"
                    onClick={close}
                  >
                    <span className="text-xs tabular-nums text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-semibold tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="mt-auto pt-10" data-menu-item>
            <a href={`mailto:${site.email}`} className="block text-sm text-forest">
              {site.email}
            </a>
            <Link
              href="/#contact"
              className="mt-5 flex justify-center rounded-full bg-btn px-4 py-3 text-sm font-medium text-btn-text"
              onClick={close}
            >
              Let&apos;s Talk
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
