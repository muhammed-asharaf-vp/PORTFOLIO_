"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/text/SplitReveal";
import ScrambleIn from "@/components/text/ScrambleIn";
import ScrollHighlight from "@/components/text/ScrollHighlight";

const SPECS = [
  {
    label: "Core Framework",
    value: "JavaScript (ES6+), TypeScript, React.js, Next.js, Node.js",
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
    value: "Redux, Context API, React Hooks, React Query",
  },
  {
    label: "Backend",
    value:
      "Node.js, Express.js, Next.js API Routes, Server Actions, MVC Architecture",
  },
  {
    label: "Database & ORM",
    value: "MongoDB, Mongoose, PostgreSQL, SQL",
  },
  {
    label: "API & Integration",
    value:
      "REST APIs, Axios, JWT Authentication, OAuth, WhatsApp API, Webhooks",
  },
  {
    label: "Security",
    value:
      "Auth & Role-based Access, bcrypt, Input Validation, CORS, Env Secrets",
  },
  {
    label: "Tooling & Workflow",
    value:
      "Git, GitHub, Vite, npm, CI/CD, Vercel, Netlify, VS Code, Postman, Docker",
  },
  {
    label: "Performance",
    value:
      "Code Splitting, Lazy Loading, Image Optimization, Perf Tuning, Caching, DB Indexing",
  },
];

export default function About() {
  const container = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop and mobile layouts both exist in the DOM; only animate the
      // visible one so hidden copies don't create dead ScrollTriggers.
      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const scope = ctx.conditions.desktop
            ? ".about-desktop"
            : ".about-mobile";

          // Specs animation
          gsap.utils.toArray(`${scope} .spec-row`).forEach((row, i) => {
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
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="pt-24 md:pt-32 pb-8 md:pb-10 px-5 sm:px-8 md:px-12 max-w-[1800px] mx-auto overflow-clip"
      id="about"
    >
      {/* ---------------- DESKTOP UI ---------------- */}
      <div className="about-desktop hidden md:grid grid-cols-12 gap-x-12 gap-y-16">
        {/* Sticky Profile */}
        <div className="md:col-span-3">
          <h2 className="text-xs font-mono text-[var(--accent)] uppercase tracking-[0.2em] sticky top-32 flex items-center gap-3">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
            <ScrambleIn>( 01 ) Profile</ScrambleIn>
          </h2>
        </div>

        {/* Content */}
        <div className="md:col-span-9 flex flex-col gap-24">
          {/* BIO */}
          <div>
            <ScrollHighlight
              as="h3"
              className="text-5xl lg:text-7xl font-light leading-[1.1] text-[var(--foreground)] tracking-tighter mb-10"
            >
              I turn ideas into{" "}
              <span className="text-[var(--accent)] font-normal">
                full-stack products
              </span>{" "}
              people love to use.
            </ScrollHighlight>

            <div className="grid grid-cols-2 gap-8 text-lg lg:text-xl font-light opacity-70 leading-relaxed">
              <SplitReveal as="p" type="lines" stagger={0.1}>
                From the first API route to the final pixel, I own the whole
                journey. I craft lightning-fast interfaces with{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  React.js
                </strong>{" "}
                and{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  Next.js
                </strong>
                , backed by secure, scalable{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  Node.js
                </strong>{" "}
                services that just work.
              </SplitReveal>

              <SplitReveal as="p" type="lines" stagger={0.1}>
                Data modelled cleanly in{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  MongoDB
                </strong>{" "}
                and{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  PostgreSQL
                </strong>
                . Motion that feels alive with{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  GSAP
                </strong>{" "}
                and{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  Three.js
                </strong>
                . The result: products that are fast, reliable, and impossible
                to ignore.
              </SplitReveal>
            </div>
          </div>

          {/* SPECS */}
          <div className="w-full">
            <ScrambleIn
              as="h4"
              className="block font-mono text-xs uppercase tracking-widest opacity-40 mb-8"
            >
              {"// Technical Specifications"}
            </ScrambleIn>

            <div className="flex flex-col">
              {SPECS.map((spec, i) => (
                <div
                  key={i}
                  className="spec-row group relative overflow-hidden"
                >
                  <div className="divider-line w-full h-[1px] bg-[var(--border-color)] group-hover:bg-[var(--accent)] transition-colors duration-500 origin-left"></div>

                  {/* Fixed label column so every value starts on the same line */}
                  <div className="py-7 grid grid-cols-[11rem_1fr] lg:grid-cols-[13rem_1fr] items-baseline gap-8 group-hover:translate-x-4 transition-transform duration-300">
                    <ScrambleIn className="text-xs lg:text-sm font-mono text-[var(--accent)] uppercase tracking-widest">
                      {spec.label}
                    </ScrambleIn>

                    <span className="text-xl lg:text-2xl font-light leading-snug text-[var(--foreground)] tracking-tight text-pretty">
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
      <div className="about-mobile block md:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-mono text-[var(--accent)] uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
            <ScrambleIn>Profile</ScrambleIn>
          </h2>

          <span className="text-xs font-mono opacity-40 tracking-widest">
            ( 01 )
          </span>
        </div>

        {/* Mobile Bio */}
        <ScrollHighlight
          as="h3"
          className="text-4xl font-light leading-[1.15] text-[var(--foreground)] tracking-tight mb-6"
        >
          I turn ideas into{" "}
          <span className="text-[var(--accent)] font-normal">
            full-stack products
          </span>{" "}
          people love to use.
        </ScrollHighlight>

        <div className="flex flex-col gap-5 text-base font-light opacity-75 leading-relaxed">
          <SplitReveal as="p" type="lines" stagger={0.1}>
            From the first API route to the final pixel, I own the whole
            journey. I craft lightning-fast interfaces with{" "}
            <strong className="text-[var(--foreground)] font-normal">
              React.js
            </strong>{" "}
            and{" "}
            <strong className="text-[var(--foreground)] font-normal">
              Next.js
            </strong>
            , backed by secure, scalable{" "}
            <strong className="text-[var(--foreground)] font-normal">
              Node.js
            </strong>{" "}
            services that just work.
          </SplitReveal>

          <SplitReveal as="p" type="lines" stagger={0.1}>
            Data modelled cleanly in{" "}
            <strong className="text-[var(--foreground)] font-normal">
              MongoDB
            </strong>{" "}
            and{" "}
            <strong className="text-[var(--foreground)] font-normal">
              PostgreSQL
            </strong>
            . Motion that feels alive with{" "}
            <strong className="text-[var(--foreground)] font-normal">
              GSAP
            </strong>{" "}
            and{" "}
            <strong className="text-[var(--foreground)] font-normal">
              Three.js
            </strong>
            .
          </SplitReveal>
        </div>

        {/* Mobile Specs */}
        <div className="mt-12">
          <ScrambleIn
            as="h4"
            className="block font-mono text-xs uppercase tracking-widest opacity-40 mb-6"
          >
            {"// Technical Specs"}
          </ScrambleIn>

          <div className="flex flex-col gap-4">
            {SPECS.map((spec, i) => (
              <div
                key={i}
                className="spec-row rounded-2xl border border-[var(--border-color)] p-5"
              >
                <div className="divider-line w-full h-[1px] bg-[var(--border-color)] mb-4"></div>

                <ScrambleIn
                  as="p"
                  className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-2"
                >
                  {spec.label}
                </ScrambleIn>

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
