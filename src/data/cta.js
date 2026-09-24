// The closing call to action for each page. It now renders at the top of the
// dark footer (components/Footer.jsx) instead of a floating card on the page,
// so every page ends the same way and the copy still fits the page you are on.

import { CAREERS_EMAIL, OPEN_ROLES } from "./careers.js";
import { CONTACT } from "./site.js";

const careersEmail = CAREERS_EMAIL ?? CONTACT.email;
const cvHref = `mailto:${careersEmail}?subject=${encodeURIComponent(
  "Open application — Opus Geeks",
)}`;

const DEFAULT_CTA = {
  title: "Have a project in mind? Let's talk.",
  text: "Tell us what you're building. We'll reply within one business day with clear next steps.",
  label: "Book a free 30-min call",
  href: "/contact",
  nav: "Contact Us",
};

const PAGE_CTA = {
  Services: {
    title: "Not sure which service you need?",
    text: "Describe your idea and we'll recommend the right mix of design and engineering. No commitment.",
    label: "Book a free 30-min call",
    href: "/contact",
    nav: "Contact Us",
  },
  Portfolio: {
    title: "Want results like these?",
    text: "Share your scope and we'll reply with next steps within one business day.",
    label: "Get a project estimate",
    href: "/contact",
    nav: "Contact Us",
  },
  About: {
    title: "Let's talk about your product",
    text: "Meet the people who would build it on a free 30-minute call.",
    label: "Book a free 30-min call",
    href: "/contact",
    nav: "Contact Us",
  },
  FAQs: {
    title: "Still have a question?",
    text: "Ask us directly on a free 30-minute call with our team.",
    label: "Book a free 30-min call",
    href: "/contact",
    nav: "Contact Us",
  },
  Careers: OPEN_ROLES.length
    ? {
        title: "Don't see your role?",
        text: "Send an open application. We read every one.",
        label: "Send your CV",
        href: cvHref,
      }
    : DEFAULT_CTA,
};

// The contact page is the destination, so it closes with the footer alone.
export function footerCta(page) {
  if (page === "Contact Us") return null;
  return PAGE_CTA[page] ?? DEFAULT_CTA;
}
