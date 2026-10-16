"use client";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap, SCRAMBLE_CHARS, SplitText, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/text/SplitReveal";
import ScrambleIn from "@/components/text/ScrambleIn";
import RollText from "@/components/text/RollText";

const PROJECTS = [
  {
    id: "01",
    title: "Orbit",
    category: "Agency Project Management & Real-Time Chat Platform",
    pitch:
      "Full-stack team workspace with task workflows, calendar, and time logs, plus a real-time chat with direct messages, read receipts, reply and forward, and Cloudinary file sharing, delivered live over SSE with push notifications.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Cloudinary",
      "Docker",
    ],
    theme: "light",
    link: "https://orbit.toruss.agency/",
  },
  {
    id: "02",
    title: "The Spanish Alchemist",
    category: "D2C Skincare E-commerce Store",
    pitch:
      "Conversion-focused Shopify storefront for a Spanish skincare brand, with routine bundles, shop-by-skin-type discovery, quick add-to-cart, customer reviews, and a redesigned product listing experience.",
    stack: ["Shopify", "Liquid", "JavaScript", "CSS", "Klaviyo"],
    theme: "dark",
    link: "https://thespanishalchemist.com/",
  },
  {
    id: "03",
    title: "Oceanus Grandeur",
    category: "Real Estate Lead Generation Platform",
    pitch:
      "High-converting landing site for Palakkad's largest residential township, with apartment configurators, a refundable booking offer, live project updates, and site-visit forms that capture leads straight into a Supabase backend, tracked across Google Ads and Meta.",
    stack: ["HTML", "CSS", "JavaScript", "Supabase", "PostgreSQL"],
    theme: "light",
    link: "https://oceanusgrandeurpalakkad.com/",
  },
  {
    id: "04",
    title: "Eram Education",
    category: "Multi-Institution Education Management Platform",
    pitch:
      "Unified CMS and portal for a multi-school group, streamlining events, gallery, downloads, and student-parent communication across institutions with a scalable architecture.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    theme: "dark",
    link: "https://eram.edu.in/",
  },
  {
    id: "05",
    title: "Best Mountain",
    category: "Building Materials Business & Catalog Platform",
    pitch:
      "Business website for a building materials supplier, showcasing products and services with inquiry-driven lead generation and a scalable, self-hosted architecture.",
    stack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    theme: "light",
    link: "https://www.bm-materials.com/",
  },
  {
    id: "06",
    title: "Pulse Pariraksha",
    category: "Healthcare Diagnostics & Appointment Booking Platform",
    pitch:
      "Preventive healthcare platform for booking health check-up packages, featuring package discovery, slot reservation, and WhatsApp-integrated confirmation workflows.",
    stack: ["React", "Tailwind CSS", "Node.js", "PostgreSQL"],
    theme: "dark",
    link: "https://pariraksha.pulsepkd.com/",
  },
  {
    id: "07",
    title: "Veloce",
    category: "Premium Watch Showcase Website",
    pitch:
      "Interactive premium watch showcase website with a fully responsive layout, modular UI components, and smooth modern UI interactions.",
    stack: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    theme: "light",
    link: "https://vel0ce.vercel.app",
  },
  {
    id: "08",
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

      // Card title letters rise from masks while the category decodes.
      // On desktop they're driven by the horizontal scroll (containerAnimation).
      const revealCards = (cards, triggerFor) => {
        cards.forEach((card) => {
          const title = card.querySelector(".project-title");
          const category = card.querySelector(".project-category");
          const scrollTrigger = { ...triggerFor(card), once: true };

          const split = SplitText.create(title, {
            type: "words,chars",
            mask: "chars",
          });
          gsap.from(split.chars, {
            yPercent: 110,
            rotate: 6,
            transformOrigin: "0% 100%",
            duration: 1,
            stagger: 0.02,
            ease: "expo.out",
            scrollTrigger,
          });
          gsap.to(category, {
            duration: 1,
            ease: "none",
            scrambleText: {
              text: category.textContent,
              chars: SCRAMBLE_CHARS,
              revealDelay: 0.2,
              speed: 0.5,
            },
            scrollTrigger,
          });
        });
      };

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop, motion } = ctx.conditions;
          const wrap = container.current;

          if (!desktop) {
            if (motion) {
              revealCards(
                wrap.querySelectorAll('[data-layout="mobile"] .project-card'),
                (card) => ({ trigger: card, start: "top 80%" }),
              );
            }
            return;
          }

          const el = scrollContainer.current;
          if (!el || !wrap) return;

          //  only needed scroll distance — re-measured on every refresh/resize
          const getDistance = () =>
            Math.max(0, el.scrollWidth - window.innerWidth);

          const tween = gsap.to(el, {
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

          if (motion) {
            revealCards(el.querySelectorAll(".project-card"), (card) => ({
              trigger: card,
              containerAnimation: tween,
              start: "left 85%",
            }));
          }
        },
      );
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
      <div
        data-layout="desktop"
        className="hidden lg:block lg:h-screen lg:overflow-hidden"
      >
        <div
          ref={scrollContainer}
          className="relative z-10 flex flex-row gap-24 px-24 items-center h-full will-change-transform"
        >
          {/* Intro Card */}
          <div className="w-[35vw] shrink-0 flex flex-col justify-center z-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-[var(--accent)]"></span>
              <h2 className="font-mono text-5xl uppercase tracking-widest text-[var(--accent)]">
                <ScrambleIn>Projects</ScrambleIn>
              </h2>
            </div>

            <p className="font-display text-[6.5vw] font-black text-[var(--foreground)] leading-[0.85] tracking-tighter uppercase">
              <br />
              <SplitReveal
                as="span"
                type="chars"
                effect="tilt"
                stagger={0.06}
                duration={1.2}
                className="inline-block text-transparent text-stroke-foreground"
              >
                Work
              </SplitReveal>
            </p>

            <SplitReveal
              as="p"
              type="lines"
              className="mt-8 text-xl opacity-60 max-w-md font-light leading-relaxed"
            >
              Building responsive, high-performance frontends with React,
              Next.js, and modern UI systems.
            </SplitReveal>
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
              <ScrambleIn>Have a concept?</ScrambleIn>
            </p>

            <a
              href="mailto:mohamedasharafvpp@gmail.com"
              className=" cursor-dot-zone group relative inline-block font-display text-[4.5vw] font-black uppercase tracking-tight text-[var(--foreground)] transition-all duration-300 ease-out hover:text-[var(--accent)] hover:-translate-y-1 "
            >
              <RollText>Hire Me</RollText>
              <span className="absolute left-0 -bottom-3 h-[4px] w-0 bg-[var(--accent)] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- MOBILE UI (Vertical Scroll) ---------------- */}
      <div
        data-layout="mobile"
        className="block lg:hidden relative z-10 px-5 sm:px-8 py-20"
      >
        {/* Mobile Header */}
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-3">
            <ScrambleIn>( Projects )</ScrambleIn>
          </p>
          <SplitReveal
            as="h2"
            type="chars"
            effect="tilt"
            stagger={0.03}
            className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]"
          >
            Code in Action
          </SplitReveal>
          <SplitReveal
            as="p"
            type="lines"
            className="mt-4 text-sm sm:text-base opacity-70 max-w-xl leading-relaxed"
          >
            Building responsive, high-performance frontends with React, Next.js,
            and modern UI systems.
          </SplitReveal>
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
            <ScrambleIn>Have a concept?</ScrambleIn>
          </p>
          <a
            href="mailto:mohamedasharafvpp@gmail.com"
            className="group font-display text-3xl font-black uppercase text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            <RollText>Hire Me</RollText>
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
        project-card relative border flex flex-col justify-between overflow-hidden shadow-2xl transition-colors duration-500
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
          absolute -bottom-8 -right-6 font-display font-black leading-none select-none pointer-events-none transition-opacity
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
          <span className="project-category font-mono text-xs tracking-widest uppercase mb-3 block text-[var(--accent)]">
            {project.category}
          </span>

          <h3
            className={`
              project-title font-display font-black uppercase leading-[0.95]
              ${isMobile ? "text-2xl" : "text-4xl xl:text-5xl 2xl:text-6xl"}
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
