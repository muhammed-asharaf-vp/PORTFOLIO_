"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef(null);

  useGSAP(
    () => {
      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) return;

      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".hero-char", {
        y: isMobile ? 25 : 60,
        opacity: 0,
        stagger: isMobile ? 0.01 : 0.02,
        duration: isMobile ? 0.45 : 0.65,
        ease: "power2.out",
      }).from(
        ".hero-pill",
        {
          opacity: 0,
          y: isMobile ? 6 : 10,
          stagger: isMobile ? 0.03 : 0.05,
          duration: isMobile ? 0.25 : 0.35,
          ease: "power2.out",
        },
        "-=0.2",
      );
    },
    { scope: container },
  );

  const skills = [
    "React.js",
    "Redux",
    "GSAP",
    "Three.js",
    "Tailwind CSS",
    "Bootstrap",
    "TypeScript",
    "Next.js",
  ];

  return (
    <section
      ref={container}
      className="min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-12 pt-24 pb-16"
    >
      <div className="w-full max-w-6xl">
        {/* ---------------- DESKTOP UI ---------------- */}
        <div className="hidden md:block">
          <p className="text-[var(--accent)] font-mono mb-5 tracking-widest uppercase text-sm">
            Front End Developer
          </p>

          <div className="overflow-hidden">
            <h1 className="text-[12vw] leading-[0.82] font-black uppercase tracking-tighter text-[var(--foreground)]">
              {Array.from("MOHAMED").map((char, i) => (
                <span key={i} className="hero-char inline-block">
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1 className="text-[12vw] leading-[0.82] font-black uppercase tracking-tighter text-[var(--foreground)] ml-[5vw]">
              {Array.from("ASHARAF").map((char, i) => (
                <span key={i} className="hero-char inline-block">
                  {char}
                </span>
              ))}
              <span className="hero-char inline-block text-[var(--accent)]">
                .
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 mt-12">
            {skills.map((tech) => (
              <span
                key={tech}
                className="hero-pill px-6 py-3 border border-[var(--border-color)] rounded-full text-sm font-bold uppercase hover:text-black hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ---------------- MOBILE UI ---------------- */}
        <div className="block md:hidden text-center">
          <p className="text-[var(--accent)] font-mono mb-4 tracking-widest uppercase text-xs">
            Front End Developer
          </p>

          <div className="overflow-hidden">
            <h1 className="text-[15vw] leading-[0.95] font-black uppercase tracking-tight text-[var(--foreground)]">
              {Array.from("MOHAMED").map((char, i) => (
                <span key={i} className="hero-char inline-block">
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1 className="text-[15vw] leading-[0.95] font-black uppercase tracking-tight text-[var(--foreground)]">
              {Array.from("ASHARAF").map((char, i) => (
                <span key={i} className="hero-char inline-block">
                  {char}
                </span>
              ))}
              <span className="hero-char inline-block text-[var(--accent)]">
                .
              </span>
            </h1>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {skills.map((tech) => (
              <span
                key={tech}
                className="hero-pill px-4 py-2 border border-[var(--border-color)] rounded-full text-[11px] font-bold uppercase opacity-90"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
