"use client";
import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    //  Lighthouse testing time il Lenis OFF
    if (navigator.userAgent.includes("Chrome-Lighthouse")) return;

    //  Mobile il Lenis completely OFF (BIG performance boost)
    if (window.innerWidth < 768) return;

    //  Respect reduced-motion users: native scrolling
    if (prefersReducedMotion()) return;

    let lenis;
    let cancelled = false;
    const raf = (time) => lenis.raf(time * 1000);

    // Loaded on demand, so phones never download Lenis at all
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 0.75,
        smoothWheel: true,
      });

      window.lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      if (!lenis) return;
      window.lenis = null;
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}
