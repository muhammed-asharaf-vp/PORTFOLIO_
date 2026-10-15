"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "Eram Education",
    category: "Multi-Institution Education Management Platform",
    pitch:
      "Unified CMS and portal for a multi-school group, streamlining events, gallery, downloads, and student-parent communication across institutions with a scalable architecture.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    theme: "dark",
    link: "https://eram.edu.in/",
  },
  {
    id: "02",
    title: "Best Mountain",
    category: "Building Materials Business & Catalog Platform",
    pitch:
      "Business website for a building materials supplier, showcasing products and services with inquiry-driven lead generation and a scalable, self-hosted architecture.",
    stack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    theme: "light",
    link: "https://www.bm-materials.com/",
  },
  {
    id: "03",
    title: "Pulse Pariraksha",
    category: "Healthcare Diagnostics & Appointment Booking Platform",
    pitch:
      "Preventive healthcare platform for booking health check-up packages, featuring package discovery, slot reservation, and WhatsApp-integrated confirmation workflows.",
    stack: ["React", "Tailwind CSS", "Node.js", "PostgreSQL"],
    theme: "dark",
    link: "https://pariraksha.pulsepkd.com/",
  },
  {
    id: "04",
    title: "Veloce",
    category: "Premium Watch Showcase Website",
    pitch:
      "Interactive premium watch showcase website with a fully responsive layout, modular UI components, and smooth modern UI interactions.",
    stack: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    theme: "light",
    link: "https://vel0ce.vercel.app",
  },
  {
    id: "05",
    title: "Chatloop",
    category: "Secure Social Networking Platform",
    pitch:
      "Secure social networking platform supporting real-time messaging and content sharing with authentication, profile management, and safety-focused workflows.",
    stack: ["Flutter", "Dart", "Python", "SQL", "Bootstrap"],
    theme: "dark",
  },
];

export default function Projects() {
  const container = useRef(null);
  const scrollContainer = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const el = scrollContainer.current;
        const wrap = container.current;
        if (!el || !wrap) return;

        //  only needed scroll distance — re-measured on every refresh/resize
        const getDistance = () =>
          Math.max(0, el.scrollWidth - window.innerWidth);

        gsap.to(el, {
          x: () => -getDistance(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="projects"
      className="relative bg-[var(--background)] border-t border-[var(--border-color)]"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* ---------------- DESKTOP UI (Horizontal Scroll) ---------------- */}
      <div className="hidden lg:block lg:h-screen lg:overflow-hidden">
        <div
          ref={scrollContainer}
          className="relative z-10 flex flex-row gap-24 px-24 items-center h-full will-change-transform"
        >
          {/* Intro Card */}
          <div className="w-[35vw] shrink-0 flex flex-col justify-center z-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-[var(--accent)]"></span>
              <h2 className="font-mono text-5xl uppercase tracking-widest text-[var(--accent)]">
                Projects
              </h2>
            </div>

            <p className="text-9xl font-black text-[var(--foreground)] leading-[0.8] tracking-tighter uppercase">
              <br />
              <span className="text-transparent text-stroke-foreground">
                Work
              </span>
            </p>

            <p className="mt-8 text-xl opacity-60 max-w-md font-light leading-relaxed">
              Building responsive, high-performance frontends with React,
              Next.js, and modern UI systems.
            </p>
          </div>

          {/* Projects */}
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="w-[55vw] h-[70vh] relative group shrink-0"
            >
              <ProjectCard project={project} />
            </div>
          ))}

          {/* CTA */}
          <div className="w-[40vw] flex flex-col items-center justify-center shrink-0 z-10 gap-8">
            <div className="w-full h-[1px] bg-[var(--foreground)] opacity-20"></div>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--foreground)]">
              Have a concept?
            </p>

            <a
              href="mailto:mohamedasharafvpp@gmail.com"
              className=" cursor-dot-zone group relative inline-block text-7xl md:text-9xl font-black uppercase tracking-tight text-[var(--foreground)] transition-all duration-300 ease-out hover:text-[var(--accent)] hover:-translate-y-1 "
            >
              Hire Me
              <span className="absolute left-0 -bottom-3 h-[4px] w-0 bg-[var(--accent)] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- MOBILE UI (Vertical Scroll) ---------------- */}
      <div className="block lg:hidden relative z-10 px-5 sm:px-8 py-20">
        {/* Mobile Header */}
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-3">
            ( Projects )
          </p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)]">
            Code in Action{" "}
          </h2>
          <p className="mt-4 text-sm sm:text-base opacity-70 max-w-xl leading-relaxed">
            Building responsive, high-performance frontends with React, Next.js,
            and modern UI systems.
          </p>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="w-full">
              <ProjectCard project={project} isMobile />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-14 rounded-3xl border border-[var(--border-color)] p-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-70 mb-4">
            Have a concept?
          </p>
          <a
            href="mailto:mohamedasharafvpp@gmail.com"
            className="text-4xl font-black uppercase text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            Hire Me
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPONENT ---------------- */
function ProjectCard({ project, isMobile = false }) {
  return (
    <div
      className={`
        relative border flex flex-col justify-between overflow-hidden shadow-2xl transition-colors duration-500
        ${isMobile ? "p-6 min-h-[420px] rounded-3xl" : "p-8 md:p-12 h-full"}
        ${
          project.theme === "dark"
            ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
            : "bg-[var(--card-bg)] border-[var(--border-color)] hover:border-[var(--accent)]"
        }
      `}
    >
      {/* Background Index */}
      <span
        className={`
          absolute -bottom-8 -right-6 font-black leading-none select-none pointer-events-none transition-opacity
          ${isMobile ? "text-[22vh]" : "text-[40vh]"}
          ${
            project.theme === "dark"
              ? "text-[var(--background)] opacity-[0.05]"
              : "text-[var(--foreground)] opacity-[0.03] group-hover:opacity-[0.05]"
          }
        `}
      >
        {project.id}
      </span>

      {/* Header */}
      <div className="flex justify-between items-start z-10 gap-6">
        <div>
          <span className="font-mono text-xs tracking-widest uppercase mb-3 block text-[var(--accent)]">
            {project.category}
          </span>

          <h3
            className={`
              font-black uppercase leading-[0.9]
              ${isMobile ? "text-4xl" : "text-5xl md:text-7xl"}
              ${project.theme === "dark" ? "" : "text-[var(--foreground)]"}
            `}
          >
            {project.title}
          </h3>
        </div>

        {/* Link (only for projects that are live) */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title}`}
            className={`
              cursor-dot-zone inline-flex items-center justify-center
              p-4 rounded-full border transition-all shrink-0
              ${
                project.theme === "dark"
                  ? "border-[var(--background)] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black"
                  : "border-[var(--foreground)] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black"
              }
            `}
          >
            <FiArrowUpRight aria-hidden="true" className="text-2xl" />
          </a>
        )}
      </div>

      {/* Details */}
      <div className="z-10 mt-8">
        <p
          className={`
            opacity-80 border-l-2 border-[var(--accent)] pl-5 font-light leading-relaxed
            ${isMobile ? "text-sm mb-6" : "text-lg md:text-xl mb-10 max-w-lg"}
          `}
        >
          {project.pitch}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className={`
                px-3 py-2 text-[10px] sm:text-xs font-bold uppercase border transition-colors cursor-default
                ${
                  project.theme === "dark"
                    ? "border-[var(--background)]/30 hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                    : "border-[var(--foreground)]/20 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
