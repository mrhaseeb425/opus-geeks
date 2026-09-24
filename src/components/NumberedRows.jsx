import Icon from "./Icon";
import { rowNumber } from "../lib/rows";

// Numbered editorial rows — the pattern that replaces boxed card grids:
// number (01, 02…) on the left, title + one-line description in the middle,
// arrow on the right, separated by hairline dividers.
//
// A row that links renders as one <a>, so the whole row is clickable and gets
// the hover/focus treatment (title turns accent, arrow shifts inside its
// circle). A row with nowhere to go renders as a plain <div> and shows no
// arrow, so nothing looks clickable that is not.

export function NumberedRow({
  index,
  title,
  description,
  href,
  onClick,
  thumb,
  meta,
  aside,
}) {
  const Inner = href ? "a" : "div";

  return (
    <li
      className={`ed-row ${thumb ? "has-thumb" : ""} ${aside ? "has-aside" : ""}`}
    >
      <Inner
        className="ed-row-inner"
        {...(href ? { href, onClick } : {})}
      >
        <span className="ed-row-num" aria-hidden="true">
          {rowNumber(index)}
        </span>
        {thumb && <span className="ed-row-thumb">{thumb}</span>}
        <span className="ed-row-body">
          <span className="ed-row-title">{title}</span>
          <span className="ed-row-col">
            {description && <span className="ed-row-desc">{description}</span>}
            {meta}
          </span>
        </span>
        {aside}
        {href && (
          <span className="ed-row-arrow" aria-hidden="true">
            <Icon name="arrowRight" />
          </span>
        )}
      </Inner>
    </li>
  );
}

// `items` are plain objects: { key, title, description, href, onClick, thumb,
// meta, aside }.
export default function NumberedRows({ items, className = "", ariaLabel }) {
  return (
    <ul className={`ed-rows ${className}`} aria-label={ariaLabel}>
      {items.map((item, index) => (
        <NumberedRow key={item.key ?? item.title} index={index} {...item} />
      ))}
    </ul>
  );
}
