import { motion } from "framer-motion";
import { EASE_OUT_EXPO, getVariants } from "../lib/motion";

// Reusable scroll-triggered reveal (fade/slide/scale in once a section enters
// the viewport). `delay` is normally driven by staggerDelay() below so a
// mapped list of cards animates in one after another instead of all at once.
export default function Reveal({
  children,
  as: Tag = motion.div,
  variant = "up",
  delay = 0,
  duration = 0.6,
  amount = 0.2,
  once = true,
  className = "",
  ...props
}) {
  const MotionTag = typeof Tag === "string" ? motion[Tag] : Tag;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants(variant)}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
