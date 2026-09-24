// JSON-LD structured data.
//
// Every property below is built from data that is already visible on the
// site (data/site.js, data/posts.js, data/projects.js) — nothing is invented
// for search engines. In particular there is deliberately no aggregateRating,
// award or foundingDate: the site does not publish verified figures for any
// of them, and marking up claims the page does not make is exactly what
// structured-data spam guidelines prohibit.
//
// Injected at build time per route (vite.config.js prerenderMeta) and kept in
// sync on client-side navigation (lib/router.js useDocumentMeta).

import { POSTS } from "./posts.js";
import { PROJECTS } from "./projects.js";
import { CONTACT, SERVICES, SOCIALS, TAGLINE } from "./site.js";
import { FAQ_ITEMS } from "./faqs.js";
import { SITE_NAME, SITE_URL } from "./meta.js";

const abs = (path) => new URL(path, SITE_URL).href;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Split "8903 Pines Blvd 217 153, Pembroke Pines, FL 33024, USA" into the
// parts schema.org expects. Falls back to the whole string as the street.
function postalAddress(office) {
  const parts = office.address.split(",").map((p) => p.trim());
  if (parts.length < 3) return { "@type": "PostalAddress", streetAddress: office.address };
  const country = parts.at(-1);
  const locality = parts.at(-3);
  // "FL 33024" -> region "FL", postcode "33024". Addresses without a postal
  // code (the Karachi office) just keep the whole segment as the region.
  const regionPart = parts.at(-2);
  const postal = regionPart.match(/\s([A-Z0-9][A-Z0-9-]{2,})$/i);
  const region = postal ? regionPart.slice(0, -postal[0].length).trim() : regionPart;
  return {
    "@type": "PostalAddress",
    streetAddress: parts.slice(0, -3).join(", ") || locality,
    addressLocality: locality,
    addressRegion: region,
    ...(postal ? { postalCode: postal[1] } : {}),
    addressCountry: country,
  };
}

export const organization = () => ({
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description: TAGLINE,
  logo: { "@type": "ImageObject", url: abs("/logo.png") },
  image: abs("/og-image.jpg"),
  email: CONTACT.email,
  telephone: CONTACT.phone,
  // The HQ is the first postal address; the other office is listed alongside.
  address: CONTACT.offices.map(postalAddress),
  sameAs: SOCIALS.map((s) => s.href),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT.email,
    telephone: CONTACT.phone,
    url: abs("/contact"),
  },
});

export const website = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { "@id": ORGANIZATION_ID },
});

const breadcrumb = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

const serviceSchema = (service) => ({
  "@type": "Service",
  name: service.name,
  description: service.summary,
  serviceType: service.tag,
  url: abs(`/services/${service.slug}`),
  provider: { "@id": ORGANIZATION_ID },
});

const postSchema = (post) => ({
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  datePublished: new Date(post.date).toISOString().slice(0, 10),
  author: { "@type": "Person", name: post.author },
  publisher: { "@id": ORGANIZATION_ID },
  mainEntityOfPage: abs(`/blog/${post.slug}`),
  articleSection: post.category,
});

// The case studies describe work Opus Geeks did, so they are marked up as
// articles about a project rather than as a Product or SoftwareApplication —
// the site does not sell these as products.
const projectSchema = (project) => ({
  "@type": "Article",
  headline: `${project.title} case study`,
  description: project.summary,
  author: { "@id": ORGANIZATION_ID },
  publisher: { "@id": ORGANIZATION_ID },
  mainEntityOfPage: abs(`/portfolio/${project.slug}`),
  about: project.industry,
});

const faqSchema = () => ({
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});

// Returns the @graph for one route path, or null when a route needs nothing
// beyond the site-wide Organization/WebSite pair.
export function schemaForPath(path) {
  const graph = [];

  const service = SERVICES.find((s) => `/services/${s.slug}` === path);
  if (service) {
    graph.push(serviceSchema(service));
    graph.push(
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.name, path },
      ]),
    );
  }

  const post = POSTS.find((p) => `/blog/${p.slug}` === path);
  if (post) {
    graph.push(postSchema(post));
    graph.push(
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path },
      ]),
    );
  }

  const project = PROJECTS.find((p) => `/portfolio/${p.slug}` === path);
  if (project) {
    graph.push(projectSchema(project));
    graph.push(
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Case studies", path: "/portfolio" },
        { name: project.title, path },
      ]),
    );
  }

  if (path === "/faqs") graph.push(faqSchema());

  return graph;
}

// The full JSON-LD block for a route: Organization and WebSite everywhere,
// plus whatever that specific page supports.
export function jsonLdForPath(path) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [organization(), website(), ...schemaForPath(path)],
  });
}
