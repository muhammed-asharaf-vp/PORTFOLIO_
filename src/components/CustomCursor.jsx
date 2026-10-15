"use client";

import { useEffect, useRef } from "react";

const SPEED = 0.18;

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Same condition as the CSS that shows the cursor: no work on touch / small screens
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;
    let rafId = 0;

    const loop = () => {
      x += (mouseX - x) * SPEED;
      y += (mouseY - y) * SPEED;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Sleep once the cursor has caught up; the next mousemove wakes it
      if (Math.abs(mouseX - x) < 0.1 && Math.abs(mouseY - y) < 0.1) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(loop);
    };

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(loop);
    };

    // Delegated hover, so zones mounted later (theme button, game buttons) work too
    const over = (e) => {
      const inZone =
        e.target instanceof Element && e.target.closest(".cursor-dot-zone");
      cursor.classList.toggle("cursor-dot", Boolean(inZone));
    };

    const start = () => {
      window.addEventListener("mousemove", move, { passive: true });
      document.addEventListener("mouseover", over, { passive: true });
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const sync = () => (media.matches ? start() : stop());
    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="custom-line-cursor pointer-events-none fixed top-0 left-0 z-[99999]"
    />
  );
}
