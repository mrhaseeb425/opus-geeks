import { PHOTOS } from "./photos.js";

// Blog posts shown on /blog (grid + preview drawer) and on their own
// /blog/:slug pages. Each post has its own cover photo (data/photos.js).
//
// TODO(content): confirm the author names/roles are real team members (and
// that they agree to be credited). Author photos were removed because the
// previous stock photos were also reused as client testimonial avatars.

export const BLOG_CATEGORIES = [
  "All",
  "App Development",
  "UX/UI Design",
  "Product Strategy",
  "Web Development",
];

export const POSTS = [
  {
    slug: "choosing-between-native-and-cross-platform-for-your-next-app",
    title: "Choosing Between Native and Cross-Platform for Your Next App",
    category: "App Development",
    date: "May 14, 2026",
    readTime: "6 min read",
    author: "Ayesha Khan",
    authorRole: "Product Engineer",
    cover: PHOTOS.blogNative,
    excerpt:
      "A practical breakdown of when React Native or Flutter make sense, and when native still wins.",
    body: [
      {
        type: "p",
        text: "The best app stack is rarely decided by a framework popularity chart. It is decided by the product's interaction model, the team that will own it, and the performance bar the experience has to clear.",
      },
      {
        type: "h2",
        text: "Start with the product constraints",
      },
      {
        type: "p",
        text: "Cross-platform gives teams a powerful way to share product logic and move quickly across surfaces. Native remains the strongest choice when platform-specific capabilities, animation fidelity, or deep device integration are the product itself.",
      },
      {
        type: "h2",
        text: "A decision you can revisit",
      },
      {
        type: "p",
        text: "The important thing is to make the trade-offs explicit. A well-structured first release can preserve the option to move more native later without throwing away the product foundation.",
      },
    ],
    related: [
      "designing-fintech-interfaces-people-actually-trust",
      "shipping-an-mvp-without-cutting-the-wrong-corners",
    ],
  },
  {
    slug: "designing-fintech-interfaces-people-actually-trust",
    title: "Designing Fintech Interfaces People Actually Trust",
    category: "UX/UI Design",
    date: "May 06, 2026",
    readTime: "5 min read",
    author: "Mariam Siddiqui",
    authorRole: "Lead Product Designer",
    cover: PHOTOS.blogTrust,
    excerpt:
      "How clarity, feedback, and restraint build user confidence in financial products.",
    body: [
      {
        type: "p",
        text: "Trust is not a decorative layer added after the core product is finished. In financial software, trust is the product experience: every amount, transition, and confirmation needs to make sense.",
      },
      {
        type: "h2",
        text: "Make the important moments legible",
      },
      {
        type: "p",
        text: "Good fintech interfaces reduce uncertainty. They show what changed, what happens next, and how a user can recover before anxiety becomes abandonment.",
      },
      {
        type: "h2",
        text: "Restraint is a feature",
      },
      {
        type: "p",
        text: "Calm hierarchy and consistent language make a system feel dependable. The interface should know when to be quiet so the user's decision can be clear.",
      },
    ],
    related: [
      "why-design-systems-pay-for-themselves",
      "what-hipaa-aware-software-actually-requires",
    ],
  },
  {
    slug: "what-hipaa-aware-software-actually-requires",
    title: "What HIPAA-Aware Software Actually Requires",
    category: "Web Development",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    author: "Omar Farooq",
    authorRole: "Engineering Lead",
    cover: PHOTOS.blogHipaa,
    excerpt:
      "The engineering and process decisions that keep healthcare platforms compliant from day one.",
    body: [
      {
        type: "p",
        text: "Healthcare software needs more than a secure login. Privacy has to shape data flows, permissions, observability, vendor choices, and the way teams work together.",
      },
      {
        type: "h2",
        text: "Design the boundary first",
      },
      {
        type: "p",
        text: "The strongest systems make sensitive data boundaries visible in the architecture. Access is intentional, auditable, and limited to the workflow that needs it.",
      },
    ],
    related: ["building-retail-platforms-that-survive-traffic-spikes"],
  },
  {
    slug: "shipping-an-mvp-without-cutting-the-wrong-corners",
    title: "Shipping an MVP Without Cutting the Wrong Corners",
    category: "Product Strategy",
    date: "Apr 18, 2026",
    readTime: "4 min read",
    author: "Hassan Ali",
    authorRole: "Strategy Director",
    cover: PHOTOS.blogMvp,
    excerpt:
      "Where speed pays off, and where cutting corners quietly turns into technical debt.",
    body: [
      {
        type: "p",
        text: "A focused MVP is not a smaller version of every possible feature. It is the shortest path to learning whether the core promise works for real people.",
      },
      {
        type: "h2",
        text: "Protect the learning loop",
      },
      {
        type: "p",
        text: "Keep quality high around the core workflow, instrument the moments that matter, and defer complexity that does not improve the next decision.",
      },
    ],
    related: ["choosing-between-native-and-cross-platform-for-your-next-app"],
  },
  {
    slug: "why-design-systems-pay-for-themselves",
    title: "Why Design Systems Pay for Themselves",
    category: "UX/UI Design",
    date: "Apr 09, 2026",
    readTime: "5 min read",
    author: "Mariam Siddiqui",
    authorRole: "Lead Product Designer",
    cover: PHOTOS.blogDesignSystems,
    excerpt:
      "A reusable component library is not overhead. It is what lets a small team ship like a big one.",
    body: [
      {
        type: "p",
        text: "A design system creates leverage when it makes the right thing easier to repeat. The value is not a library of components; it is shared judgment encoded into the product.",
      },
      {
        type: "h2",
        text: "Consistency creates speed",
      },
      {
        type: "p",
        text: "When patterns are clear, teams spend less time debating basic decisions and more time improving the parts that differentiate the experience.",
      },
    ],
    related: ["designing-fintech-interfaces-people-actually-trust"],
  },
  {
    slug: "building-retail-platforms-that-survive-traffic-spikes",
    title: "Building Retail Platforms That Survive Traffic Spikes",
    category: "Web Development",
    date: "Mar 27, 2026",
    readTime: "6 min read",
    author: "Omar Farooq",
    authorRole: "Engineering Lead",
    cover: PHOTOS.blogRetail,
    excerpt:
      "Architecture lessons from launching e-commerce platforms that had to hold up on launch day.",
    body: [
      {
        type: "p",
        text: "Traffic spikes reveal whether a commerce platform was designed as a system or assembled as a collection of happy paths.",
      },
      {
        type: "h2",
        text: "Optimize the critical path",
      },
      {
        type: "p",
        text: "Caching, queueing, observability, and a resilient checkout path matter more than chasing theoretical scale across every surface.",
      },
    ],
    related: ["what-hipaa-aware-software-actually-requires"],
  },
];

export function findPost(slug) {
  return POSTS.find((post) => post.slug === slug) ?? null;
}

export function headingId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function authorInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}
