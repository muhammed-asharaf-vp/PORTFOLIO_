"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const container = useRef(null);
  const textRef = useRef(null);

  const items = [
    { text: "Building Scalable UI", type: "solid" },
    { text: "Component Architecture", type: "outline" },
    { text: "Smooth Performance", type: "solid" },
    { text: "Pixel Perfection", type: "outline" },
  ];

  useGSAP(
    () => {
      const content = textRef.current;
      if (!content) return;

      // Since we render items multiple times, we take a portion as loop width
      const totalWidth = content.scrollWidth / 2;

      // Initial state
      gsap.set(content, { x: 0, skewX: 0 });

      //  Slower Base Animation
      const tween = gsap.to(content, {
        x: -totalWidth,
        duration: 35, //  slower (increase = more slow)
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      //  Scroll velocity effect (reduced)
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const scrollVelocity = self.getVelocity();
          const direction = self.direction; // 1 down, -1 up

          //  Reduced boost (lower = smoother)
          const velocityFactor = Math.min(Math.abs(scrollVelocity) * 0.003, 2);

          // Speed boost
          gsap.to(tween, {
            timeScale: 1 + velocityFactor,
            duration: 0.5,
            overwrite: true,
          });

          // Skew effect
          gsap.to(content, {
            skewX: direction * velocityFactor * -2,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="py-12 bg-[var(--foreground)] overflow-hidden border-y border-[var(--border-color)] relative z-10"
    >
      {/* Sliding Text */}
      <div
        ref={textRef}
        className="flex w-fit items-center gap-16 whitespace-nowrap will-change-transform"
      >
        {/* Render items multiple times for seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-16">
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
