"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  SCRAMBLE_CHARS,
  useGSAP,
} from "@/lib/gsap";

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

      if (prefersReducedMotion()) return;

      const label = container.current.querySelector(".hero-label");

      gsap
        .timeline({ delay: 0.1 })
        // Letters rise out of each line's mask with a slight tilt
        .from(".hero-char", {
          yPercent: 115,
          rotate: 10,
          transformOrigin: "0% 100%",
          duration: 1.1,
          stagger: 0.035,
          ease: "expo.out",
        })
        // Role label decodes like the preloader
        .to(
          label,
          {
            duration: 1.1,
            ease: "none",
            scrambleText: {
              text: label.textContent,
              chars: SCRAMBLE_CHARS,
              revealDelay: 0.3,
              speed: 0.5,
            },
          },
          0.15,
        )
        // Stack chips blur in one after another
        .from(
          ".hero-pill",
          {
            y: 14,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.6,
            stagger: 0.045,
            ease: "power3.out",
          },
          "-=0.75",
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
        <p className="hero-label text-[var(--accent)] font-mono mb-4 md:mb-5 tracking-widest uppercase text-xs md:text-sm">
          Full Stack Developer
        </p>

        <h1
          aria-label="Mohamed Asharaf"
          className="font-display text-[9.5vw] leading-[1] tracking-tight md:text-[min(8vw,7rem)] md:leading-[0.92] md:tracking-tighter font-black uppercase text-[var(--foreground)]"
        >
          <span aria-hidden="true" className="block overflow-hidden">
            {splitChars("MOHAMED")}
          </span>
          <span
            aria-hidden="true"
            className="block overflow-hidden md:ml-[5vw]"
          >
            {splitChars("ASHARAF")}
            <span className="hero-char inline-block text-[var(--accent)]">
              .
            </span>
          </span>
        </h1>

        {/* Equal-width grid on small screens (3×3, then 5+4) so no chip sits alone;
            one left-aligned row on desktop */}
        <ul className="mt-10 md:mt-12 grid grid-cols-3 gap-2 md:w-fit md:grid-cols-5 md:gap-2.5 lg:flex lg:flex-wrap lg:gap-3">
          {SKILLS.map((tech) => (
            <li
              key={tech}
              className="hero-pill text-center whitespace-nowrap px-2 py-2.5 md:px-4 xl:px-5 border border-[var(--border-color)] rounded-full font-mono text-[11px] xl:text-xs uppercase tracking-wider md:hover:text-[var(--background)] md:hover:bg-[var(--accent)] md:hover:border-[var(--accent)] transition-colors cursor-default"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
