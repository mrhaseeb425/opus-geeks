// Page titles, descriptions and share images. Used at runtime by App.jsx
// (useDocumentMeta) and at build time by the prerender step in
// vite.config.js, which writes one HTML file per route with these tags baked
// in, so WhatsApp / LinkedIn / X previews work without running JavaScript.
import { POSTS } from "./posts.js";
import { PROJECTS } from "./projects.js";
import { SERVICES } from "./site.js";
import { TEAM_SIZE_LABEL } from "./stats.js";
import { pexelsCdnUrl } from "../lib/images.js";

export const SITE_NAME = "Opus Geeks";
// TODO(content): set to the production domain if it differs.
export const SITE_URL = "https://opusgeeks.com";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

const DEFAULT_DESCRIPTION =
  "Opus Geeks designs and builds web platforms, mobile apps, UI/UX and games for startups and growing companies.";

export const PAGE_META = {
  Home: {
    path: "/",
    title: `${SITE_NAME} | Web and Mobile App Development`,
    description: DEFAULT_DESCRIPTION,
  },
  Services: {
    path: "/services",
    title: `Services: Apps, Web, UI/UX and Games | ${SITE_NAME}`,
    description:
      "App development, web development, UI/UX design and game development, planned and built by one team.",
  },
  Portfolio: {
    path: "/portfolio",
    title: `Case Studies | ${SITE_NAME}`,
    description:
      "Products Opus Geeks has designed, built and launched in fintech, healthcare, retail, real estate and games.",
  },
  Blogs: {
    path: "/blog",
    title: `Blog | ${SITE_NAME}`,
    description:
      "Practical articles on product strategy, design and engineering from the Opus Geeks team.",
  },
  About: {
    path: "/about",
    title: `About Us | ${SITE_NAME}`,
    description: `Meet Opus Geeks: ${TEAM_SIZE_LABEL} designers and engineers building web platforms, mobile apps and games.`,
  },
  "Contact Us": {
    path: "/contact",
    title: `Contact Us | ${SITE_NAME}`,
    description:
      "Tell us about your project or book a free 30-minute call. We reply within one business day.",
  },
  FAQs: {
    path: "/faqs",
    title: `FAQs | ${SITE_NAME}`,
    description:
      "Answers on timelines, process and post-launch support for projects with Opus Geeks.",
  },
  Careers: {
    path: "/careers",
    title: `Careers | ${SITE_NAME}`,
    description: `Join a ${TEAM_SIZE_LABEL}-person team of designers and engineers. See open roles or send your CV.`,
  },
  NotFound: {
    path: null,
    title: `Page not found | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
  },
};

const shareImage = (photo) => pexelsCdnUrl(photo.id, 1200, 630);

export function serviceMeta(service) {
  return {
    path: `/services/${service.slug}`,
    title: `${service.name} | ${SITE_NAME}`,
    description: service.summary,
    image: shareImage(service.detailPhoto),
  };
}

export function postMeta(post) {
  return {
    path: `/blog/${post.slug}`,
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.excerpt,
    image: shareImage(post.cover),
    type: "article",
  };
}

export function projectMeta(project) {
  return {
    path: `/portfolio/${project.slug}`,
    title: `${project.title} Case Study | ${SITE_NAME}`,
    description: project.summary,
    image: shareImage(project.image),
    type: "article",
  };
}

// Every route that gets its own prerendered HTML file.
export function allRouteMeta() {
  return [
    ...Object.values(PAGE_META).filter((meta) => meta.path),
    ...SERVICES.map(serviceMeta),
    ...POSTS.map(postMeta),
    ...PROJECTS.map(projectMeta),
  ];
}
