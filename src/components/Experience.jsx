"use client";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/text/SplitReveal";
import ScrambleIn from "@/components/text/ScrambleIn";
import CountUp from "@/components/text/CountUp";

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

const pad = (n) => String(n).padStart(2, "0");

export default function Experience() {
  const container = useRef(null);
  const listRef = useRef(null);
  const [expanded, setExpanded] = useState(() => new Set());
  const [active, setActive] = useState(0);

  const toggle = (title) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  // Mobile carousel: track which card is in view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // A few cheap reads per scroll event; setActive skips re-renders when unchanged
    const onScroll = () => {
      const cards = list.children;
      if (cards.length < 2) return;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const atEnd = list.scrollLeft >= list.scrollWidth - list.clientWidth - 4;
      const index = atEnd
        ? cards.length - 1
        : Math.round(list.scrollLeft / step);
      setActive(Math.max(0, Math.min(cards.length - 1, index)));
    };

    // Only fires while the mobile carousel is scrollable (desktop grid doesn't scroll)
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => list.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (index) => {
    const list = listRef.current;
    const target =
      list?.children[Math.max(0, Math.min(index, PROJECTS.length - 1))];
    if (!target) return;
    // scroll the carousel only — never the page
    list.scrollTo({
      left:
        target.offsetLeft -
        list.offsetLeft -
        parseFloat(getComputedStyle(list).paddingLeft),
      behavior: "smooth",
    });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions.mobile) {
            // Panel, then the whole carousel, slide up once
            gsap.from(".exp-panel, .exp-carousel", {
              y: 50,
              opacity: 0,
              duration: 0.9,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: { trigger: ".exp-panel", start: "top 85%" },
            });
            return;
          }

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
        },
      );
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
      <div className="exp-head flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-20">
        <div>
          <p className="text-[11px] md:text-sm font-mono text-[var(--accent)] uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            <ScrambleIn>( 02 ) — Checkpoint</ScrambleIn>
          </p>
          {/* Letters flip up in 3D */}
          <SplitReveal
            as="h2"
            type="chars"
            effect="flip"
            stagger={0.05}
            duration={1.1}
            className="font-display text-[7vw] md:text-5xl lg:text-7xl xl:text-8xl font-black uppercase text-[var(--foreground)] tracking-tighter leading-[0.9]"
          >
            Experience
            <span className="text-[var(--accent)]">.</span>
          </SplitReveal>
        </div>
        <SplitReveal
          as="p"
          type="words"
          effect="blur"
          stagger={0.03}
          duration={0.8}
          className="max-w-sm text-sm md:text-base opacity-60 leading-relaxed md:text-right"
        >
          Products I&apos;ve built and shipped — from real-time SaaS to
          e-commerce and lead generation.
        </SplitReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* ---------------- COMPANY (glass card on mobile, sticky rail on desktop) ---------------- */}
        <aside className="lg:col-span-4">
          <div className="exp-panel relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pl-8 lg:sticky lg:top-32">
            {/* Mobile glow */}
            <div
              aria-hidden="true"
              className="lg:hidden pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-25"
              style={{ background: "var(--accent)" }}
            />

            {/* Scroll progress rail (desktop) */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--border-color)]">
              <div className="exp-progress absolute inset-0 origin-top bg-[var(--accent)] shadow-[0_0_16px_var(--accent)]" />
            </div>

            <div className="relative">
              {/* Badge above the title (Panchang is too wide to share a row on phones) */}
              <div className="flex flex-col items-start gap-4 lg:gap-6">
                <span className="shrink-0 font-mono text-[10px] md:text-xs px-3 py-1 rounded-full border border-[var(--accent)] text-[var(--accent)] uppercase tracking-widest">
                  2026 — Present
                </span>
                <h3 className="font-display text-3xl lg:text-3xl xl:text-4xl font-black uppercase text-[var(--foreground)] leading-[0.95] tracking-tight">
                  <SplitReveal as="span" type="chars" className="block">
                    Toruss
                  </SplitReveal>
                  <ScrambleIn className="block text-xs md:text-xl font-mono font-normal tracking-[0.25em] opacity-50 mt-2">
                    Creative Agency
                  </ScrambleIn>
                </h3>
              </div>

              <p className="mt-5 lg:mt-6 inline-flex items-center gap-2 text-base md:text-2xl font-light text-[var(--foreground)]">
                <span className="lg:hidden w-6 h-[1px] bg-[var(--accent)]" />
                Full Stack Developer
              </p>

              <SplitReveal
                as="p"
                type="lines"
                className="mt-3 lg:mt-4 text-sm md:text-base opacity-60 leading-relaxed max-w-md"
              >
                Engineering the future of web interfaces. Transforming raw
                designs into pixel-perfect, interactive, and scalable React
                applications within a high-velocity Agile environment.
              </SplitReveal>

              <dl className="mt-6 lg:mt-8 grid grid-cols-2 gap-3 max-w-sm">
                <Stat value={PROJECTS.length} pad={2}>
                  Projects shipped
                </Stat>
                <Stat value={TECH_COUNT} suffix="+">
                  Technologies
                </Stat>
              </dl>
            </div>
          </div>
        </aside>

        {/* ---------------- PROJECTS (swipe carousel on mobile, bento grid on desktop) ---------------- */}
        <div className="exp-carousel lg:col-span-8 min-w-0">
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <ScrambleIn
              as="p"
              className="font-mono text-xs uppercase tracking-widest opacity-40"
            >
              {"// Deployed Modules"}
            </ScrambleIn>
            <p className="md:hidden font-mono text-[10px] uppercase tracking-widest opacity-50">
              Swipe →
            </p>
          </div>

          <ol
            ref={listRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 scroll-px-5 sm:-mx-8 sm:px-8 sm:scroll-px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:grid md:grid-cols-2 md:gap-5"
          >
            {PROJECTS.map((project, i) => {
              const featured = i === 0;
              const isOpen = expanded.has(project.title);
              const clampable = project.desc.length > CLAMP_AFTER;

              return (
                <li
                  key={project.title}
                  onMouseMove={handleMouseMove}
                  className={`exp-card group relative shrink-0 w-[86%] sm:w-[62%] md:w-auto snap-start rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 sm:p-7 md:p-8 overflow-hidden transition-colors duration-500 hover:border-[var(--accent)] flex flex-col ${
                    featured ? "md:col-span-2" : ""
                  } ${active === i ? "max-md:border-[var(--accent)]/60" : ""}`}
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
                        {pad(i + 1)}
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

                    <SplitReveal
                      as="h4"
                      type="words"
                      stagger={0.08}
                      start="top 92%"
                      className={`font-display font-black uppercase leading-[1] tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300 ${
                        featured
                          ? "text-2xl sm:text-3xl lg:text-4xl"
                          : "text-lg sm:text-xl xl:text-2xl"
                      }`}
                    >
                      {project.title}
                    </SplitReveal>

                    <p
                      className={`mt-4 text-sm sm:text-base opacity-60 leading-relaxed ${
                        clampable && !isOpen
                          ? featured
                            ? "line-clamp-4 md:line-clamp-3"
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

                    {/* Tags pinned to the bottom so cards line up */}
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

          {/* Mobile carousel controls */}
          <div className="md:hidden mt-5 flex items-center gap-4">
            <span className="font-mono text-xs tabular-nums">
              <span className="text-[var(--accent)]">{pad(active + 1)}</span>
              <span className="opacity-40"> / {pad(PROJECTS.length)}</span>
            </span>

            <div className="flex-1 flex gap-1.5">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${p.title}`}
                  aria-current={active === i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= active
                      ? "bg-[var(--accent)]"
                      : "bg-[var(--border-color)]"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <CarouselButton
                label="Previous project"
                disabled={active === 0}
                onClick={() => goTo(active - 1)}
              >
                <FiArrowLeft />
              </CarouselButton>
              <CarouselButton
                label="Next project"
                disabled={active === PROJECTS.length - 1}
                onClick={() => goTo(active + 1)}
              >
                <FiArrowRight />
              </CarouselButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({ label, disabled, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="w-10 h-10 grid place-items-center rounded-full border border-[var(--border-color)] text-[var(--foreground)] transition active:scale-90 disabled:opacity-30 enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)]"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

function Stat({ value, pad = 0, suffix = "", children }) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)]/40 lg:bg-[var(--card-bg)] px-4 py-3">
      <dt className="sr-only">{children}</dt>
      <dd className="font-display text-3xl font-black text-[var(--accent)] leading-none">
        <CountUp value={value} pad={pad} suffix={suffix} />
      </dd>
      <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-50">
        {children}
      </dd>
    </div>
  );
}
