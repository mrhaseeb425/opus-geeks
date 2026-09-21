export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  clip: {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: { clipPath: "inset(0% 0% 0% 0%)" },
  },
};

// Exposes a variant object so a child of a Reveal can animate in lockstep
// with its parent's hidden/visible state (Framer Motion variant
// propagation) instead of declaring its own whileInView trigger — nesting
// two independent whileInView triggers on the same card is unreliable and
// can leave the inner one stuck at its hidden state indefinitely.
export function getVariants(variant = "up") {
  return VARIANTS[variant] ?? VARIANTS.up;
}
