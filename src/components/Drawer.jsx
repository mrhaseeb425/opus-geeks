import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { lockScroll, unlockScroll } from "../lib/smoothScroll";
import Icon from "./Icon";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

// Shared side-panel shell for the portfolio and blog quick previews: locks
// background scroll, closes on Escape or backdrop click,
// keeps keyboard focus inside while open and returns it to the trigger on
// close. Render it inside <AnimatePresence> for the open/close animation.
export default function Drawer({
  labelledBy,
  onClose,
  className = "",
  closeLabel = "Close",
  scrollRef,
  children,
  footer,
}) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    lockScroll();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      unlockScroll();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
      };

  return (
    <motion.div
      className="drawer-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.aside
        ref={panelRef}
        className={`drawer-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        {...slide}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="drawer-close-button"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <Icon name="plus" />
        </button>
        <div className="drawer-scroll" ref={scrollRef}>
          {children}
        </div>
        {footer && <div className="drawer-footer">{footer}</div>}
      </motion.aside>
    </motion.div>
  );
}
