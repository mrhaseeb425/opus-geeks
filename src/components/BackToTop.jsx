import { useEffect, useState } from "react";
import Icon from "./Icon";

// Appears once the reader is well down a long page. Scroll position is read
// at most once per frame from a passive listener.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const isLongPage =
        document.documentElement.scrollHeight > viewport * 2.5;
      setVisible(isLongPage && window.scrollY > viewport * 1.2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <Icon name="arrowUp" className="back-to-top-icon" />
    </button>
  );
}
