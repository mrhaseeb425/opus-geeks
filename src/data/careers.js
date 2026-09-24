// Careers page content (/careers).
//
// TODO(content): confirm every perk below is accurate for Opus Geeks —
// remove or reword any that aren't. They are written as generic, verifiable
// working-style points, not specific benefits.
export const PERKS = [
  {
    icon: "users",
    title: "One cross-functional team",
    detail:
      "Designers, engineers and product leads work together from kickoff to launch.",
  },
  {
    icon: "code",
    title: "A modern stack",
    detail:
      "Ship with React, React Native, Node.js, TypeScript and cloud tools every day.",
  },
  {
    icon: "layers",
    title: "Real products, real users",
    detail:
      "Build platforms used by fintech, healthcare, retail and real estate teams.",
  },
  {
    icon: "rocket",
    title: "Room to grow",
    detail:
      "Own real work early, learn from senior peers and grow into lead roles.",
  },
];

// TODO(content): add real open roles. Leave empty to show the "send your CV"
// state. Shape:
// {
//   slug: "senior-react-engineer",
//   title: "Senior React Engineer",
//   team: "Engineering",
//   location: "Karachi (on-site)" | "Remote",
//   type: "Full-time",
//   applyUrl: "mailto:careers@opusgeeks.com?subject=Senior%20React%20Engineer",
// }
export const OPEN_ROLES = [];

// TODO(content): confirm the address applicants should use (a dedicated
// careers@ inbox is recommended). Falls back to the main contact email.
export const CAREERS_EMAIL = null;
