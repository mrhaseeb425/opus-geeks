import { useEffect, useLayoutEffect, useRef } from "react";
import { SAME_ROUTE_EVENT } from "../lib/router";
import { scrollToId, scrollToTop } from "../lib/smoothScroll";

// Scroll position for route changes. Rendered inside <main> *before* the
// page, so its layout effect runs before the page's own layout effects:
// the page's scroll reveals then measure the new (top-of-page) position,
// and anything on screen after a route change shows immediately.
// It sits inside the route's Suspense boundary, so on a lazy route it runs
// when the page actually commits — deep links like
// /services/web-development always find their section.
export default function RouteScroll({ pageKey, sectionId, disabled }) {
  const last = useRef({ pageKey: null, sectionId: null, immediate: true });
  const focusedKey = useRef(pageKey);

  useLayoutEffect(() => {
    if (disabled) return undefined;
    const previous = last.current;
    // Same deps again = StrictMode's dev re-run or a Suspense re-show:
    // repeat the previous decision instead of treating it as navigation.
    const isRepeat =
      previous.pageKey === pageKey && previous.sectionId === sectionId;
    const isFirstRender = previous.pageKey === null;
    const pageChanged = !isRepeat && previous.pageKey !== pageKey;
    const immediate = isRepeat ? previous.immediate : isFirstRender || pageChanged;
    last.current = { pageKey, sectionId, immediate };

    if (sectionId) {
      // Jump on arrival (first load or new page), glide within the page.
      scrollToId(sectionId, { immediate });
      return immediate ? holdPosition(sectionId) : undefined;
    }
    if (pageChanged && !isFirstRender) scrollToTop();
    return undefined;
  }, [pageKey, sectionId, disabled]);

  // After an in-app navigation, move focus to <main> (tabIndex -1, no
  // outline) so the link that was clicked, e.g. in the footer, doesn't keep
  // a focus ring, and keyboard/screen reader users start at the new page.
  useLayoutEffect(() => {
    if (disabled || focusedKey.current === pageKey) return;
    focusedKey.current = pageKey;
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pageKey, disabled]);

  // Clicking a link to the page you're already on (e.g. "Web Development"
  // in the nav after scrolling away) glides back to its section or the top.
  useEffect(() => {
    if (disabled) return undefined;
    const onSameRoute = () => {
      if (sectionId) scrollToId(sectionId);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener(SAME_ROUTE_EVENT, onSameRoute);
    return () => window.removeEventListener(SAME_ROUTE_EVENT, onSameRoute);
  }, [sectionId, disabled]);

  return null;
}

// Late layout changes above the target (web fonts swapping in, the first
// images decoding) can nudge a deep-linked section away from the header.
// Re-align a few times during the first ~1.5s, and stop as soon as the
// visitor scrolls on their own.
function holdPosition(id) {
  let active = true;
  const realign = () => {
    if (active) scrollToId(id, { immediate: true });
  };
  const stop = () => {
    active = false;
  };
  const userEvents = ["wheel", "touchstart", "keydown", "pointerdown"];
  userEvents.forEach((type) =>
    window.addEventListener(type, stop, { once: true, passive: true }),
  );
  const frame = requestAnimationFrame(realign);
  const timers = [150, 500, 1500].map((ms) => window.setTimeout(realign, ms));
  document.fonts?.ready.then(realign);
  window.addEventListener("load", realign, { once: true });

  return () => {
    stop();
    cancelAnimationFrame(frame);
    timers.forEach((timer) => window.clearTimeout(timer));
    window.removeEventListener("load", realign);
    userEvents.forEach((type) => window.removeEventListener(type, stop));
  };
}
