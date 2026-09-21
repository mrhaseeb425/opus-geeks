import { useEffect, useRef } from "react";

const TRAIL_LIFETIME = 650; // ms a point stays visible before fully fading
const MAX_WIDTH = 9;

// Canvas overlay that paints a soft, fading ribbon behind the pointer as it
// moves — the "trail" effect that makes cursor movement itself feel alive,
// independent of the dot/ring cursor in Cursor.jsx.
export default function MouseTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!hasFinePointer || prefersReducedMotion) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let points = [];
    let frame;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (event) => {
      points.push({ x: event.clientX, y: event.clientY, time: performance.now() });
    };

    const render = () => {
      const now = performance.now();
      points = points.filter((point) => now - point.time < TRAIL_LIFETIME);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const age = (now - curr.time) / TRAIL_LIFETIME;
        const opacity = Math.max(0, 1 - age) * 0.32;
        if (opacity <= 0) continue;

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.strokeStyle = `rgba(23, 105, 255, ${opacity})`;
        ctx.lineWidth = Math.max(0.6, MAX_WIDTH * (1 - age));
        ctx.lineCap = "round";
        ctx.stroke();
      }

      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-trail-canvas" aria-hidden="true" />;
}
