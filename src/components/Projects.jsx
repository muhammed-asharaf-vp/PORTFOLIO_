"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { gsap, ScrollTrigger, useGSAP, whenIdle } from "@/lib/gsap";
import SplitReveal from "@/components/text/SplitReveal";
import ScrambleIn from "@/components/text/ScrambleIn";
import CountUp from "@/components/text/CountUp";
import RollText from "@/components/text/RollText";

/* Screenshots live in /public/projects/<img>.jpg (img: null -> CSS mock) */
const PROJECTS = [
  {
    title: "Orbit — Team Workspace",
    category: "Agency Project Management & Real-Time Chat Platform",
    pitch: "Full-stack team workspace with task workflows, calendar, and time logs, plus a real-time chat with direct messages, read receipts, reply and forward, and Cloudinary file sharing, delivered live over SSE with push notifications.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Cloudinary", "Docker"],
    link: "https://orbit.toruss.agency/",
    kind: "Full Stack · SaaS",
    img: null,
    mock: "orbit",
    url: "orbit.toruss.agency",
    desc: "Built a full-stack project and task management platform for a creative agency using React, Vite, Node.js, Express, and PostgreSQL, covering projects, task clusters, a review workflow, task requests, a shared calendar, time logs, and a knowledge base. Implemented a real-time chat system with manager-to-member and member-to-member direct messaging, live delivery over Server-Sent Events, push notifications, read receipts, unread counts, and reply, forward, and delete. File sharing supports images, GIFs, PDFs, and ZIP files through signed Cloudinary uploads straight from the browser. Secured with JWT auth, role-based access, Helmet, and rate limiting, and deployed with Docker, Nginx, and GitHub Actions CI/CD.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "SSE", "Cloudinary", "Docker"],
  },
  {
    title: "The Spanish Alchemist",
    category: "D2C Skincare E-commerce Store",
    pitch: "Conversion-focused Shopify storefront for a Spanish skincare brand, with routine bundles, shop-by-skin-type discovery, quick add-to-cart, customer reviews, and a redesigned product listing experience.",
    stack: ["Shopify", "Liquid", "JavaScript", "CSS", "Klaviyo"],
    link: "https://thespanishalchemist.com/",
    kind: "E-commerce · Shopify",
    img: "tsa-v3",
    url: "thespanishalchemist.com",
    desc: "Developed and redesigned a Shopify e-commerce storefront for a Spanish D2C skincare brand. Built custom Liquid theme sections for product routines and bundles with discount pricing, shop-by-skin-type filtering, quick add-to-cart, ratings and reviews, clinical results, and press highlights. Integrated Klaviyo email capture, Junip reviews, Shop Pay, and analytics tracking, and optimised the product listing page (PLP) layout and mobile experience for higher conversions.",
    tags: ["Shopify", "Liquid", "JavaScript", "CSS", "E-commerce"],
  },
  {
    title: "Oceanus Grandeur",
    category: "Real Estate Lead Generation Platform",
    pitch: "High-converting landing site for Palakkad's largest residential township, with apartment configurators, a refundable booking offer, live project updates, and site-visit forms that capture leads straight into a Supabase backend, tracked across Google Ads and Meta.",
    stack: ["HTML", "CSS", "JavaScript", "Supabase", "PostgreSQL"],
    link: "https://oceanusgrandeurpalakkad.com/",
    kind: "Lead Generation · Real Estate",
    img: "oceanus-v2",
    url: "oceanusgrandeurpalakkad.com",
    desc: "Built a conversion-focused lead generation website for Palakkad's largest residential township (195 luxury apartments). Developed sections for 2, 3 and 4 BHK apartment selection with specs and brochure downloads, a refundable booking offer, RERA-verified project updates, a filterable photo gallery, and amenity and location highlights. Built site-visit and enquiry forms that save leads to a Supabase (PostgreSQL) backend through its REST API, and set up conversion tracking with GTM, GA4, Google Ads, and Meta Pixel for ad campaign performance.",
    tags: ["JavaScript", "Supabase", "PostgreSQL", "GTM", "Meta Pixel"],
  },
  {
    title: "Eram Education",
    category: "Multi-Institution Education Management Platform",
    pitch: "Unified CMS and portal for a multi-school group, streamlining events, gallery, downloads, and student-parent communication across institutions with a scalable architecture.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    link: "https://eram.edu.in/",
    kind: "Education · Platform",
    img: "eram-v3",
    url: "eram.edu.in",
    desc: "Engineered a responsive education platform for institutions using Next.js, TypeScript, and Tailwind CSS, with reusable UI components for admissions, academics, gallery, and resources. Integrated backend APIs to power admissions, contacts, and downloadable resources, while GSAP-driven page transitions and animations delivered a polished user experience. Refined responsive layouts and performance across desktop, tablet, and mobile devices.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Cloudinary", "Docker"],
  },
  {
    title: "Best Mountain",
    category: "Building Materials Business & Catalog Platform",
    pitch: "Business website for a building materials supplier, showcasing products and services with inquiry-driven lead generation and a scalable, self-hosted architecture.",
    stack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    link: "https://www.bm-materials.com/",
    kind: "B2B · Product Catalog",
    img: "bestmountain",
    url: "bm-materials.com",
    desc: "Built a modern B2B website using Next.js, TypeScript, React.js, and Tailwind CSS, featuring responsive product and content sections for sustainable raw materials and industrial applications. Integrated dynamic content and downloadable resources to enhance product discovery, along with interactive UI elements and smooth animations for an engaging user experience. Optimized image loading and frontend performance for seamless cross-device compatibility in production.",
    tags: ["React", "GSAP", "Tailwind CSS", "Node.js", "MongoDB", "Cloudinary", "Docker"],
  },
  {
    title: "Pulse Pariraksha",
    category: "Healthcare Diagnostics & Appointment Booking Platform",
    pitch: "Preventive healthcare platform for booking health check-up packages, featuring package discovery, slot reservation, and WhatsApp-integrated confirmation workflows.",
    stack: ["React", "Tailwind CSS", "Node.js", "PostgreSQL"],
    link: "https://pariraksha.pulsepkd.com/",
    kind: "Healthcare · Booking",
    img: "pulse",
    url: "pariraksha.pulsepkd.com",
    desc: "Developed a preventive healthcare booking platform featuring 30+ health check-up packages with slot reservation, WhatsApp confirmation, and dynamic package filtering. Built responsive sections for testimonials, FAQs, and the booking journey to improve user engagement. Integrated form-based lead capture and optimized performance across devices for a smooth user experience.",
    tags: ["React", "GSAP", "Tailwind CSS", "Node.js", "PostgreSQL"],
  },
  {
    title: "Veloce Watch Store",
    category: "Premium Watch Showcase Website",
    pitch: "Interactive premium watch showcase website with a fully responsive layout, modular UI components, and smooth modern UI interactions.",
    stack: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    link: "https://vel0ce.vercel.app",
    kind: "Showcase · Frontend",
    img: "veloce",
    url: "vel0ce.vercel.app",
    desc: "Designed and engineered an interactive premium watch showcase website with a fully responsive layout. Built modular UI components and added smooth UI interactions for a premium user experience.",
    tags: ["React", "GSAP", "Tailwind CSS"],
  },
  {
    title: "Chatloop Social",
    category: "Secure Social Networking Platform",
    pitch: "Secure social networking platform supporting real-time messaging and content sharing with authentication, profile management, and safety-focused workflows.",
    stack: ["Flutter", "Dart", "Python", "SQL", "Bootstrap"],
    link: null,
    kind: "Social · Mobile",
    img: null,
    mock: "chat",
    url: "mobile app",
    desc: "Developed secure social networking features with auth and profile workflows.",
    tags: ["Flutter", "Python"],
  },
];

const allTags = (p) => [...new Set([...p.tags, ...p.stack])];
const N = PROJECTS.length;
const TECH_COUNT = new Set(PROJECTS.flatMap((p) => allTags(p))).size;
const pad = (n) => String(n).padStart(2, "0");
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---- scroll progress (0..1) -> project position (0..N-1) with dwell zones ---- */
// Each project owns an equal slice; the middle 55% of the slice "dwells" on it.
function mapProgress(q) {
  const x = clamp(q, 0, 1) * (N - 1);
  const i = Math.floor(x);
  const f = x - i;
  const DW = 0.28;
  let e;
  if (f < DW) e = 0;
  else if (f > 1 - DW) e = 1;
  else {
    const t = (f - DW) / (1 - 2 * DW);
    e = t * t * (3 - 2 * t);
  }
  return Math.min(N - 1, i + e);
}

/* ---------------- CSS mock screens for sites without a public page ---------------- */
function Mock({ type }) {
  if (type === "orbit") {
    return (
      <div className="absolute inset-0 bg-[var(--card-bg)] flex">
        <div className="w-[18%] border-r border-[var(--border-color)] p-4 flex flex-col gap-3">
          <div className="font-mono text-xs tracking-[0.3em] text-[var(--accent)]">⬡ ORBIT</div>
          {["Projects", "Tasks", "Calendar", "Chat", "Time logs", "Knowledge"].map((t, i) => (
            <div
              key={t}
              className={`h-6 rounded-md px-2 flex items-center font-mono text-[10px] uppercase tracking-widest ${
                i === 0
                  ? "bg-[var(--accent)] text-[var(--background)]"
                  : "opacity-50"
              }`}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="flex-1 p-5 grid grid-cols-3 gap-3 content-start">
          {["Backlog", "In progress", "Review"].map((col, c) => (
            <div key={col} className="rounded-lg border border-[var(--border-color)] p-2 flex flex-col gap-2">
              <div className="font-mono text-[9px] uppercase tracking-widest opacity-50">{col}</div>
              {Array.from({ length: 3 - (c === 2 ? 1 : 0) }).map((_, k) => (
                <div key={k} className="rounded-md border border-[var(--border-color)] bg-[var(--background)] p-2">
                  <div className="h-1.5 w-4/5 rounded bg-[var(--foreground)] opacity-30" />
                  <div className="mt-2 h-1.5 w-2/5 rounded bg-[var(--accent)] opacity-70" />
                </div>
              ))}
            </div>
          ))}
          <div className="col-span-3 rounded-lg border border-[var(--border-color)] p-3 flex flex-col gap-2">
            <div className="font-mono text-[9px] uppercase tracking-widest opacity-50">Live chat · SSE</div>
            <div className="h-2 w-1/2 rounded bg-[var(--foreground)] opacity-20" />
            <div className="h-2 w-2/5 rounded bg-[var(--accent)] opacity-60 self-end" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 bg-[var(--card-bg)] flex items-center justify-center gap-6">
      {[0, 1].map((k) => (
        <div
          key={k}
          className={`w-[22%] h-[84%] rounded-[1.6rem] border-2 border-[var(--border-color)] bg-[var(--background)] p-3 flex flex-col gap-2 ${
            k ? "mt-8" : "-mt-8"
          }`}
        >
          <div className="h-8 w-8 rounded-full bg-[var(--accent)]" />
          <div className="h-2 w-3/5 rounded bg-[var(--foreground)] opacity-40" />
          <div className="flex-1 rounded-xl border border-[var(--border-color)]" />
          <div className="h-2 w-4/5 rounded bg-[var(--foreground)] opacity-20" />
          <div className="h-2 w-2/5 rounded bg-[var(--accent)] opacity-70" />
        </div>
      ))}
    </div>
  );
}

function Shot({ p }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(--card-bg)]">
      {p.img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/projects/${p.img}.jpg?v=3`}
          alt={`${p.title} website screenshot`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 w-full h-full object-fill"
        />
      ) : (
        <Mock type={p.mock} />
      )}
    </div>
  );
}

function Frame({ p }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--background)]">
      <div className="h-7 px-3 flex items-center gap-2 border-b border-[var(--border-color)] bg-[var(--card-bg)]">
        <span className="w-2 h-2 rounded-full bg-[var(--foreground)] opacity-25" />
        <span className="w-2 h-2 rounded-full bg-[var(--foreground)] opacity-25" />
        <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
        <span className="ml-3 font-mono text-[10px] tracking-widest opacity-50 truncate">{p.url}</span>
      </div>
      <div className="relative w-full aspect-[1903/978]">
        <Shot p={p} />
        {/* scanlines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--foreground) 0 1px, transparent 1px 3px)",
          }}
        />
      </div>
    </div>
  );
}

function Tags({ tags }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li
          key={t}
          className="px-3 py-1 rounded-full border border-[var(--border-color)] font-mono text-[10px] uppercase tracking-widest opacity-70"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function MobileCard({ p, i }) {
  const [more, setMore] = useState(false);
  const tagList = allTags(p);
  return (
    <article data-mcard className="will-change-transform">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span className="opacity-50">
          {pad(i + 1)} / {pad(N)}
        </span>
        <span className="text-[var(--accent)]">{p.kind}</span>
      </div>
      <div data-mshot className="mt-3 w-full">
        <Frame p={p} />
      </div>
      <h3 className="mt-5 font-display font-black uppercase tracking-tighter text-2xl leading-[0.95]">
        {p.title}
      </h3>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest opacity-50">{p.category}</p>
      <p className={`mt-3 text-sm leading-relaxed ${more ? "" : "line-clamp-3"}`}>{p.pitch}</p>

      {/* expandable: grid-rows 0fr -> 1fr animates height smoothly */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: more ? "1fr" : "0fr" }}
        onTransitionEnd={() => ScrollTrigger.refresh()}
      >
        <div className="overflow-hidden">
          {p.desc.length > 90 && (
            <p className="pt-3 text-sm opacity-60 leading-relaxed">{p.desc}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Tags tags={more ? tagList : tagList.slice(0, 3)} />
      </div>

      <div className="mt-5 flex items-center gap-3">
        {more && p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[var(--background)] font-mono text-[11px] uppercase tracking-widest"
          >
            Visit site <FiArrowUpRight />
          </a>
        )}
        <button
          type="button"
          aria-expanded={more}
          onClick={() => setMore((v) => !v)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--accent)] font-mono text-[11px] uppercase tracking-widest transition-colors ${
            more ? "text-[var(--accent)]" : "bg-[var(--accent)] text-[var(--background)]"
          }`}
        >
          {more ? "View less −" : "View more +"}
        </button>
      </div>
    </article>
  );
}

function Stat({ value, pad: padTo = 0, suffix = "", children }) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-3">
      <dt className="sr-only">{children}</dt>
      <dd className="font-display text-3xl font-black text-[var(--accent)] leading-none">
        <CountUp value={value} pad={padTo} suffix={suffix} />
      </dd>
      <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-50">{children}</dd>
    </div>
  );
}

export default function Projects() {
  const container = useRef(null);
  const stageRef = useRef(null);
  const panelRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null); // project index with details drawer open
  const activeRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const closeDrawer = useCallback(() => setOpen(null), []);

  // Pause Lenis + close on Esc while the drawer is open
  useEffect(() => {
    if (open === null) return;
    window.lenis?.stop?.();
    const onKey = (e) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.lenis?.start?.();
    };
  }, [open, closeDrawer]);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          let cleanup = () => {};
          const kill = whenIdle(
            contextSafe(() => {
              const stage = stageRef.current;
              if (!stage) return;

              const panels = panelRefs.current.filter(Boolean);
              const state = { target: 0, cur: 0 };

              const render = (p) => {
                // panels: z = distance ahead of camera
                panels.forEach((el, i) => {
                  const z = i - p;
                  const side = i % 2 === 0 ? 1 : -1;
                  let s, x, y, o, ry, split;
                  if (z >= 0) {
                    const d = 1 / (1 + z * 0.95);
                    s = d;
                    x = side * (1 - d) * 34; // vw drift toward corners
                    y = -side * (1 - d) * 9; // vh
                    ry = -side * Math.min(z, 1.2) * 9;
                    o = clamp(1.15 - z * 0.42, 0, 1);
                    split = clamp(z, 0, 1) * 6;
                  } else {
                    const k = -z;
                    s = 1 + k * 1.9;
                    x = -side * k * 40;
                    y = 0;
                    ry = side * k * 10;
                    o = clamp(1 - k * 2.2, 0, 1);
                    split = clamp(k, 0, 1) * 14;
                  }
                  gsap.set(el, {
                    xPercent: -50,
                    yPercent: -50,
                    x: `${x}vw`,
                    y: `${y}vh`,
                    scale: s,
                    rotationY: ry,
                    opacity: o,
                    zIndex: Math.round(1000 - z * 100),
                    visibility: o < 0.01 ? "hidden" : "visible",
                    filter:
                      split > 0.2
                        ? `drop-shadow(${split}px 0 0 color-mix(in srgb, var(--accent) 70%, transparent)) drop-shadow(${-split}px 0 0 color-mix(in srgb, var(--foreground) 45%, transparent))`
                        : "none",
                  });
                });

                const idx = Math.round(p);
                if (idx !== activeRef.current) {
                  activeRef.current = idx;
                  setActive(idx);
                }
              };

              render(0);

              const st = ScrollTrigger.create({
                trigger: stage,
                start: "top top",
                end: () => `+=${window.innerHeight * (N * 0.95)}`,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  state.target = mapProgress(self.progress);
                },
              });

              // Smooth follow (lerp) so wheel jumps feel like a dolly
              const tick = () => {
                const diff = state.target - state.cur;
                if (Math.abs(diff) < 0.0004) {
                  if (state.cur !== state.target) {
                    state.cur = state.target;
                    render(state.cur);
                  }
                  return;
                }
                state.cur += diff * 0.12;
                render(state.cur);
              };
              gsap.ticker.add(tick);

              cleanup = () => {
                gsap.ticker.remove(tick);
                st.kill();
              };
            })
          );
          return () => {
            if (typeof kill === "function") kill();
            cleanup();
          };
        }
      );

      // Mobile: cards scale/fade in as they reach the centre, with a short RGB-split
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray("[data-mcard]").forEach((card) => {
          const st = { trigger: card, start: "top 92%", end: "top 50%", scrub: true };
          gsap.fromTo(
            card,
            { scale: 0.92, opacity: 0.35 },
            { scale: 1, opacity: 1, ease: "none", scrollTrigger: st }
          );
          const shot = card.querySelector("[data-mshot]");
          const o = { v: 7 };
          gsap.to(o, {
            v: 0,
            ease: "none",
            scrollTrigger: st,
            onUpdate: () => {
              shot.style.filter =
                o.v > 0.3
                  ? `drop-shadow(${o.v}px 0 0 color-mix(in srgb, var(--accent) 70%, transparent)) drop-shadow(${-o.v}px 0 0 color-mix(in srgb, var(--foreground) 45%, transparent))`
                  : "none";
            },
          });
        });
      });

      // Header reveal (all sizes)
      mm.add("(min-width: 0px)", () => {
        gsap.from(".exp-head", {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-head", start: "top 88%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  const cur = PROJECTS[active];

  return (
    <section
      id="projects"
      ref={container}
      className="relative border-b border-[var(--border-color)] scroll-mt-[120px]"
    >
      {/* ---------------- HEADER ---------------- */}
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 pt-20 md:pt-32 pb-10 md:pb-16">
        <div className="exp-head flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <p className="text-[11px] md:text-sm font-mono text-[var(--accent)] uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              <ScrambleIn>( 03 ) — Work</ScrambleIn>
            </p>
            <SplitReveal
              as="h2"
              type="chars"
              effect="flip"
              stagger={0.05}
              duration={1.1}
              className="font-display text-[7vw] md:text-5xl lg:text-7xl xl:text-8xl font-black uppercase text-[var(--foreground)] tracking-tighter leading-[0.9]"
            >
              Projects
              <span className="text-[var(--accent)]">.</span>
            </SplitReveal>
          </div>
          <div className="md:max-w-md md:text-right">
            <p className="text-sm md:text-base opacity-60 leading-relaxed">
              Building responsive, high-performance frontends with React, Next.js, and modern UI
              systems.
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3 md:max-w-xs md:ml-auto">
              <Stat value={N} pad={2}>Projects shipped</Stat>
              <Stat value={TECH_COUNT} suffix="+">Technologies</Stat>
            </dl>
          </div>
        </div>
      </div>

      {/* ---------------- DESKTOP: pinned tunnel stage ---------------- */}
      <div
        ref={stageRef}
        className="hidden lg:block motion-reduce:!hidden relative h-screen w-full overflow-hidden bg-[var(--background)]"
      >
        {/* text layer */}
        <div className="absolute inset-0 pointer-events-none">
          {PROJECTS.map((p, i) => {
            const on = i === active;
            return (
              <div
                key={p.title}
                aria-hidden={!on}
                className={`absolute left-[4vw] bottom-[9vh] max-w-[34vw] transition-all duration-500 ease-out ${
                  on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ zIndex: 3000 }}
              >
                <h3 className="font-display font-black uppercase tracking-tighter leading-[0.95] text-[3vw] text-[var(--foreground)]">
                  {p.title}
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]">
                  {p.kind}
                </p>
                <p className="mt-3 text-sm opacity-60 leading-relaxed line-clamp-3">{p.desc}</p>
                <div className="mt-4 pointer-events-auto">
                  <button
                    type="button"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setOpen(i)}
                    className="cursor-dot-zone inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--accent)] text-[var(--accent)] font-mono text-[11px] uppercase tracking-widest hover:bg-[var(--accent)] hover:text-[var(--background)] transition-colors"
                  >
                    View details <FiArrowUpRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* panels */}
        <div
          className="absolute inset-0"
          style={{ perspective: "1400px" }}
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => (panelRefs.current[i] = el)}
              className="absolute left-1/2 top-1/2 w-[46vw] max-w-[860px] will-change-transform [backface-visibility:hidden]"
              style={{ left: "62%" }}
            >
              <Frame p={p} />
            </div>
          ))}
        </div>

        {/* HUD */}
        <div className="absolute top-6 left-[4vw] right-[4vw] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 z-[4000] pointer-events-none">
          <span>Selected Work</span>
          <span>
            {pad(active + 1)} / {pad(N)}
          </span>
        </div>

        <span className="sr-only" aria-live="polite">
          {cur.title}
        </span>
      </div>

      {mounted &&
        createPortal(
          <>
        <div
          data-lenis-prevent
          className={`fixed top-0 right-0 h-full w-[min(560px,92vw)] z-[90001] bg-[var(--background)] border-l border-[var(--border-color)] p-10 overflow-y-auto transition-transform duration-500 ease-out ${
            open !== null ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={open === null}
        >
          {open !== null && (
            <>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close details"
                className="cursor-dot-zone absolute top-6 right-6 w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <FiX />
              </button>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]">
                {pad(open + 1)} — {PROJECTS[open].kind}
              </p>
              <h3 className="mt-3 font-display font-black uppercase tracking-tighter text-3xl leading-[0.95]">
                {PROJECTS[open].title}
              </h3>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest opacity-50">
                {PROJECTS[open].category}
              </p>
              <p className="mt-6 text-base leading-relaxed text-[var(--foreground)]">
                {PROJECTS[open].pitch}
              </p>
              {PROJECTS[open].desc.length > 90 && (
                <p className="mt-5 text-sm leading-relaxed opacity-70">{PROJECTS[open].desc}</p>
              )}
              <div className="mt-6">
                <Tags tags={allTags(PROJECTS[open])} />
              </div>
              {PROJECTS[open].link && (
                <a
                  href={PROJECTS[open].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-dot-zone mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[var(--background)] font-mono text-[11px] uppercase tracking-widest hover:opacity-80 transition-opacity"
                >
                  Visit site <FiArrowUpRight />
                </a>
              )}
            </>
          )}
        </div>
        {open !== null && (
          <button
            type="button"
            aria-label="Close details"
            onClick={closeDrawer}
            className="fixed inset-0 z-[90000] bg-[var(--background)]/60 cursor-default"
          />
        )}

          </>,
          document.body
        )}

      {/* ---------------- MOBILE / REDUCED MOTION: stacked list ---------------- */}
      <ol className="lg:hidden motion-reduce:!block max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 pb-20 space-y-16">
        {PROJECTS.map((p, i) => (
          <li key={p.title}>
            <MobileCard p={p} i={i} />
          </li>
        ))}
      </ol>
      {/* ---------------- CTA ---------------- */}
      <div className="border-t border-[var(--border-color)] px-5 sm:px-8 md:px-12 py-16 md:py-24 flex flex-col items-center gap-6 md:gap-8 text-center">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--foreground)]">
          <ScrambleIn>Have a concept?</ScrambleIn>
        </p>
        <a
          href="mailto:mohamedasharafvpp@gmail.com"
          className="cursor-dot-zone group relative inline-block font-display text-3xl md:text-[4.5vw] font-black uppercase tracking-tight text-[var(--foreground)] transition-all duration-300 ease-out hover:text-[var(--accent)] hover:-translate-y-1"
        >
          <RollText>Hire Me</RollText>
          <span className="absolute left-0 -bottom-3 h-[4px] w-0 bg-[var(--accent)] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
        </a>
      </div>
    </section>
  );
}
