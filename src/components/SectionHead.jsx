import Reveal from "./Reveal";

// Section header in three layouts:
// - "editorial" (the default, and what "split" now maps to): eyebrow with a
//   short rule, large left-aligned heading on ~60% of the row, and the intro
//   bottom-aligned on the right. Stacks on narrow screens.
// - "stacked":  left-aligned column, used beside content in a two-column grid
// - "center":   eyebrow + heading + intro centered — kept only where it reads
//               better than the editorial split
export default function SectionHead({
  layout = "editorial",
  eyebrow,
  title,
  titleId,
  subtitle,
  action,
  children,
}) {
  const heading = (
    <>
      {eyebrow && <p className="ed-eyebrow">{eyebrow}</p>}
      <h2 className="section-title" id={titleId}>
        {title}
      </h2>
    </>
  );
  const intro = subtitle && <p className="section-subtitle">{subtitle}</p>;

  if (layout === "editorial" || layout === "split") {
    return (
      <Reveal as="div" className="section-head is-editorial">
        <div className="section-head-main">{heading}</div>
        <div className="ed-head-aside">
          {intro}
          {action && <div className="section-head-action">{action}</div>}
          {children}
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal
      as="div"
      className={`section-head ${layout === "stacked" ? "is-stacked" : "is-center"}`}
    >
      {heading}
      {intro}
      {children}
      {action && <div className="section-head-action">{action}</div>}
    </Reveal>
  );
}
