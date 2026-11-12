"use client";

import { useRef } from "react";
import { prefersReducedMotion, useGSAP, whenIdle } from "@/lib/gsap";

/**
 * Shared setup for the text components. Runs `setup(el)` inside a GSAP context
 * (so tweens, ScrollTriggers and SplitText instances are reverted on unmount),
 * deferred to an idle slot after hydration (see `whenIdle`), and skips it when:
 *  - the user prefers reduced motion (text simply stays static), or
 *  - the element isn't rendered (the hidden desktop/mobile copy of a section).
 * `setup` may return a cleanup function. Returns the ref to attach.
 */
export default function useTextAnimation(setup) {
  const ref = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      let cleanup;
      const cancel = whenIdle(
        contextSafe(() => {
          const el = ref.current;
          if (!el || prefersReducedMotion() || !el.getClientRects().length)
            return;
          cleanup = setup(el);
        }),
      );
      return () => {
        cancel();
        cleanup?.();
      };
    },
    { scope: ref },
  );

  return ref;
}
