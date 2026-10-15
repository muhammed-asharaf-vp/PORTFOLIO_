"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SKILLS = [
  "React.js",
  "Next.js",
  "Node.js",
  "Redux",
  "MongoDB",
  "GSAP",
  "Three.js",
  "Tailwind CSS",
  "TypeScript",
];

const splitChars = (word) =>
  Array.from(word).map((char, i) => (
    <span key={i} className="hero-char inline-block">
      {char}
    </span>
  ));

export default function Hero({ ready }) {
  const container = useRef(null);

  useGSAP(
    () => {
      // Wait until the preloader is gone, otherwise the intro plays hidden under it
      if (!ready) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return;

      const isMobile = window.innerWidth < 768;

      gsap
        .timeline({ delay: 0.1 })
        .from(".hero-char", {
          y: isMobile ? 25 : 60,
          opacity: 0,
          stagger: isMobile ? 0.01 : 0.02,
          duration: isMobile ? 0.45 : 0.65,
          ease: "power2.out",
        })
        .from(
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
    { scope: container, dependencies: [ready] },
  );

  return (
    <section
      ref={container}
      className="min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-12 pt-24 pb-16"
    >
      <div className="w-full max-w-6xl text-center md:text-left">
        <p className="text-[var(--accent)] font-mono mb-4 md:mb-5 tracking-widest uppercase text-xs md:text-sm">
         Full Stack Developer
        </p>

        <h1
          aria-label="Mohamed Asharaf"
          className="text-[15vw] leading-[0.95] tracking-tight md:text-[12vw] md:leading-[0.82] md:tracking-tighter font-black uppercase text-[var(--foreground)]"
        >
          <span
            aria-hidden="true"
            className="block overflow-hidden md:overflow-visible"
          >
            {splitChars("MOHAMED")}
          </span>
          <span
            aria-hidden="true"
            className="block overflow-hidden md:overflow-visible md:ml-[5vw]"
          >
            {splitChars("ASHARAF")}
            <span className="hero-char inline-block text-[var(--accent)]">
              .
            </span>
          </span>
        </h1>

        <ul className="mt-10 md:mt-12 flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
          {SKILLS.map((tech) => (
            <li
              key={tech}
              className="hero-pill px-4 py-2 md:px-6 md:py-3 border border-[var(--border-color)] rounded-full text-[11px] md:text-sm font-bold uppercase opacity-90 md:opacity-100 md:hover:text-black md:hover:bg-[var(--accent)] md:hover:border-[var(--accent)] transition-colors cursor-default"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
