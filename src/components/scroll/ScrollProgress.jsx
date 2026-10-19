"use client";
import { motion, useScroll, useSpring } from "motion/react";

/** Thin accent bar across the top that fills with page scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Spring smooths the native-scroll steps on mobile (Lenis is off there)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-[var(--accent)] shadow-[0_0_12px_var(--accent)] pointer-events-none"
    />
  );
}
