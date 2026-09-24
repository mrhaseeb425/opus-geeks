// Trust content: client logos and review-platform ratings. Nothing renders
// until real data is added here AND the matching flag in CONTENT
// (data/site.js) is turned on — no placeholders ever appear on the page.

// TODO(content): add real client logos (with permission), then set
// CONTENT.showClientLogos = true. SVG preferred; otherwise a WebP at 2x
// display size (~240x80). Shape:
// { name: "Client Co", src: "/logos/client-co.svg", width: 120, height: 40 }
export const CLIENT_LOGOS = [];

// TODO(content): add real ratings, review counts and profile URLs for the
// platforms Opus Geeks is actually listed on, then set
// CONTENT.showReviews = true. Platforms without a rating are never shown.
// { platform: "Clutch", rating: 4.9, reviews: 32, url: "https://clutch.co/profile/..." }
export const REVIEW_PLATFORMS = [
  { platform: "Clutch", rating: null, reviews: null, url: null },
  { platform: "GoodFirms", rating: null, reviews: null, url: null },
  { platform: "DesignRush", rating: null, reviews: null, url: null },
  { platform: "Google Reviews", rating: null, reviews: null, url: null },
];

// Headline rating for the testimonials section ("Rated 4.9/5 on Clutch").
// Uses the first platform above that has a real rating.
export function primaryRating() {
  return REVIEW_PLATFORMS.find((p) => p.rating != null) ?? null;
}
