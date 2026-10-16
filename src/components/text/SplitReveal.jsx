"use client";

import { gsap, SplitText } from "@/lib/gsap";
import useTextAnimation from "./useTextAnimation";

const EFFECTS = {
  // Masked slide-up: the classic line / letter reveal
  rise: { from: { yPercent: 110 }, ease: "expo.out", mask: true },
  // Masked slide-up with a slight rotation, for big display type
  tilt: {
    from: { yPercent: 120, rotate: 8, transformOrigin: "0% 100%" },
    ease: "power4.out",
    mask: true,
  },
  // 3D flip around the baseline
  flip: {
    from: { rotateX: -100, opacity: 0, transformOrigin: "50% 100%" },
    ease: "back.out(1.7)",
    perspective: true,
  },
  // Soft blur-in for short supporting copy (filters are costly: keep it to a few words)
  blur: {
    from: { opacity: 0, filter: "blur(10px)", y: 12 },
    ease: "power3.out",
  },
};

const SPLIT_TYPE = { chars: "words,chars", words: "words", lines: "lines" };
const DEFAULT_STAGGER = { chars: 0.025, words: 0.06, lines: 0.12 };

/**
 * Splits its text (lines / words / chars) and reveals it when scrolled into view.
 * Renders plain text on the server; only splits on the client.
 */
export default function SplitReveal({
  as: Tag = "div",
  type = "lines",
  effect = "rise",
  stagger = DEFAULT_STAGGER[type],
  duration = 1,
  delay = 0,
  start = "top 85%",
  scrub = false,
  className,
  children,
  ...rest
}) {
  const ref = useTextAnimation((el) => {
    const fx = EFFECTS[effect];
    if (fx.perspective) gsap.set(el, { perspective: 600 });

    SplitText.create(el, {
      type: SPLIT_TYPE[type],
      mask: fx.mask ? type : undefined,
      // Re-split lines after fonts load / on resize so wrapping stays correct
      autoSplit: type === "lines",
      // Returning the tween lets SplitText kill and rebuild it on re-split
      onSplit: (self) =>
        gsap.from(self[type], {
          ...fx.from,
          duration,
          delay,
          stagger,
          ease: scrub ? "none" : fx.ease,
          scrollTrigger: {
            trigger: el,
            start,
            ...(scrub ? { end: "bottom 55%", scrub: 1 } : { once: true }),
          },
        }),
    });
  });

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
