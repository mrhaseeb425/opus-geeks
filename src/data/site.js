// Single source of truth for content shared across the navbar, footer, and
// pages, so copy only needs to be updated in one place.

export const NAV_ITEMS = [
  { label: "Home", hash: "home" },
  { label: "Portfolio", hash: "portfolio" },
  { label: "Blogs", hash: "blogs" },
  { label: "About", hash: "about" },
  { label: "Contact Us", hash: "contact" },
  { label: "FAQs", hash: "faqs" },
];

export const SERVICES = [
  {
    name: "App Development",
    hash: "app-development",
    icon: "code",
    detail: "Build fast, scalable product apps",
    summary:
      "Native and cross-platform mobile apps engineered for performance, built to scale from first release to millions of users.",
    highlights: [
      "iOS, Android & cross-platform (React Native / Flutter)",
      "API design, integrations & backend architecture",
      "App Store / Play Store launch & release management",
    ],
  },
  {
    name: "Web Development",
    hash: "web-development",
    icon: "browser",
    detail: "Launch full-stack web platforms",
    summary:
      "Responsive, custom-built websites and web applications that load fast, rank well, and convert visitors into customers.",
    highlights: [
      "Custom web apps, dashboards & e-commerce platforms",
      "SEO-friendly, responsive front-end engineering",
      "Cloud hosting, CI/CD & ongoing maintenance",
    ],
  },
  {
    name: "UX/UI Design",
    hash: "ux-ui-design",
    icon: "pen",
    detail: "Design systems and human-centered journeys",
    summary:
      "Interface design grounded in user research, wireframing, and testing — crafted so every screen feels intuitive.",
    highlights: [
      "User research, wireframes & interactive prototypes",
      "Design systems built for consistency at scale",
      "Usability testing & iterative refinement",
    ],
  },
  {
    name: "Game Development",
    hash: "game-development",
    icon: "gamepad",
    detail: "Mobile games and VR experiences",
    summary:
      "Mobile games and immersive VR experiences built with modern engines, from concept and mechanics to launch.",
    highlights: [
      "2D/3D mobile game development",
      "VR/AR experiences & interactive simulations",
      "Game economy, monetization & live-ops support",
    ],
  },
];

export const INDUSTRIES = [
  {
    name: "Fintech",
    icon: "chart",
    detail: "Secure, compliant financial technology platforms.",
  },
  {
    name: "Healthcare",
    icon: "heart",
    detail: "HIPAA-aware software for providers and patients.",
  },
  {
    name: "Retail",
    icon: "bag",
    detail: "E-commerce and operations software that scales.",
  },
  {
    name: "Real Estate",
    icon: "building",
    detail: "Property management and listing platforms.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    name: "Branding",
    icon: "layers",
    detail: "We define your positioning, identity, and product strategy.",
  },
  {
    step: "02",
    name: "Prototype",
    icon: "pen",
    detail: "Wireframes and interactive prototypes validate the experience.",
  },
  {
    step: "03",
    name: "Development",
    icon: "code",
    detail: "Engineering builds a production-ready, tested product.",
  },
  {
    step: "04",
    name: "Launch",
    icon: "rocket",
    detail: "We ship, monitor, and support your product post-launch.",
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

export const STATS = [
  { label: "Happy Clients", value: "120+", icon: "users" },
  { label: "Projects Completed", value: "180+", icon: "briefcase" },
  { label: "Team Members", value: "35+", icon: "layers" },
  { label: "Awards Won", value: "12+", icon: "award" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Responsive from day one and genuinely invested in getting the product right. Our web platform launched on time and has been rock solid since.",
    author: "Founder",
    role: "Fintech Startup",
  },
  {
    quote:
      "The team took the time to understand our workflows before writing a single line of code. Professional, communicative, and easy to work with.",
    author: "Operations Lead",
    role: "Retail Company",
  },
  {
    quote:
      "Great design instincts paired with solid engineering. They caught issues we hadn't even thought of and shipped a much stronger product for it.",
    author: "Product Manager",
    role: "Healthcare Platform",
  },
];

export const CONTACT = {
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
  "We design exceptional brands, products, web apps, mobile apps, and websites for startups and enterprises.";
