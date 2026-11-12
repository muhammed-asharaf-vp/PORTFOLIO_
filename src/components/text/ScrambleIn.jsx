"use client";

import { gsap, SCRAMBLE_CHARS } from "@/lib/gsap";
import useTextAnimation from "./useTextAnimation";

/**
 * Decodes its (plain-text) children through random glyphs when scrolled into view.
 * Best on mono labels: the width stays constant while it scrambles.
 */
export default function ScrambleIn({
  as: Tag = "span",
  duration = 1.2,
  start = "top 90%",
  className,
  children,
  ...rest
}) {
  const ref = useTextAnimation((el) => {
    gsap.to(el, {
      duration,
      ease: "none",
      scrambleText: {
        text: el.textContent,
        chars: SCRAMBLE_CHARS,
        revealDelay: 0.3,
        speed: 0.5,
      },
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
