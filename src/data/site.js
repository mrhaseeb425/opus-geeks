import { PHOTOS } from "./photos.js";

// Single source of truth for content shared across the navbar, footer, and
// pages, so copy only needs to be updated in one place.

// `path` is the real URL (see lib/router.js); `hash` is kept so old
// /#contact-style links still resolve.
export const NAV_ITEMS = [
  { label: "Home", hash: "home", path: "/" },
  { label: "Portfolio", hash: "portfolio", path: "/portfolio" },
  { label: "Blogs", hash: "blogs", path: "/blog" },
  { label: "About", hash: "about", path: "/about" },
  { label: "Contact Us", hash: "contact", path: "/contact" },
  { label: "FAQs", hash: "faqs", path: "/faqs" },
];

// Single source of truth for services: navbar dropdown, mobile menu, footer,
// home page, Services page and the contact form all read from this list.
// TODO(content): confirm the final service list. The previous Services page
// described marketing services (SEO, SMM, affiliate, ads, market research,
// content marketing); that copy was removed because it conflicted with the
// development services shown everywhere else. If Opus Geeks also sells
// marketing, or wants to list Custom Software / Cloud & DevOps / AI as
// separate services, add them here with the same fields.
export const SERVICES = [
  {
    name: "App Development",
    cta: "Explore app development",
    slug: "app-development",
    hash: "app-development",
    // Short line for the navbar dropdown.
    menu: "iOS, Android and cross-platform apps",
    tag: "Mobile & cross-platform",
    photo: PHOTOS.serviceApp,
    detailPhoto: PHOTOS.serviceAppDetail,
    icon: "code",
    // Card line: what we build + what the client gets (Home + Services cards).
    card: "iOS and Android apps from one codebase, shipped to the App Store and Google Play.",
    summary:
      "We build native and cross-platform apps with the backend and APIs they need, then handle store submission and every release after it.",
    highlights: [
      "iOS, Android and cross-platform (React Native, Flutter)",
      "APIs, integrations and backend architecture",
      "App Store and Google Play submission and releases",
    ],
  },
  {
    name: "Web Development",
    cta: "Explore web development",
    slug: "web-development",
    hash: "web-development",
    // Short line for the navbar dropdown.
    menu: "Web apps, portals and online stores",
    tag: "Web platforms",
    photo: PHOTOS.serviceWeb,
    detailPhoto: PHOTOS.serviceWebDetail,
    icon: "browser",
    card: "Fast, secure websites, dashboards and platforms that are easy to grow.",
    summary:
      "Custom web applications, customer portals and e-commerce builds with clean front-end code, search-friendly pages and hosting we set up and maintain.",
    highlights: [
      "Web apps, dashboards and e-commerce platforms",
      "Responsive, SEO-friendly front-end engineering",
      "Cloud hosting, CI/CD and ongoing maintenance",
    ],
  },
  {
    name: "UI/UX Design",
    cta: "Explore UI/UX design",
    slug: "ux-ui-design",
    hash: "ux-ui-design",
    // Short line for the navbar dropdown.
    menu: "Research, prototypes and design systems",
    tag: "Product design",
    photo: PHOTOS.serviceUx,
    detailPhoto: PHOTOS.serviceUxDetail,
    icon: "pen",
    card: "Research, wireframes and tested prototypes, so you build the right thing first.",
    summary:
      "We talk to your users, map the key journeys and test clickable prototypes before development starts, so engineering time goes into screens that work.",
    highlights: [
      "User research, wireframes and interactive prototypes",
      "Design systems that keep every screen consistent",
      "Usability testing and iteration before launch",
    ],
  },
  {
    name: "Game Development",
    cta: "Explore game development",
    slug: "game-development",
    hash: "game-development",
    // Short line for the navbar dropdown.
    menu: "Mobile games and VR experiences",
    tag: "Games & XR",
    photo: PHOTOS.serviceGame,
    detailPhoto: PHOTOS.serviceGameDetail,
    icon: "gamepad",
    card: "2D, 3D and VR games and training simulations, from prototype to live updates.",
    summary:
      "Mobile games and VR experiences built in modern engines. We design the mechanics, build the levels and support the game with updates after release.",
    highlights: [
      "2D and 3D mobile game development",
      "VR and AR experiences and training simulations",
      "Game economy, monetization and live-ops support",
    ],
  },
];

export const INDUSTRIES = [
  {
    name: "Fintech",
    icon: "chart",
    photo: PHOTOS.industryFintech,
    detail: "Secure payments, banking and lending apps.",
  },
  {
    name: "Healthcare",
    icon: "heart",
    photo: PHOTOS.industryHealthcare,
    detail: "HIPAA-aware portals for patients and providers.",
  },
  {
    name: "Retail",
    icon: "bag",
    photo: PHOTOS.industryRetail,
    detail: "Online stores, inventory and loyalty systems.",
  },
  {
    name: "Real Estate",
    icon: "building",
    photo: PHOTOS.industryRealEstate,
    detail: "Listings, CRM and property management tools.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    name: "Discover",
    detail:
      "We learn your goals, users and constraints, and agree on the scope.",
  },
  {
    step: "02",
    name: "Design",
    detail:
      "You click through real prototypes and give feedback before code is written.",
  },
  {
    step: "03",
    name: "Build",
    detail: "Short cycles with weekly demos, testing as we go.",
  },
  {
    step: "04",
    name: "Launch & support",
    detail: "We release, monitor and keep improving your product.",
  },
];

// Home "Why Opus Geeks" differentiators.
// TODO(content): confirm the update cadence (weekly?) and that every project
// gets a single named project lead before launch; reword if not.
export const WHY_US = [
  {
    title: "One team, idea to launch",
    detail: "Designers and engineers work side by side, so decisions happen fast.",
  },
  {
    title: "Weekly demos, no surprises",
    detail:
      "You see working software every week and always know what's next.",
  },
  {
    title: "A lead who owns your project",
    detail:
      "One accountable person who knows your product and answers your questions.",
  },
  {
    title: "Support after launch",
    detail: "Monitoring, fixes and new features once your product is live.",
  },
];

export const TECH_STACK = [
  "React",
  "React Native",
  "Flutter",
  "Node.js",
  "TypeScript",
  "Next.js",
  "PostgreSQL",
  "Firebase",
  "AWS",
  "Docker",
  "Figma",
  "Unity",
];

// Content flags: a block only renders when its flag is true AND real
// content exists for it. Nothing placeholder-like is ever shown.
// TODO(content): flip each flag to true once the real content is added.
export const CONTENT = {
  showClientLogos: false, // logo strip under the hero (data/trust.js CLIENT_LOGOS)
  showReviews: false, // rating summary + review badges (data/trust.js REVIEW_PLATFORMS)
  showTeamPhotos: false, // photo grid in the Home team section (TEAM_PHOTOS below)
};

// Shared by the Home page grid and the Portfolio carousel.
// TODO(content): replace `author: null` with each client's real name,
// add `photo` and `logo`, (and
// optionally a real photo) once permission to publish is confirmed. Until then
// the card shows role + company only, so no role is ever printed twice.
export const TESTIMONIALS = [
  {
    quote:
      "Responsive from day one and genuinely invested in getting the product right. Our web platform launched on time and has been rock solid since.",
    author: null,
    role: "Founder & CEO",
    company: "Northstar Finance",
    companyMark: "NF",
    rating: 5,
    photo: null, // TODO(content): client headshot URL (WebP, 88x88)
    logo: null, // TODO(content): company logo URL (SVG or WebP)
  },
  {
    quote:
      "The team took the time to understand our workflows before writing a single line of code. Professional, communicative, and easy to work with.",
    author: null,
    role: "VP Operations",
    company: "Arc & Oak",
    companyMark: "AO",
    rating: 5,
    photo: null, // TODO(content): client headshot URL (WebP, 88x88)
    logo: null, // TODO(content): company logo URL (SVG or WebP)
  },
  {
    quote:
      "Great design instincts paired with solid engineering. They caught issues we hadn't even thought of and shipped a much stronger product for it.",
    author: null,
    role: "Product Manager",
    company: "Careline Health",
    companyMark: "CH",
    rating: 5,
    photo: null, // TODO(content): client headshot URL (WebP, 88x88)
    logo: null, // TODO(content): company logo URL (SVG or WebP)
  },
];

// Primary line is the client's name when we have one, otherwise their role;
// the secondary line never repeats what the primary line already says.
export function testimonialByline(testimonial) {
  const { author, role, company } = testimonial;
  return author
    ? { primary: author, secondary: `${role}, ${company}` }
    : { primary: role, secondary: company };
}

// TODO(content): verify email, phone and both office addresses. The Karachi
// address ("Block 22, Street Gulshan") looks incomplete — confirm the full
// street address or show the city only.
export const CONTACT = {
  // TODO(content): your Calendly (or Cal.com / Google Calendar) booking link
  // for the 30-minute intro call. Until set, "Book a call" opens an email.
  calendlyUrl: null,
  email: "contact@opusgeeks.com",
  phone: "+1 (346) 690-4693",
  phoneHref: "+13466904693",
  offices: [
    {
      label: "Karachi, Pakistan",
      address: "Block 22, Street Gulshan, Karachi, Sindh, Pakistan",
    },
    {
      label: "Pembroke Pines, FL (HQ)",
      address: "8903 Pines Blvd 217 153, Pembroke Pines, FL 33024, USA",
    },
  ],
};

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/company/opusgeeks",
  },
  {
    name: "Facebook",
    icon: "facebook",
    href: "https://www.facebook.com/profile.php?id=100083553187361",
  },
  {
    name: "Twitter / X",
    icon: "twitterX",
    href: "https://x.com/opusgeeks",
  },
];

export const TAGLINE =
  "Mobile apps, web platforms, product design and games for startups and growing companies.";

// Home "Life at Opus Geeks" photo grid. While empty (or
// CONTENT.showTeamPhotos is false) the section shows a text-only layout.
// TODO(content): add 5 real office/team photos (WebP, ~1200px wide for the
// first/large tile, ~600px for the others) with descriptive alt text, then set
// CONTENT.showTeamPhotos = true. Shape:
// { src: "/team/karachi-office.webp", alt: "The Karachi team at a sprint review", caption: "Karachi office", width: 1200, height: 900 }
export const TEAM_PHOTOS = [];
