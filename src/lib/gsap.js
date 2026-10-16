// Single GSAP entry point: every component imports from here so plugins are
// registered exactly once. (All GSAP plugins are free since 3.13.)
// TextPlugin is registered by TypeIn instead, so it ships only with the lazy game chunk.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

// Glyph pool for scramble effects (matches the preloader's style)
export const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*/";

let reducedMotionQuery;
/** Cached `prefers-reduced-motion` check (one MediaQueryList for the whole app). */
export const prefersReducedMotion = () => {
  reducedMotionQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return reducedMotionQuery.matches;
};

// Web fonts (Fontshare) swap in after first layout and shift positions:
// recalculate every trigger once they're ready.
if (typeof window !== "undefined") {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
