import Icon from "./Icon";

// Filled stars with one accessible label ("5 out of 5 stars") instead of
// five unlabeled outline icons.
export function StarRating({ value = 5, max = 5 }) {
  return (
    <div
      className="testimonial-stars"
      role="img"
      aria-label={`${value} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, index) => (
        <Icon
          name="star"
          className={`icon-sm star-icon ${index < value ? "is-filled" : ""}`}
          key={index}
        />
      ))}
    </div>
  );
}

// Monogram used in place of stock-photo avatars.
export function Initials({ text, className = "" }) {
  return (
    <span className={`initials-avatar ${className}`} aria-hidden="true">
      {text}
    </span>
  );
}

// Client headshot — renders nothing until a real photo is added
// (TODO in data/site.js TESTIMONIALS[].photo).
export function ClientPhoto({ photo, name }) {
  if (!photo) return null;
  return (
    <img
      className="client-photo"
      src={photo}
      alt={name ? `Photo of ${name}` : ""}
      width="44"
      height="44"
      loading="lazy"
      decoding="async"
    />
  );
}

// Company logo — renders nothing until a real logo is added
// (TODO in data/site.js TESTIMONIALS[].logo).
export function CompanyLogo({ logo, company }) {
  if (!logo) return null;
  return (
    <img
      className="company-logo"
      src={logo}
      alt={`${company} logo`}
      width="88"
      height="28"
      loading="lazy"
      decoding="async"
    />
  );
}
