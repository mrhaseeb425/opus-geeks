import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { markPreloaderDone } from "../lib/preloader";

const EASE = [0.76, 0, 0.24, 1];
const DURATION = 700;
const SEEN_KEY = "og-intro-seen";

// Branded intro counter, shown on the first page load of a browser session
// only. It is a timed moment, not a real loading indicator, so repeating it
// on every refresh or shared link just delayed content (and read as
// "loading" on slower machines). Skipped entirely with reduced motion.
function shouldSkipIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return true;
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage unavailable: fall through and show it.
  }
  return false;
}

// Decided once per page load (not per render, so StrictMode's double
// initialisers in dev can't mark the intro as seen before it plays).
const SKIP_INTRO = typeof window !== "undefined" && shouldSkipIntro();

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(SKIP_INTRO);

  useEffect(() => {
    if (SKIP_INTRO) {
      markPreloaderDone();
      return undefined;
    }

    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const pct = Math.min(100, Math.round(((now - start) / DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          // The panel starts lifting now; content can begin its entrance.
          markPreloaderDone();
        }, 120);
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
          transition={{ duration: 0.5, ease: EASE }}
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
