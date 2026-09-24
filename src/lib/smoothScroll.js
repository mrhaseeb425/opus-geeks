// Native scrolling only. A JS smooth-scroll layer (previously Lenis) fights
// Mac trackpad momentum and runs a rAF loop every frame, so the browser now
// does all scrolling. Smooth behavior for anchor/section jumps comes from
// `scroll-behavior: smooth` in theme.css (disabled for reduced motion).

// Route changes jump straight to the top — never animate a page swap.
export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

// Scrolls a section into view below the sticky header, using the same
// --header-h token as the CSS scroll-margin.
export function scrollToId(id, { immediate = false } = {}) {
  const target = document.getElementById(id);
  if (!target) return;
  const header =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
    ) || 84;
  const top = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - (header + 16),
  );
  window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
}

// Background scroll lock for drawers/modals. `scrollbar-gutter: stable` on
// <html> (theme.css) keeps the page from shifting when the scrollbar hides.
let lockCount = 0;
export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) document.documentElement.style.overflow = "";
}
