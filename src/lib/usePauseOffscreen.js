import { useEffect, useRef } from "react";

// Adds `is-offscreen` to the element while it is outside the viewport so CSS
// can pause its looping animation (animation-play-state: paused). Infinite
// animations otherwise keep the compositor busy on every frame.
export function usePauseOffscreen() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      node.classList.toggle("is-offscreen", !entry.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
