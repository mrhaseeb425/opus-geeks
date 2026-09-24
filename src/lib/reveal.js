// One shared IntersectionObserver for every scroll reveal (cheaper than one
// per element). An element reveals once 10% of it is inside the viewport
// minus its bottom 10%, then it is unobserved.
//
// Safety net: a lightweight geometry check (on scroll, resize and a 150ms
// interval while anything is pending) force-reveals any element that has been
// on screen for ~1s without the observer firing (850ms + at most one 150ms
// tick), and anything on screen at the very bottom of the page. A forced
// reveal skips the fade and goes straight to full opacity, so nothing can
// stay faded while visible.
const handlers = new Map();
const firstSeen = new Map();
let observer = null;
let listenersBound = false;
let interval = 0;

export const REVEAL_DURATION_MS = 350;
const FORCE_AFTER_MS = 850;
const CHECK_EVERY_MS = 150;

function fire(element, forced = false) {
  const handler = handlers.get(element);
  if (!handler) return;
  handlers.delete(element);
  firstSeen.delete(element);
  observer?.unobserve(element);
  handler({ forced });
  if (handlers.size === 0) stopInterval();
}

// True when any part of the element is on screen right now.
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.width + rect.height > 0 &&
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

function checkPending() {
  const now = performance.now();
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;
  for (const element of [...handlers.keys()]) {
    if (!element.isConnected) {
      handlers.delete(element);
      firstSeen.delete(element);
      continue;
    }
    if (!isInViewport(element)) {
      firstSeen.delete(element);
      continue;
    }
    if (atBottom) {
      fire(element);
      continue;
    }
    const seen = firstSeen.get(element);
    if (seen === undefined) firstSeen.set(element, now);
    else if (now - seen >= FORCE_AFTER_MS) fire(element, true);
  }
  if (handlers.size === 0) stopInterval();
}

function startInterval() {
  if (!interval) interval = window.setInterval(checkPending, CHECK_EVERY_MS);
}

function stopInterval() {
  window.clearInterval(interval);
  interval = 0;
}

function bindListeners() {
  if (listenersBound) return;
  listenersBound = true;
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      checkPending();
    });
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) fire(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  bindListeners();
  return observer;
}

export function observeReveal(element, onVisible) {
  if (!element) return () => {};
  handlers.set(element, onVisible);
  getObserver().observe(element);
  startInterval();
  return () => {
    handlers.delete(element);
    firstSeen.delete(element);
    observer?.unobserve(element);
    if (handlers.size === 0) stopInterval();
  };
}
