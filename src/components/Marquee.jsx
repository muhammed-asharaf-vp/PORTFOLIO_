"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { text: "Building Scalable UI", type: "solid" },
  { text: "Component Architecture", type: "outline" },
  { text: "Smooth Performance", type: "solid" },
  { text: "Pixel Perfection", type: "outline" },
];

// Rendered 4x; the loop moves by exactly half of that (2 sets)
const LOOP_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export default function Marquee() {
  const container = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const content = textRef.current;
      if (!content) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      //  Slower Base Animation — xPercent keeps the loop seamless after resizes
      const tween = gsap.fromTo(
        content,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 35, //  slower (increase = more slow)
          ease: "none",
          repeat: -1,
        },
      );

      const skewTo = gsap.quickTo(content, "skewX", {
        duration: 0.5,
        ease: "power2.out",
      });

      // Ease speed + skew back to rest once scrolling stops
      const settle = gsap.delayedCall(0.15, () => {
        gsap.to(tween, { timeScale: 1, duration: 0.6, overwrite: true });
        skewTo(0);
      });

      //  Scroll velocity effect — only while the marquee is on screen
      ScrollTrigger.create({
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tween.resume() : tween.pause()),
        onUpdate: (self) => {
          //  Reduced boost (lower = smoother)
          const velocityFactor = Math.min(
            Math.abs(self.getVelocity()) * 0.003,
            2,
          );

          // Speed boost
          gsap.to(tween, {
            timeScale: 1 + velocityFactor,
            duration: 0.5,
            overwrite: true,
          });

          // Skew effect (direction: 1 down, -1 up)
          skewTo(self.direction * velocityFactor * -2);

          settle.restart(true);
        },
      });

      return () => settle.kill();
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="py-12 bg-[var(--foreground)] overflow-hidden border-y border-[var(--border-color)] relative z-10"
    >
      {/* Sliding Text */}
      <div
        ref={textRef}
        className="flex w-fit items-center whitespace-nowrap will-change-transform"
      >
        {/* Render items multiple times for seamless loop.
            Spacing is padding-right (not flex gap) so -50% lands exactly on a repeat */}
        {LOOP_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-16 pr-16">
            {/* Text */}
            {item.type === "outline" ? (
              <span
                className="text-6xl md:text-8xl font-black uppercase text-transparent tracking-tighter transition-colors duration-300 hover:text-[var(--accent)]"
                style={{ WebkitTextStroke: "1px var(--background)" }}
              >
                {item.text}
              </span>
            ) : (
              <span className="text-6xl md:text-8xl font-black uppercase text-[var(--background)] tracking-tighter">
                {item.text}
              </span>
            )}

            {/* Divider */}
            <span className="text-3xl text-[var(--accent)] animate-spin-slow">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
