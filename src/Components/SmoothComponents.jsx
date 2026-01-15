"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious friction
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Expose lenis to window for Navbar to use
    window.lenis = lenis;

    // Connect GSAP
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up
      window.lenis = null;
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <div className="w-full min-h-screen">{children}</div>;
}