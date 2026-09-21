import Lenis from "lenis";

// Singleton so StrictMode's double-invoked effects and repeated App mounts
// never spin up more than one Lenis instance / rAF loop.
let lenisInstance = null;

export function initLenis() {
  if (lenisInstance || typeof window === "undefined") return lenisInstance;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  const raf = (time) => {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  return lenisInstance;
}

// Used instead of window.scrollTo() so route/page changes stay in sync with
// Lenis's internal scroll state instead of fighting it.
export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  } else if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
}
