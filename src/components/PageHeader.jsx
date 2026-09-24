
// Editorial page header for every inner page: eyebrow with a short rule, big
// left-aligned H1, and the description bottom-aligned on the right. No dark
// gradient block — the page background carries straight through.
// The H1 is above the fold, so it never animates in.
export default function PageHeader({
  eyebrow,
  title,
  titleId,
  subtitle,
  children,
  className = "",
}) {
  return (
    <section className={`ed-page-head ${className}`}>
      <div className="frame ed-page-head-inner">
        <div>
          {eyebrow && <p className="ed-eyebrow">{eyebrow}</p>}
          <h1 id={titleId}>{title}</h1>
        </div>
        <div className="ed-page-head-aside">
          {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
