import { useEffect, useRef, useState } from "react";

// Animates a stat like "120+" counting up from 0 once it scrolls into view,
// giving the numbers a bit of dashboard-style life instead of sitting static.
export default function CountUp({ value, duration = 1400 }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [display, setDisplay] = useState(() =>
    prefersReducedMotion ? target : 0,
  );
  const nodeRef = useRef(null);
  const hasRun = useRef(prefersReducedMotion);

  useEffect(() => {
    if (!match || prefersReducedMotion) return undefined;
    const node = nodeRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration, match, prefersReducedMotion]);

  if (!match) {
    return <span ref={nodeRef}>{value}</span>;
  }

  return (
    <span ref={nodeRef}>
      {display}
      {suffix}
    </span>
  );
}
