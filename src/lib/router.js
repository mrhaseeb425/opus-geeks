import { useEffect, useSyncExternalStore } from "react";
import { DEFAULT_OG_IMAGE } from "../data/meta";
import { NAV_ITEMS, SERVICES } from "../data/site";

// Minimal History-API router. Every page, service section, case study and
// article has a real, shareable URL (/services/web-development,
// /portfolio/mobile-banking-app, /blog/why-design-systems-pay-for-themselves)
// without pulling in a routing dependency. vercel.json rewrites every path to
// index.html so direct links and refreshes never 404.

const NAV_EVENT = "og:navigate";
// Fired when a link points at the URL that is already open.
export const SAME_ROUTE_EVENT = "og:same-route";

const LABEL_TO_PATH = {
  Services: "/services",
  Careers: "/careers",
  ...Object.fromEntries(NAV_ITEMS.map((item) => [item.label, item.path])),
  ...Object.fromEntries(SERVICES.map((s) => [s.name, `/services/${s.slug}`])),
};

// Old hash links (/#contact, /#web-development) keep working after the move
// to path-based URLs.
const LEGACY_HASHES = {
  services: "/services",
  blogs: "/blog",
  ...Object.fromEntries(NAV_ITEMS.map((item) => [item.hash, item.path])),
  ...Object.fromEntries(SERVICES.map((s) => [s.slug, `/services/${s.slug}`])),
};

// Alternate spellings people type or link to, mapped to the real slug.
const SERVICE_ALIASES = {
  "ui-ux-design": "ux-ui-design",
  "ux-design": "ux-ui-design",
  "ui-design": "ux-ui-design",
};

export function pathForLabel(label) {
  return LABEL_TO_PATH[label] ?? "/";
}

export function parsePath(pathname) {
  const [section = "", slug = null] = pathname
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean);
  switch (section) {
    case "":
      return { page: "Home", slug: null };
    case "services":
      return { page: "Services", slug: SERVICE_ALIASES[slug] ?? slug };
    case "portfolio":
      return { page: "Portfolio", slug };
    case "blog":
    case "blogs":
      return { page: "Blogs", slug };
    case "about":
      return { page: "About", slug: null };
    case "contact":
      return { page: "Contact Us", slug: null };
    case "faqs":
      return { page: "FAQs", slug: null };
    case "careers":
      return { page: "Careers", slug: null };
    default:
      return { page: "NotFound", slug: null };
  }
}

function snapshot() {
  return `${window.location.pathname}|${JSON.stringify(window.history.state ?? null)}`;
}

function subscribe(callback) {
  window.addEventListener("popstate", callback);
  window.addEventListener(NAV_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(NAV_EVENT, callback);
  };
}

export function useLocation() {
  const key = useSyncExternalStore(subscribe, snapshot, () => "/|null");
  const pathname = key.slice(0, key.indexOf("|"));
  const state = JSON.parse(key.slice(key.indexOf("|") + 1));
  return { pathname, state };
}

export function navigate(to, { replace = false, state = null } = {}) {
  const url = new URL(to, window.location.origin);
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next === current && !state && !replace) {
    window.dispatchEvent(new Event(SAME_ROUTE_EVENT));
    return;
  }
  window.history[replace ? "replaceState" : "pushState"](state, "", next);
  window.dispatchEvent(new Event(NAV_EVENT));
}

// Upgrade legacy "/#slug" URLs once on load.
export function upgradeLegacyHash() {
  const slug = window.location.hash.replace("#", "");
  if (window.location.pathname === "/" && LEGACY_HASHES[slug]) {
    navigate(LEGACY_HASHES[slug], { replace: true });
  }
}

// Turns plain <a href="/..."> clicks anywhere in the app into client-side
// navigation, while leaving new-tab/modified clicks, external links and
// in-page "#anchor" links to the browser.
export function useLinkInterception() {
  useEffect(() => {
    const handleClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = event.target.closest("a[href]");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }
      const href = anchor.getAttribute("href");
      if (!href.startsWith("/") || href.startsWith("//")) return;
      event.preventDefault();
      navigate(href);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

// Per-route <title>, description, canonical URL and Open Graph / Twitter
// tags, so every page and detail view is distinct when shared or indexed.
// The prerendered HTML (vite.config.js) ships the same tags for crawlers
// that don't run JavaScript.
function upsertMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export function useDocumentMeta({ title, description, path, image, type }) {
  useEffect(() => {
    const origin = window.location.origin;
    const url = `${origin}${path}`;
    const imageUrl = new URL(image ?? DEFAULT_OG_IMAGE, origin).href;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type ?? "website");
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path, image, type]);
}
