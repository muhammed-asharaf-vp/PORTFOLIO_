"use client";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Scroll-out parallax: as its section leaves the top of the viewport the content
 * drifts up slower than the page, shrinks and fades, so the next section
 * appears to slide over it.
 */
export default function ScrollExit({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduced ? undefined : { y, scale, opacity }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
