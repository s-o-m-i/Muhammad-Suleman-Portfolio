"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED_MOTION } from "@/lib/gsap";
import { scrollToHash, setLenis } from "@/lib/scroll";

function samePageHashLink(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

  const anchor = (event.target as Element | null)?.closest?.("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname !== window.location.pathname || url.search !== window.location.search) return null;
  if (!url.hash) return null;
  return url.hash;
}

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia(REDUCED_MOTION).matches;
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    const onClick = (event: MouseEvent) => {
      const hash = samePageHashLink(event);
      if (!hash || !scrollToHash(hash)) return;
      event.preventDefault();
      if (window.location.hash !== hash) {
        window.history.pushState(null, "", hash);
      }
    };

    const onPopState = () => {
      if (window.location.hash) scrollToHash(window.location.hash);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      if (tick) gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
