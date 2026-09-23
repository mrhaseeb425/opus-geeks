// Centralized inline icon set so pages don't repeat raw SVG markup.
// Simple stroke-based glyphs (not brand logos) sized via the `.icon` CSS class.

const paths = {
  code: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="m9 9-3 3 3 3" />
      <path d="m15 9 3 3-3 3" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 6.5h.01M10.5 6.5h.01" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
      <path d="M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </>
  ),
  cloud: (
    <path d="M7.5 18.5h9a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 6.4 9.4 4.6 4.6 0 0 0 7.5 18.5Z" />
  ),
  pen: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  gamepad: (
    <>
      <rect x="2" y="7" width="20" height="10" rx="5" />
      <path d="M7 10v4M5 12h4" />
      <path d="M16 11h.01M18.5 13h.01" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-5 3 3 5-7" />
    </>
  ),
  heart: (
    <path d="M20.8 8.6c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.6 4.6 0 0 1 8.8-2 4.6 4.6 0 0 1 8.8 2Z" />
  ),
  bag: (
    <>
      <path d="M6 8h12l1 12H5Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 21v-4h6v4" />
      <path d="M8 7h1M8 11h1M8 15h1M15 7h1M15 11h1M15 15h1" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 8.2a3.2 3.2 0 0 1 0 6.2" />
      <path d="M14.5 20a5.5 5.5 0 0 1 6-4.6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12h18" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="5.5" />
      <path d="M8.5 13 7 21l5-2.5L17 21l-1.5-8" />
    </>
  ),
  rocket: (
    <>
      <path d="M14.5 3c2 1 4.5 3.5 5.5 5.5-1.5 4-5 8-8 9.5l-3-3c1.5-3 5.5-6.5 9.5-8-2-1-4.5 0-6 1.5S9 12 8 15.5" />
      <circle cx="14" cy="9" r="1.4" />
      <path d="M6 15c-2 .5-3 3-3 5 2 0 4.5-1 5-3" />
    </>
  ),
  check: <path d="M4 12.5 9.5 18 20 6" />,
  star: (
    <path d="M12 3.5 14.7 9l6 .9-4.3 4.2 1 6-5.4-2.8L6.6 20l1-6-4.3-4.2 6-.9Z" />
  ),
  quote: (
    <>
      <path d="M9.5 8.5C6.5 9.5 5 11.7 5 14.5A3.5 3.5 0 0 0 8.5 18 3.2 3.2 0 0 0 11.7 14.8c0-1.7-1.1-2.9-2.7-3.2.2-1.3 1.2-2.5 2.5-3.1Z" />
      <path d="M18 8.5c-3 1-4.5 3.2-4.5 6A3.5 3.5 0 0 0 17 18a3.2 3.2 0 0 0 3.2-3.2c0-1.7-1.1-2.9-2.7-3.2.2-1.3 1.2-2.5 2.5-3.1Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6.2 8-6.2" />
    </>
  ),
  phone: (
    <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  arrowRight: <path d="M4 12h16M14 5l7 7-7 7" />,
  arrowLeft: <path d="M20 12H4M10 5l-7 7 7 7" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="m19 5-8 8" />
      <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  expand: (
    <>
      <path d="M8 4H4v4M16 4h4v4M20 16v4h-4M4 16v4h4" />
      <path d="m4 4 5 5M20 4l-5 5M20 20l-5-5M4 20l5-5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7.5 10v6.5M7.5 7.6v.02M11.5 16.5V10M11.5 12.7c0-1.7 1-2.7 2.5-2.7s2.5 1 2.5 2.7v3.8" />
    </>
  ),
  facebook: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M14 8.5h-1.5c-.8 0-1.5.7-1.5 1.5v1.3H14l-.4 2.3H11v5.4" />
    </>
  ),
  twitterX: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="m8 8 8 8M16 8l-8 8" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  shield: <path d="M12 3 5 5.5v5c0 5 3 8 7 9.5 4-1.5 7-4.5 7-9.5v-5Z" />,
  moon: <path d="M20.5 15.4A8.5 8.5 0 0 1 8.6 3.5 8.5 8.5 0 1 0 20.5 15.4Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </>
  ),
};

export default function Icon({ name, className = "" }) {
  const glyph = paths[name];
  if (!glyph) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={`icon ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}
