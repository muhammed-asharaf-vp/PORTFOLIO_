"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const ctx = gsap.context(() => {
        // BIO animation
        gsap.from(".about-bio", {
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        });

        // Specs animation
        const rows = gsap.utils.toArray(".spec-row");

        rows.forEach((row, i) => {
          gsap.from(row, {
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            y: 25,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
          });

          const line = row.querySelector(".divider-line");
          if (line) {
            gsap.from(line, {
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
              },
              scaleX: 0,
              transformOrigin: "left",
              duration: 1,
              ease: "expo.out",
            });
          }
        });
      }, container);

      // ✅ HARD REFRESH AFTER FULL LOAD (real fix)
      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.addEventListener("load", ScrollTrigger.refresh);

      return () => {
        window.removeEventListener("load", ScrollTrigger.refresh);
        ctx.revert();
      };
    },
    { scope: container },
  );

  const specs = [
    {
      label: "Core Framework",
      value: "JavaScript (ES6+), TypeScript, React.js, Next.js",
    },
    {
      label: "UI & Styling",
      value: "Tailwind CSS, Responsive Design, CSS Animations, Figma",
    },
    {
      label: "Animation & 3D",
      value: "GSAP, Three.js, Scroll-based Animations",
    },
    {
      label: "State & Data",
      value: "Redux, Context API, React Hooks, REST APIs",
    },
    {
      label: "Tooling & Workflow",
      value: "Git, GitHub, Vite, npm, CI/CD",
    },
  ];

  return (
    <section
      ref={container}
      className="py-24 md:py-32 px-5 sm:px-8 md:px-12 max-w-[1800px] mx-auto overflow-hidden"
      id="about"
    >
      {/* ---------------- DESKTOP UI ---------------- */}
      <div className="hidden md:grid grid-cols-12 gap-x-12 gap-y-16">
        {/* Sticky Profile */}
        <div className="md:col-span-3">
          <h2 className="about-bio text-xs font-mono text-[var(--accent)] uppercase tracking-[0.2em] sticky top-32 flex items-center gap-3">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
            ( 01 ) Profile
          </h2>
        </div>

        {/* Content */}
        <div className="md:col-span-9 flex flex-col gap-24">
          {/* BIO */}
          <div>
            <h3 className="about-bio text-5xl lg:text-7xl font-light leading-[1.1] text-[var(--foreground)] tracking-tighter mb-10">
              Front End Developer{" "}
              <span className="text-[var(--accent)] font-normal">
                scalable interfaces
              </span>{" "}
              with precision.
            </h3>

            <div className="about-bio grid grid-cols-2 gap-8 text-lg lg:text-xl font-light opacity-70 leading-relaxed">
              <p>
                I specialize in building modern, scalable user interfaces using{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  React.js
                </strong>{" "}
                and{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  Next.js
                </strong>
                , focusing on performance, accessibility, and clean component
                architecture.
              </p>

              <p>
                I craft responsive, interactive experiences with{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  Tailwind CSS
                </strong>
                , smooth animations powered by{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  GSAP
                </strong>{" "}
                and immersive visuals using{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  Three.js
                </strong>
                , ensuring polished interfaces from interaction to pixel.
              </p>
            </div>
          </div>

          {/* SPECS */}
          <div className="w-full">
            <h4 className="about-bio font-mono text-xs uppercase tracking-widest opacity-40 mb-8">
              // Technical Specifications
            </h4>

            <div className="flex flex-col">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="spec-row group relative overflow-hidden"
                >
                  <div className="divider-line w-full h-[1px] bg-[var(--border-color)] group-hover:bg-[var(--accent)] transition-colors duration-500 origin-left"></div>

                  <div className="py-8 flex flex-row items-baseline justify-between gap-8 group-hover:pl-4 transition-all duration-300">
                    <span className="text-sm font-mono text-[var(--accent)] uppercase tracking-widest w-52 shrink-0">
                      {spec.label}
                    </span>

                    <span className="text-2xl lg:text-3xl font-light text-[var(--foreground)] tracking-tight">
                      {spec.value}
                    </span>
                  </div>
                </div>
              ))}
              <div className="w-full h-[1px] bg-[var(--border-color)]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- MOBILE UI ---------------- */}
      <div className="block md:hidden">
        {/* Mobile Header */}
        <div className="about-bio flex items-center justify-between mb-8">
          <h2 className="text-xs font-mono text-[var(--accent)] uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
            Profile
          </h2>

          <span className="text-xs font-mono opacity-40 tracking-widest">
            ( 01 )
          </span>
        </div>

        {/* Mobile Bio */}
        <h3 className="about-bio text-4xl font-light leading-[1.15] text-[var(--foreground)] tracking-tight mb-6">
          Front End Developer{" "}
          <span className="text-[var(--accent)] font-normal">
            scalable interfaces
          </span>{" "}
          with precision.
        </h3>

        <div className="about-bio flex flex-col gap-5 text-base font-light opacity-75 leading-relaxed">
          <p>
            I specialize in building modern, scalable user interfaces using{" "}
            <strong className="text-[var(--foreground)] font-normal">
              React.js
            </strong>{" "}
            and{" "}
            <strong className="text-[var(--foreground)] font-normal">
              Next.js
            </strong>
            , focusing on performance, accessibility, and clean component
            architecture.
          </p>

          <p>
            I craft responsive, interactive experiences with{" "}
            <strong className="text-[var(--foreground)] font-normal">
              Tailwind CSS
            </strong>
            , smooth animations powered by{" "}
            <strong className="text-[var(--foreground)] font-normal">
              GSAP
            </strong>{" "}
            and immersive visuals using{" "}
            <strong className="text-[var(--foreground)] font-normal">
              Three.js
            </strong>
            .
          </p>
        </div>

        {/* Mobile Specs */}
        <div className="mt-12">
          <h4 className="about-bio font-mono text-xs uppercase tracking-widest opacity-40 mb-6">
            // Technical Specs
          </h4>

          <div className="flex flex-col gap-4">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="spec-row rounded-2xl border border-[var(--border-color)] p-5"
              >
                <div className="divider-line w-full h-[1px] bg-[var(--border-color)] mb-4"></div>

                <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-2">
                  {spec.label}
                </p>

                <p className="text-lg font-light text-[var(--foreground)] leading-snug">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
