"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Orbit — Team Workspace",
    kind: "Full Stack · SaaS",
    desc: "Built a full-stack project and task management platform for a creative agency using React, Vite, Node.js, Express, and PostgreSQL, covering projects, task clusters, a review workflow, task requests, a shared calendar, time logs, and a knowledge base. Implemented a real-time chat system with manager-to-member and member-to-member direct messaging, live delivery over Server-Sent Events, push notifications, read receipts, unread counts, and reply, forward, and delete. File sharing supports images, GIFs, PDFs, and ZIP files through signed Cloudinary uploads straight from the browser. Secured with JWT auth, role-based access, Helmet, and rate limiting, and deployed with Docker, Nginx, and GitHub Actions CI/CD.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "SSE",
      "Cloudinary",
      "Docker",
    ],
  },
  {
    title: "The Spanish Alchemist",
    kind: "E-commerce · Shopify",
    desc: "Developed and redesigned a Shopify e-commerce storefront for a Spanish D2C skincare brand. Built custom Liquid theme sections for product routines and bundles with discount pricing, shop-by-skin-type filtering, quick add-to-cart, ratings and reviews, clinical results, and press highlights. Integrated Klaviyo email capture, Junip reviews, Shop Pay, and analytics tracking, and optimised the product listing page (PLP) layout and mobile experience for higher conversions.",
    tags: ["Shopify", "Liquid", "JavaScript", "CSS", "E-commerce"],
  },
  {
    title: "Oceanus Grandeur",
    kind: "Lead Generation · Real Estate",
    desc: "Built a conversion-focused lead generation website for Palakkad's largest residential township (195 luxury apartments). Developed sections for 2, 3 and 4 BHK apartment selection with specs and brochure downloads, a refundable booking offer, RERA-verified project updates, a filterable photo gallery, and amenity and location highlights. Built site-visit and enquiry forms that save leads to a Supabase (PostgreSQL) backend through its REST API, and set up conversion tracking with GTM, GA4, Google Ads, and Meta Pixel for ad campaign performance.",
    tags: ["JavaScript", "Supabase", "PostgreSQL", "GTM", "Meta Pixel"],
  },
  {
    title: "Eram Education",
    kind: "Education · Platform",
    desc: "Engineered a responsive education platform for institutions using Next.js, TypeScript, and Tailwind CSS, with reusable UI components for admissions, academics, gallery, and resources. Integrated backend APIs to power admissions, contacts, and downloadable resources, while GSAP-driven page transitions and animations delivered a polished user experience. Refined responsive layouts and performance across desktop, tablet, and mobile devices.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Cloudinary",
      "Docker",
    ],
  },
  {
    title: "Best Mountain",
    kind: "B2B · Product Catalog",
    desc: "Built a modern B2B website using Next.js, TypeScript, React.js, and Tailwind CSS, featuring responsive product and content sections for sustainable raw materials and industrial applications. Integrated dynamic content and downloadable resources to enhance product discovery, along with interactive UI elements and smooth animations for an engaging user experience. Optimized image loading and frontend performance for seamless cross-device compatibility in production.",
    tags: [
      "React",
      "GSAP",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Cloudinary",
      "Docker",
    ],
  },
  {
    title: "Pulse Pariraksha",
    kind: "Healthcare · Booking",
    desc: "Developed a preventive healthcare booking platform featuring 30+ health check-up packages with slot reservation, WhatsApp confirmation, and dynamic package filtering. Built responsive sections for testimonials, FAQs, and the booking journey to improve user engagement. Integrated form-based lead capture and optimized performance across devices for a smooth user experience.",
    tags: ["React", "GSAP", "Tailwind CSS", "Node.js", "PostgreSQL"],
  },
  {
    title: "Veloce Watch Store",
    kind: "Showcase · Frontend",
    desc: "Designed and engineered an interactive premium watch showcase website with a fully responsive layout. Built modular UI components and added smooth UI interactions for a premium user experience.",
    tags: ["React", "GSAP", "Tailwind CSS"],
  },
  {
    title: "Chatloop Social",
    kind: "Social · Mobile",
    desc: "Developed secure social networking features with auth and profile workflows.",
    tags: ["Flutter", "Python"],
  },
];

const TECH_COUNT = new Set(PROJECTS.flatMap((p) => p.tags)).size;

// Descriptions longer than this get a "Read more" toggle
const CLAMP_AFTER = 220;

export default function Experience() {
  const container = useRef(null);
  const [expanded, setExpanded] = useState(() => new Set());

  const toggle = (title) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Progress line fills as you scroll through the section
        gsap.fromTo(
          ".exp-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 0.6,
            },
          },
        );

        gsap.from(".exp-head > *", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 75%" },
        });

        // Cards rise in, staggered per batch as they enter the viewport
        gsap.set(".exp-card", { y: 60, opacity: 0 });
        ScrollTrigger.batch(".exp-card", {
          start: "top 88%",
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      });
    },
    { scope: container },
  );

  // Cursor-following spotlight: CSS variables only, no re-render
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="experience"
      ref={container}
      className="relative py-20 md:py-32 px-5 sm:px-8 md:px-12 max-w-[1800px] mx-auto border-b border-[var(--border-color)] overflow-clip scroll-mt-[120px]"
    >
      {/* ---------------- HEADER ---------------- */}
      <div className="exp-head flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
        <div>
          <p className="text-xs md:text-sm font-mono text-[var(--accent)] uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            ( 02 ) — Checkpoint
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase text-[var(--foreground)] tracking-tighter leading-[0.9]">
            Experience
          </h2>
        </div>
        <p className="max-w-sm text-sm md:text-base opacity-60 leading-relaxed md:text-right">
          Products I&apos;ve built and shipped — from real-time SaaS to
          e-commerce and lead generation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* ---------------- COMPANY (sticky on desktop) ---------------- */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 relative pl-6 md:pl-8">
            {/* Scroll progress rail */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--border-color)]">
              <div className="exp-progress absolute inset-0 origin-top bg-[var(--accent)] shadow-[0_0_16px_var(--accent)]" />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] md:text-xs px-3 py-1 rounded-full border border-[var(--accent)] text-[var(--accent)] uppercase tracking-widest">
                2026 — Present
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[var(--foreground)] leading-[0.95] tracking-tight">
              Toruss
              <span className="block text-lg md:text-xl font-mono font-normal tracking-widest opacity-50 mt-2">
                Creative Agency
              </span>
            </h3>

            <p className="mt-6 text-xl md:text-2xl font-light text-[var(--foreground)]">
              Full Stack Developer
            </p>

            <p className="mt-4 text-sm md:text-base opacity-60 leading-relaxed max-w-md">
              Engineering the future of web interfaces. Transforming raw designs
              into pixel-perfect, interactive, and scalable React applications
              within a high-velocity Agile environment.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-3 max-w-sm">
              <Stat value={String(PROJECTS.length).padStart(2, "0")}>
                Projects shipped
              </Stat>
              <Stat value={`${TECH_COUNT}+`}>Technologies</Stat>
            </dl>
          </div>
        </aside>

        {/* ---------------- PROJECTS (bento grid) ---------------- */}
        <div className="lg:col-span-8">
          <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-6">
            {"// Deployed Modules"}
          </p>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {PROJECTS.map((project, i) => {
              const featured = i === 0;
              const isOpen = expanded.has(project.title);
              const clampable = project.desc.length > CLAMP_AFTER;

              return (
                <li
                  key={project.title}
                  onMouseMove={handleMouseMove}
                  className={`exp-card group relative rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 sm:p-7 md:p-8 overflow-hidden transition-colors duration-500 hover:border-[var(--accent)] flex flex-col ${
                    featured ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Spotlight */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), color-mix(in srgb, var(--accent) 14%, transparent), transparent 65%)",
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="font-mono text-xs w-9 h-9 grid place-items-center border border-[var(--accent)] text-[var(--accent)] rounded-xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60">
                        {project.kind}
                      </span>
                      {featured && (
                        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--background)] font-bold">
                          Featured
                        </span>
                      )}
                    </div>

                    <h4
                      className={`font-black uppercase leading-[0.95] tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300 ${
                        featured
                          ? "text-3xl sm:text-4xl md:text-5xl"
                          : "text-2xl sm:text-3xl"
                      }`}
                    >
                      {project.title}
                    </h4>

                    <p
                      className={`mt-4 text-sm sm:text-base opacity-60 leading-relaxed ${
                        clampable && !isOpen
                          ? featured
                            ? "line-clamp-3"
                            : "line-clamp-4"
                          : ""
                      }`}
                    >
                      {project.desc}
                    </p>

                    {clampable && (
                      <button
                        type="button"
                        onClick={() => toggle(project.title)}
                        aria-expanded={isOpen}
                        className="cursor-dot-zone self-start mt-3 font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] hover:opacity-70 transition-opacity"
                      >
                        {isOpen ? "Show less −" : "Read more +"}
                      </button>
                    )}

                    {/* Tags pinned to the bottom so cards in a row line up */}
                    <ul className="mt-auto pt-6 flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <li
                          key={t}
                          className="text-[10px] md:text-[11px] font-mono uppercase tracking-wide px-2.5 py-1 rounded-full border border-[var(--border-color)] opacity-70 group-hover:opacity-100 transition-opacity"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, children }) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-3">
      <dt className="sr-only">{children}</dt>
      <dd className="text-3xl font-black text-[var(--accent)] leading-none">
        {value}
      </dd>
      <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-50">
        {children}
      </dd>
    </div>
  );
}
