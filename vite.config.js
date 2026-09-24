import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const escapeAttr = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Link-preview crawlers (WhatsApp, LinkedIn, Slack, X) don't run JavaScript,
// so after the build this writes one HTML file per route with that route's
// title, description, canonical URL and share image baked in. `cleanUrls`
// in vercel.json serves /about from about.html; any other path still falls
// back to index.html and the SPA router. Also writes sitemap.xml.
function prerenderMeta() {
  let outDir = "dist";
  return {
    name: "prerender-meta",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const metaModule = pathToFileURL(path.resolve("src/data/meta.js")).href;
      const { allRouteMeta, DEFAULT_OG_IMAGE, SITE_URL } = await import(
        metaModule
      );
      const template = await fs.readFile(path.join(outDir, "index.html"), "utf8");

      for (const meta of allRouteMeta()) {
        const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
        const image = escapeAttr(new URL(meta.image ?? DEFAULT_OG_IMAGE, SITE_URL).href);
        const title = escapeAttr(meta.title);
        const description = escapeAttr(meta.description);
        const set = (html, pattern, value) => {
          if (!pattern.test(html)) throw new Error(`prerender-meta: ${pattern} not found`);
          return html.replace(pattern, `$1${value}$2`);
        };
        let html = template;
        html = set(html, /(<title>)[^<]*(<\/title>)/, title);
        html = set(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, description);
        html = set(html, /(<link rel="canonical" href=")[^"]*(")/, url);
        html = set(html, /(<meta property="og:type" content=")[^"]*(")/, meta.type ?? "website");
        html = set(html, /(<meta property="og:title" content=")[^"]*(")/, title);
        html = set(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, description);
        html = set(html, /(<meta property="og:url" content=")[^"]*(")/, url);
        html = set(html, /(<meta property="og:image" content=")[^"]*(")/, image);
        html = set(html, /(<meta name="twitter:title" content=")[^"]*(")/, title);
        html = set(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, description);
        html = set(html, /(<meta name="twitter:image" content=")[^"]*(")/, image);
        const file =
          meta.path === "/"
            ? path.join(outDir, "index.html")
            : path.join(outDir, `${meta.path.slice(1)}.html`);
        await fs.mkdir(path.dirname(file), { recursive: true });
        await fs.writeFile(file, html);
      }

      const urls = allRouteMeta()
        .map((meta) => `  <url><loc>${SITE_URL}${meta.path}</loc></url>`)
        .join("\n");
      await fs.writeFile(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
    },
  };
}

// Photos are served same-origin under /img (see lib/images.js); production
// proxies them in vercel.json, dev and preview proxy them here.
const imageProxy = {
  "/img": {
    target: "https://images.pexels.com",
    changeOrigin: true,
    rewrite: (url) => url.replace(/^\/img/, ""),
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderMeta()],
  server: { proxy: imageProxy },
  preview: { proxy: imageProxy },
});
