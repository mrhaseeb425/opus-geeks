// Responsive Pexels images (photo registry: data/photos.js).
//
// Photos are requested from our own origin under /img, which vercel.json
// (production) and vite.config.js (dev/preview) proxy to images.pexels.com.
// Same-origin delivery saves a connection on first load and drops the CDN's
// third-party cookies (they're scoped to pexels.com).
//
// Every photo renders as <picture>: an AVIF source, a WebP source and a JPEG
// <img> fallback, each with a 1x and 2x candidate. `fit=crop` + w/h crops
// server-side, so each slot downloads exactly its own aspect ratio.

const MAX_WIDTH = 2400;
const IMAGE_BASE = "/img";
const PEXELS_ORIGIN = "https://images.pexels.com";

function pexelsPath(id, width, height, format) {
  const fm = format ? `&fm=${format}` : "";
  return `/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}${fm}`;
}

// Same-origin URL for use on the page.
export function pexelsUrl(id, width, height, format) {
  return `${IMAGE_BASE}${pexelsPath(id, width, height, format)}`;
}

// Absolute CDN URL, for share images read by link-preview crawlers.
export function pexelsCdnUrl(id, width, height) {
  return `${PEXELS_ORIGIN}${pexelsPath(id, width, height)}`;
}

// `width` is the rendered (1x) width of the slot, `ratio` is width / height.
export function photoProps(photo, { width, ratio = 3 / 2, sizes }) {
  const height = Math.round(width / ratio);
  const widths = [width, width * 2]
    .map((w) => Math.min(w, MAX_WIDTH))
    .filter((w, index, list) => list.indexOf(w) === index);
  const srcSet = (format) =>
    widths
      .map((w) => `${pexelsUrl(photo.id, w, Math.round(w / ratio), format)} ${w}w`)
      .join(", ");
  return {
    sources: [
      { type: "image/avif", srcSet: srcSet("avif") },
      { type: "image/webp", srcSet: srcSet("webp") },
    ],
    img: {
      src: pexelsUrl(photo.id, width, height, "jpg"),
      srcSet: srcSet("jpg"),
      sizes: sizes ?? `(max-width: ${width}px) 100vw, ${width}px`,
      width,
      height,
    },
  };
}

// `sizes` hints matching the grid breakpoints in App.css / polish.css.
export const SIZES = {
  // 1 column below 700px, 2 below 1200px, 3 from 1200px (type.css).
  portfolioCard:
    "(max-width: 699px) calc(100vw - 36px), (max-width: 1199px) 46vw, 410px",
  gallery: "(max-width: 700px) calc(100vw - 32px), 900px",
  thumbnail: "(max-width: 700px) 30vw, 200px",
  serviceFeature: "(max-width: 960px) calc(100vw - 40px), 600px",
  quarterCard:
    "(max-width: 640px) calc(100vw - 36px), (max-width: 1080px) 46vw, 300px",
  thirdCard:
    "(max-width: 640px) calc(100vw - 36px), (max-width: 1080px) 46vw, 400px",
};
