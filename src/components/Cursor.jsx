import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function detectSupport() {
  if (typeof window === "undefined") return false;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return hasFinePointer && !prefersReducedMotion;
}

// The native pointer stays visible everywhere on the site — matching
// lusion.co, which keeps the system arrow for regular navigation. This only
// draws a filled label circle (e.g. "View") when hovering an element marked
// with data-cursor-label, and index.css hides the native cursor on just
// that element while it's active.
export default function Cursor() {
  const [enabled] = useState(detectSupport);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 26, stiffness: 300, mass: 0.4 });
  const springY = useSpring(y, { damping: 26, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return undefined;

    const handlePointerMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target.closest("[data-cursor-label]");
      setLabel(target ? target.getAttribute("data-cursor-label") : "");
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled, x, y]);

  if (!enabled || !label) return null;

  return (
    <motion.span
      className="cursor-ring has-label"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <span className="cursor-ring-label">{label}</span>
    </motion.span>
  );
}
