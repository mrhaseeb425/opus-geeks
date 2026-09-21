import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

// Full-screen wipe played between page changes: a panel rises to fully
// cover the viewport, `onCovered` swaps the underlying page while hidden,
// then the panel rises off-screen to reveal it — the "curtain" transition
// used throughout lusion.co instead of a plain crossfade.
export default function PageCurtain({ trigger, onCovered }) {
  const controls = useAnimationControls();
  const isFirstRender = useRef(true);
  const onCoveredRef = useRef(onCovered);

  useEffect(() => {
    onCoveredRef.current = onCovered;
  }, [onCovered]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onCoveredRef.current();
      return undefined;
    }

    let cancelled = false;
    (async () => {
      await controls.start({ y: "0%", transition: { duration: 0.45, ease: EASE } });
      if (cancelled) return;
      onCoveredRef.current();
      await controls.start({ y: "-100%", transition: { duration: 0.5, ease: EASE } });
      if (cancelled) return;
      controls.set({ y: "100%" });
    })();

    return () => {
      cancelled = true;
    };
  }, [trigger, controls]);

  return (
    <motion.div
      className="page-curtain"
      initial={{ y: "100%" }}
      animate={controls}
      aria-hidden="true"
    />
  );
}
