import type Lenis from "lenis";

let lenis: Lenis | null = null;
let locks = 0;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToHash(hash: string, options: { immediate?: boolean } = {}) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = id === "home" || id === "top" ? null : document.getElementById(id);
  if (id && id !== "home" && id !== "top" && !target) return false;

  if (locks > 0) {
    locks = 0;
    unlockScroll(true);
  }

  const immediate = options.immediate || prefersReducedMotion();
  const behavior: ScrollBehavior = immediate ? "auto" : "smooth";

  // Both paths honour the root's scroll-padding-top, which reserves the sticky header.
  if (lenis) {
    lenis.scrollTo(target ?? 0, { immediate, duration: 1.25, force: true });
  } else if (target) {
    target.scrollIntoView({ behavior, block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior });
  }

  if (target) {
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }

  return true;
}

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll(force = false) {
  if (!force) {
    locks = Math.max(0, locks - 1);
    if (locks > 0) return;
  }
  lenis?.start();
  document.documentElement.style.overflow = "";
}
