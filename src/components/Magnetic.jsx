import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Wraps an interactive child (button/link) and nudges it toward the pointer
// on hover, snapping back with a spring — the "magnetic button" feel used
// throughout lusion.co. Pointer handlers are inert on touch devices since
// no pointermove fires there.
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const handlePointerMove = (event) => {
    const bounds = ref.current.getBoundingClientRect();
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
