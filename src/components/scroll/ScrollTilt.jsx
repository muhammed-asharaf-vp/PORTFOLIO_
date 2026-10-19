"use client";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Rotates a full-bleed band (e.g. the marquee) from one tilt to the other while
 * it crosses the viewport. It's rendered wider than the screen so the rotated
 * ends never show; body's `overflow-x: clip` hides the overflow.
 */
export default function ScrollTilt({ children, from = 3, to = -3 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <div ref={ref} className="relative z-10">
      <motion.div
        style={reduced ? undefined : { rotate }}
        className="w-[112vw] -ml-[6vw] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
