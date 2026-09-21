import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];
const DURATION = 1400;

// Shown once per full page load (not on internal nav) — a percentage
// counter that fills then wipes away, the signature "loading" moment on
// award-style studio sites before the real UI is revealed.
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return undefined;
    }

    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const pct = Math.min(100, Math.round(((now - start) / DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 300);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE }}
          aria-hidden="true"
        >
          <span className="preloader-brand">OPUS GEEKS</span>
          <div className="preloader-bar-track">
            <span
              className="preloader-bar-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <span className="preloader-count">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
