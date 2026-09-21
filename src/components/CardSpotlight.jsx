import { useEffect } from "react";

const CARD_SELECTOR =
  ".card-glass, .industry-card, .team-card, .process-step, .faq-item, .portfolio-card-image";

// Tracks the pointer over any card and exposes its position as CSS custom
// properties, driving the radial-gradient glow defined in index.css — the
// "card lights up under the cursor" hover feedback.
export default function CardSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    let activeCard = null;

    const handlePointerMove = (event) => {
      const card = event.target.closest(CARD_SELECTOR);

      if (card !== activeCard) {
        activeCard?.classList.remove("is-spotlit");
        activeCard = card;
        activeCard?.classList.add("is-spotlit");
      }

      if (!card) return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty(
        "--spot-x",
        `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
      );
      card.style.setProperty(
        "--spot-y",
        `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
      );
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      activeCard?.classList.remove("is-spotlit");
    };
  }, []);

  return null;
}
