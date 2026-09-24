import { CONTENT } from "../data/site";
import { CLIENT_LOGOS, primaryRating, REVIEW_PLATFORMS } from "../data/trust";
import { usePauseOffscreen } from "../lib/usePauseOffscreen";
import Icon from "./Icon";

// Trust blocks render ONLY real content: each needs its CONTENT flag on
// (data/site.js) and at least one real entry in data/trust.js. With no real
// data they render nothing — no placeholder text, boxes or icons.

const realLogos = () => CLIENT_LOGOS.filter((logo) => logo.src && logo.name);
const ratedPlatforms = () =>
  REVIEW_PLATFORMS.filter((badge) => badge.rating != null);

function Marquee({ logos }) {
  const ref = usePauseOffscreen();
  const renderLogo = (logo) => (
    <img
      className="client-logo-img"
      src={logo.src}
      alt={logo.name}
      width={logo.width ?? 120}
      height={logo.height ?? 40}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <section className="logo-strip" aria-label="Clients">
      <div className="frame">
        <p className="logo-strip-title">Trusted by product teams at</p>
      </div>
      <div className="logo-marquee" ref={ref}>
        <ul className="logo-marquee-track">
          {logos.map((logo) => (
            <li key={logo.name}>{renderLogo(logo)}</li>
          ))}
          {/* Second copy makes the loop seamless; hidden from assistive tech. */}
          {logos.map((logo) => (
            <li
              key={`${logo.name}-clone`}
              aria-hidden="true"
              className="is-clone"
            >
              {renderLogo(logo)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Slow, infinite logo marquee: muted until hover, pauses on hover, while off
// screen, and entirely under prefers-reduced-motion.
export function LogoMarquee() {
  const logos = realLogos();
  if (!CONTENT.showClientLogos || logos.length === 0) return null;
  return <Marquee logos={logos} />;
}

function Stars({ rating }) {
  const filled = Math.round(rating);
  return (
    <span className="rating-stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          name="star"
          className={`icon-sm star-icon ${index < filled ? "is-filled" : ""}`}
        />
      ))}
    </span>
  );
}

// "Rated 4.9/5 on Clutch" — only when a real rating exists.
export function RatingSummary() {
  const rating = primaryRating();
  if (!CONTENT.showReviews || !rating) return null;
  const content = (
    <>
      <Stars rating={rating.rating} />
      <span>
        Rated <strong>{rating.rating}/5</strong> on {rating.platform}
        {rating.reviews ? ` from ${rating.reviews} reviews` : ""}
      </span>
    </>
  );
  return rating.url ? (
    <a
      className="rating-summary"
      href={rating.url}
      target="_blank"
      rel="noreferrer noopener"
    >
      {content}
    </a>
  ) : (
    <p className="rating-summary">{content}</p>
  );
}

// Review-platform / award badges — only platforms with a real rating.
export function ReviewBadges() {
  const platforms = ratedPlatforms();
  if (!CONTENT.showReviews || platforms.length === 0) return null;
  return (
    <ul className="review-badges" aria-label="Reviews and recognition">
      {platforms.map((badge) => {
        const body = (
          <>
            <span className="review-badge-platform">{badge.platform}</span>
            <Stars rating={badge.rating} />
            <span className="review-badge-meta">
              {badge.rating}/5
              {badge.reviews ? ` · ${badge.reviews} reviews` : ""}
            </span>
          </>
        );
        return (
          <li key={badge.platform} className="review-badge">
            {badge.url ? (
              <a href={badge.url} target="_blank" rel="noreferrer noopener">
                {body}
              </a>
            ) : (
              <div>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
