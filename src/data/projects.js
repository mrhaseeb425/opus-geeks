// Case studies shown on /portfolio (cards + preview drawer) and on their own
// /portfolio/:slug pages.
//
// TODO(content): these are placeholder case studies. Replace titles, copy,
// metrics/results, stack and images with real, client-approved projects.
// Every number below (e.g. "250k+ active customers", "2.4x more bookings")
// is illustrative and must be verified or removed before launch.
// TODO(content): add `liveUrl` for any project with a public link — the
// "Live preview" button only renders when a real URL is present.

import { PHOTOS } from "./photos.js";

// `image` is the cover (cards, case study header); `gallery` holds the other
// screenshots-style photos. Photos come from data/photos.js and each one is
// used on exactly one project.

export const PROJECT_FILTERS = [
  "All",
  "Web Apps",
  "Mobile Apps",
  "UI/UX Design",
  "SaaS",
];

export const PROJECTS = [
  {
    slug: "mobile-banking-app",
    title: "Mobile Banking App",
    industry: "Fintech",
    category: "Mobile Apps",
    stack: ["React Native", "Node.js", "AWS"],
    metric: "40% faster onboarding",
    image: PHOTOS.bankCover,
    summary:
      "A mobile banking app with real-time transfers, budgeting tools and biometric login.",
    outcome:
      "250k+ customers now check balances, move money and track spending in one app.",
    gallery: [PHOTOS.bankDevice, PHOTOS.bankCard],
    challenge:
      "Customers had to navigate five disconnected flows to check balances, move money, and understand their spending.",
    solution:
      "We merged those flows into one app built around glanceable balances, in-context help and biometric sign-in.",
    results: ["250k+ active customers", "4.8/5 app store rating"],
    architecture:
      "React Native client, Node.js API services, event-driven AWS infrastructure, and encrypted financial data at rest.",
    liveUrl: null,
  },
  {
    slug: "patient-care-portal",
    title: "Patient Care Portal",
    industry: "Healthcare",
    category: "Web Apps",
    stack: ["React", "Node.js", "AWS"],
    metric: "2.4x more bookings",
    image: PHOTOS.healthCover,
    summary:
      "A HIPAA-aware portal for booking appointments, viewing records and joining telehealth visits.",
    outcome:
      "Patients book care in fewer steps, and staff spend less time on the phone.",
    gallery: [PHOTOS.healthNurse, PHOTOS.healthCall],
    challenge:
      "Care teams were losing time to phone calls, manual scheduling, and scattered patient information.",
    solution:
      "We built one accessible portal for appointments, records, secure messaging and telehealth check-in.",
    results: [
      "2.4x more bookings",
      "38% fewer support calls",
      "92% task completion rate",
    ],
    architecture:
      "React frontend, Node.js services, role-based access controls, and AWS infrastructure designed around privacy-first workflows.",
    liveUrl: null,
  },
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    industry: "Retail",
    category: "SaaS",
    stack: ["Next.js", "Prisma", "AWS"],
    metric: "100k+ monthly users",
    image: PHOTOS.shopCover,
    summary:
      "A headless storefront with fast checkout, live inventory sync and a loyalty companion app.",
    outcome:
      "A faster store that turns more visits into orders and scales with demand.",
    gallery: [PHOTOS.shopParcels, PHOTOS.shopWarehouse],
    challenge:
      "The legacy storefront was slow to iterate and made inventory, checkout, and loyalty data difficult to connect.",
    solution:
      "We split the storefront from commerce operations, so each team can release changes without waiting on the other.",
    results: [
      "100k+ monthly users",
      "28% higher checkout completion",
      "2.1s average load time",
    ],
    architecture:
      "Next.js storefront, Prisma data layer, composable commerce APIs, and AWS edge delivery.",
    liveUrl: null,
  },
  {
    slug: "property-listings-platform",
    title: "Property Listings Platform",
    industry: "Real Estate",
    category: "Web Apps",
    stack: ["React", "Laravel", "PostgreSQL"],
    metric: "60% less admin time",
    image: PHOTOS.propertyCover,
    summary:
      "A listings and CRM platform where agencies manage inventory, tours and lead follow-up.",
    outcome:
      "Every property, tour and lead in one place, from first inquiry to signed lease.",
    gallery: [PHOTOS.propertyReview, PHOTOS.propertyBuilding],
    challenge:
      "Property teams were updating listings in multiple tools and losing valuable leads between inquiry and follow-up.",
    solution:
      "We combined inventory, tours and CRM activity in one workspace that agents can scan in seconds.",
    results: [
      "60% less admin time",
      "3x faster lead response",
      "18k listings managed",
    ],
    architecture:
      "React dashboard, Laravel services, PostgreSQL search, and modular integrations for listing syndication.",
    liveUrl: null,
  },
  {
    slug: "vr-training-simulator",
    title: "VR Training Simulator",
    industry: "Game Development",
    category: "UI/UX Design",
    stack: ["Unity", "Figma", "AWS"],
    metric: "3x faster training",
    image: PHOTOS.vrCover,
    summary:
      "A VR simulator that trains new staff on complex procedures faster than classroom sessions.",
    outcome:
      "Trainees practice high-pressure procedures safely, as often as they need.",
    gallery: [PHOTOS.vrControllers, PHOTOS.vrHands],
    challenge:
      "Classroom training was expensive to repeat and left teams underprepared for high-pressure real-world scenarios.",
    solution:
      "We translated complex procedures into guided, repeatable VR scenarios with clear feedback at every step.",
    results: [
      "3x faster training",
      "94% learner confidence",
      "35% lower training cost",
    ],
    architecture:
      "Unity runtime, Figma interaction system, spatial audio design, and AWS telemetry for progress reporting.",
    liveUrl: null,
  },
  {
    slug: "brand-design-system",
    title: "Brand Design System",
    industry: "Retail",
    category: "UI/UX Design",
    stack: ["Figma", "React", "TypeScript"],
    metric: "30% faster launches",
    image: PHOTOS.designCover,
    summary:
      "An identity and component library that gives a growing retail brand one look on every screen.",
    outcome:
      "New pages and campaigns ship faster and look consistent from day one.",
    gallery: [PHOTOS.designPalette, PHOTOS.designWireframe],
    challenge:
      "A growing product team was shipping inconsistent experiences across web, mobile, campaigns, and retail touchpoints.",
    solution:
      "We built reusable components, clear usage guidelines and a step-by-step adoption plan for engineers.",
    results: [
      "30% faster launches",
      "120+ components",
      "1 shared product language",
    ],
    architecture:
      "Figma variables, documented React components, TypeScript tokens, and a contribution model for evolving the system.",
    liveUrl: null,
  },
];

export function findProject(slug) {
  return PROJECTS.find((project) => project.slug === slug) ?? null;
}

// Splits "250k+ active customers" into { value: "250k+", label: "active
// customers" } for the big-number results row on case study pages.
export function splitResult(text) {
  const match = text.match(/^([\d.,]+(?:[kKmMxs%]|\/\d+)?\+?)\s+(.+)$/);
  return match
    ? { value: match[1], label: match[2] }
    : { value: null, label: text };
}
