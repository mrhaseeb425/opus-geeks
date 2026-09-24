import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isInViewport, observeReveal, REVEAL_DURATION_MS } from "../lib/reveal";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Scroll-triggered reveal: fade + small rise (transform/opacity only,
// 350ms, once per element). `delay` staggers mapped lists (see staggerDelay,
// max 80ms).
// - Content already on screen when it mounts (first load or after a route
//   change, see RouteScroll) appears immediately.
// - Safety net (lib/reveal.js): anything on screen ~1s without revealing is
//   forced straight to full opacity.
// - Once finished the reveal classes are dropped, so the element always ends
//   at full opacity and its own hover transitions apply untouched
//   (`settle` = how long the reveal's own transitions run).
// - Reduced motion or `disabled` (above-the-fold LCP content): no animation.
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  disabled = false,
  settle = REVEAL_DURATION_MS,
  style,
  ...props
}) {
  const ref = useRef(null);
  const [phase, setPhase] = useState(() =>
    disabled || prefersReducedMotion() ? "done" : "pending",
  );

  // Before first paint: anything already in view skips the animation.
  useLayoutEffect(() => {
    if (phase === "pending" && ref.current && isInViewport(ref.current)) {
      setPhase("done");
    }
    // Only on mount — later changes are driven by the observer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "pending") return undefined;
    return observeReveal(ref.current, ({ forced }) =>
      setPhase(forced ? "done" : "revealing"),
    );
  }, [phase]);

  useEffect(() => {
    if (phase !== "revealing") return undefined;
    const timer = window.setTimeout(
      () => setPhase("done"),
      settle + delay * 1000 + 50,
    );
    return () => window.clearTimeout(timer);
  }, [phase, delay, settle]);

  const revealClass =
    phase === "done" ? "" : ` reveal reveal-${variant} is-${phase}`;

  return (
    <Tag
      ref={ref}
      className={`${className}${revealClass}`}
      style={
        phase === "done" ? style : { ...style, "--reveal-delay": `${delay}s` }
      }
      {...props}
    >
      {children}
    </Tag>
  );
}
