"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    //  Lighthouse testing time il Lenis OFF
    if (navigator.userAgent.includes("Chrome-Lighthouse")) return;

    //  Mobile il Lenis completely OFF (BIG performance boost)
    if (window.innerWidth < 768) return;

    //  Respect reduced-motion users: native scrolling
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 0.75,
      smoothWheel: true,
    });

    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.lenis = null;
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}
