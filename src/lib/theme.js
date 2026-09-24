// Theme state lives on <html data-theme="..."> so CSS tokens (styles/theme.css)
// apply to the whole document, including body/overscroll areas. The inline
// script in index.html sets it before first paint; this module keeps it in
// sync and remembers the visitor's choice.
const STORAGE_KEY = "og-theme";
const SWITCH_CLASS = "theme-switching";
const SWITCH_MS = 220;
let switchTimer = 0;

export function getInitialTheme() {
  if (typeof document === "undefined") return "dark";
  // The inline script in index.html has already resolved this before paint.
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function applyTheme(theme) {
  const root = document.documentElement;
  // Every element crossfades background/text color together for ~180ms
  // (styles/theme.css), then the class is removed so normal hover
  // transitions are untouched. Skipped for reduced motion.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add(SWITCH_CLASS);
    window.clearTimeout(switchTimer);
    switchTimer = window.setTimeout(
      () => root.classList.remove(SWITCH_CLASS),
      SWITCH_MS,
    );
  }
  root.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies.
  }
}
