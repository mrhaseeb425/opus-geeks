import { useLayoutEffect, useRef } from "react";

function parseValue(value) {
  const match = String(value).match(/^(\d+)(.*)$/);
  return match
    ? { target: parseInt(match[1], 10), suffix: match[2], numeric: true }
    : { target: 0, suffix: "", numeric: false };
}

// Animates a stat like "120+" counting up from 0 once it scrolls into view.
// Frames write straight to the text node instead of re-rendering React each
// frame, and the final frame (plus a timeout safety net for throttled tabs)
// always lands exactly on the target. Screen readers get the final value via
// the visually hidden text; reduced motion shows the final value at once.
export default function CountUp({ value, duration = 1200 }) {
  const { target, suffix, numeric } = parseValue(value);
  const wrapperRef = useRef(null);
  const numberRef = useRef(null);

  // Layout effect: reset to 0 before first paint so the final value never
  // flashes before the count starts.
  useLayoutEffect(() => {
    const node = wrapperRef.current;
    const output = numberRef.current;
    if (!numeric || !node || !output) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frame = 0;
    let fallback = 0;
    const write = (n) => {
      output.textContent = `${n}${suffix}`;
    };
    write(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(Math.max((now - start) / duration, 0), 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          write(progress >= 1 ? target : Math.floor(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        fallback = window.setTimeout(() => write(target), duration + 100);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      write(target);
    };
  }, [target, suffix, duration, numeric]);

  if (!numeric) return <span>{value}</span>;

  return (
    <span ref={wrapperRef}>
      <span aria-hidden="true" ref={numberRef}>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
