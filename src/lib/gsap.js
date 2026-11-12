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

// Scroll-animation setups queued by `whenIdle`. Each one splits text (DOM writes)
// and creates ScrollTriggers, which measure layout the moment they're created.
// Run during hydration, ~40 of them interleaved into one long task full of forced
// reflows; run one per idle slot instead, after the first paint, they stay short.
const idleQueue = [];
let idleScheduled = false;

const requestIdle = (cb) =>
  window.requestIdleCallback
    ? window.requestIdleCallback(cb, { timeout: 400 })
    : window.setTimeout(cb, 16); // Safari has no requestIdleCallback

const flushIdleQueue = () => {
  idleQueue.shift()?.();
  if (idleQueue.length) requestIdle(flushIdleQueue);
  else idleScheduled = false;
};

/**
 * Runs `setup` once the browser is idle (in queue order, one per idle slot).
 * Returns a cancel function for effect cleanup. Pass a `contextSafe`-wrapped
 * function from useGSAP so everything it creates is still reverted on unmount.
 */
export const whenIdle = (setup) => {
  idleQueue.push(setup);
  if (!idleScheduled) {
    idleScheduled = true;
    requestIdle(flushIdleQueue);
  }
  return () => {
    const i = idleQueue.indexOf(setup);
    if (i !== -1) idleQueue.splice(i, 1);
  };
};

// Web fonts (Fontshare) swap in after first layout and shift positions:
// recalculate every trigger once they're ready.
if (typeof window !== "undefined") {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
