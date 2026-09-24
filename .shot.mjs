import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:4173";
const OUT = process.argv[2] ?? "shots";
const PAGES = (process.argv[3] ?? "/,/services,/portfolio,/blog,/about,/contact,/faqs,/careers")
  .split(",");
const SIZE = (process.argv[4] ?? "1440x900").split("x").map(Number);
const THEMES = (process.argv[5] ?? "light,dark").split(",");

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const errors = [];

for (const theme of THEMES) {
  const ctx = await browser.newContext({
    viewport: { width: SIZE[0], height: SIZE[1] },
    deviceScaleFactor: 1,
  });
  await ctx.addInitScript((t) => {
    try {
      localStorage.setItem("og-theme", t);
      sessionStorage.setItem("og-intro-seen", "1");
      document.documentElement.dataset.theme = t;
    } catch {}
  }, theme);
  // Layout QA: freeze scroll-reveal so every block is painted at full
  // opacity, exactly as the finished page looks once revealed.

  const page = await ctx.newPage();
  await page.addInitScript(() => {
    const css = `.reveal, .reveal-up, .reveal-fade, .is-pending, .is-revealing {
      opacity: 1 !important; transform: none !important; }
      *, *::before, *::after { animation-duration: 1ms !important;
      transition-duration: 1ms !important; }`;
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.createElement("style");
      el.textContent = css;
      document.head.appendChild(el);
    });
  });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${theme}] ${page.url()} :: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${theme}] ${page.url()} :: ${e.message}`));

  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.documentElement.setAttribute("data-preloaded", "1"));
    await page.waitForTimeout(1200);
    // Settle any reveal animations by scrolling through the page.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    const name = (path === "/" ? "home" : path.replace(/\//g, "-").slice(1));
    await page.screenshot({
      path: `${OUT}/${name}-${theme}-${SIZE[0]}.png`,
      fullPage: true,
    });
  }
  await ctx.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/console-errors.txt`, errors.join("\n") || "none");
console.log(errors.length ? `CONSOLE ERRORS:\n${errors.join("\n")}` : "no console errors");
