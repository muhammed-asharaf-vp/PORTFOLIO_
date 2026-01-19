"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;

    const speed = 0.18;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      x += (mouseX - x) * speed;
      y += (mouseY - y) * speed;

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    requestAnimationFrame(loop);

    // Hover = dot only on circle zones
    const dotIn = () => cursor.classList.add("cursor-dot");
    const dotOut = () => cursor.classList.remove("cursor-dot");

    const dotZones = document.querySelectorAll(".cursor-dot-zone");

    dotZones.forEach((el) => {
      el.addEventListener("mouseenter", dotIn);
      el.addEventListener("mouseleave", dotOut);
    });

    return () => {
      window.removeEventListener("mousemove", move);

      dotZones.forEach((el) => {
        el.removeEventListener("mouseenter", dotIn);
        el.removeEventListener("mouseleave", dotOut);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-line-cursor pointer-events-none fixed top-0 left-0 z-[99999]"
    />
  );
}
