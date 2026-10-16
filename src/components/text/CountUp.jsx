"use client";

import { gsap } from "@/lib/gsap";
import useTextAnimation from "./useTextAnimation";

const format = (n, pad, suffix) =>
  `${String(Math.round(n)).padStart(pad, "0")}${suffix}`;

/**
 * Counts from 0 to `value` when scrolled into view. Server renders the final value.
 */
export default function CountUp({
  value,
  pad = 0,
  suffix = "",
  duration = 1.6,
  className = "",
}) {
  const ref = useTextAnimation((el) => {
    const counter = { n: 0 };
    let shown = format(0, pad, suffix);
    el.textContent = shown;

    gsap.to(counter, {
      n: value,
      duration,
      ease: "power3.out",
      // Only touch the DOM when the visible number actually changes
      onUpdate: () => {
        const next = format(counter.n, pad, suffix);
        if (next !== shown) el.textContent = shown = next;
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });

    return () => {
      el.textContent = format(value, pad, suffix);
    };
  });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(value, pad, suffix)}
    </span>
  );
}
