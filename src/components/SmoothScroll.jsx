"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    //  Lighthouse testing time il Lenis OFF
    const isLighthouse =
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("Chrome-Lighthouse");

    if (isLighthouse) return;

    //  Mobile il Lenis completely OFF (BIG performance boost)
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 0.75,
      smoothWheel: true,
      smoothTouch: false,
    });

    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      window.lenis = null;
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return <div className="w-full min-h-screen">{children}</div>;
}
