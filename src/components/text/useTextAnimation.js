"use client";

import { useRef } from "react";
import { prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Shared setup for the text components. Runs `setup(el)` inside a GSAP context
 * (so tweens, ScrollTriggers and SplitText instances are reverted on unmount)
 * and skips it when:
 *  - the user prefers reduced motion (text simply stays static), or
 *  - the element isn't rendered (the hidden desktop/mobile copy of a section).
 * `setup` may return a cleanup function. Returns the ref to attach.
 */
export default function useTextAnimation(setup) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !el.getClientRects().length) return;
      return setup(el);
    },
    { scope: ref },
  );

  return ref;
}
