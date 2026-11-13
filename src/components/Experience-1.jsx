"use client";
import { useRef, useState } from "react";
import { FiArrowUpRight, FiDownload, FiMinus, FiPlus } from "react-icons/fi";
import { gsap, ScrollTrigger, useGSAP, whenIdle } from "@/lib/gsap";
import SplitReveal from "@/components/text/SplitReveal";
import ScrambleIn from "@/components/text/ScrambleIn";
import RollText from "@/components/text/RollText";

/* Work done at Toruss. Lines come from each project's own description.
   img -> /public/projects/<img>.jpg (hover preview, desktop only; null = no preview) */
const WORK = [
  {
    title: "Orbit",
    line: "Built a full-stack project and task management platform for a creative agency.",
    link: "https://orbit.toruss.agency/",
    img: null,
  },
  {
    title: "The Spanish Alchemist",
    line: "Developed and redesigned a Shopify e-commerce storefront for a Spanish D2C skincare brand.",
    link: "https://thespanishalchemist.com/",
    img: "tsa-v3",
  },
  {
    title: "Oceanus Grandeur",
    line: "Built a conversion-focused lead generation website for Palakkad's largest residential township.",
    link: "https://oceanusgrandeurpalakkad.com/",
    img: "oceanus-v2",
  },
  {
    title: "Eram Education",
    line: "Engineered a responsive education platform for institutions using Next.js, TypeScript, and Tailwind CSS.",
    link: "https://eram.edu.in/",
    img: "eram-v3",
  },
  {
    title: "Best Mountain",
    line: "Built a modern B2B website using Next.js, TypeScript, React.js, and Tailwind CSS.",
    link: "https://www.bm-materials.com/",
    img: "bestmountain",
  },
  {
    title: "Pulse Pariraksha",
    line: "Developed a preventive healthcare booking platform featuring 30+ health check-up packages.",
    link: "https://pariraksha.pulsepkd.com/",
    img: "pulse",
  },
];

const N = WORK.length;
const pad = (n) => String(n).padStart(2, "0");
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export default function Experience() {
  const container = useRef(null);
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const hoverRef = useRef(false); // pointer is over the list (scroll focus yields)
  const previewOK = useRef(false); // desktop + fine pointer + motion allowed

  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(null); // focused row
  const [previewOn, setPreviewOn] = useState(false);

  useGSAP(
    (_, contextSafe) =>
      whenIdle(
        contextSafe(() => {
          const root = container.current;
          const list = listRef.current;
          if (!root || !list) return;
          const q = (s) => root.querySelectorAll(s);
          const mm = gsap.matchMedia();

          // Entrance + scroll focus (skipped entirely for reduced motion)
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(q(".exp-top-rule"), {
              scaleX: 0,
              transformOrigin: "left",
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: q(".exp-top-rule")[0], start: "top 92%", once: true },
            });

            const st = { trigger: list, start: "top 85%", once: true };
            gsap.from(q("[data-row]"), {
              y: 28,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.09,
              clearProps: "opacity,transform",
              scrollTrigger: st,
            });
            gsap.from(q(".row-rule"), {
              scaleX: 0,
              transformOrigin: "left",
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: st,
            });

            // Scroll focus: the row being read lights up (pointer hover takes over)
            q("[data-row]").forEach((row, i) =>
              ScrollTrigger.create({
                trigger: row,
                start: "top 62%",
                end: "bottom 62%",
                onToggle: (self) => {
                  if (self.isActive && !hoverRef.current) setActive(i);
                },
              })
            );
            ScrollTrigger.create({
              trigger: list,
              start: "top 62%",
              end: "bottom 62%",
              onToggle: (self) => {
                if (!self.isActive && !hoverRef.current) setActive(null);
              },
            });
          });

          // Cursor-following screenshot (desktop mouse only)
          mm.add(
            "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
            () => {
              const pv = previewRef.current;
              if (!pv) return;
              previewOK.current = true;
              const xTo = gsap.quickTo(pv, "x", { duration: 0.55, ease: "power3" });
              const yTo = gsap.quickTo(pv, "y", { duration: 0.55, ease: "power3" });
              const place = (e) => {
                const w = pv.offsetWidth;
                const h = pv.offsetHeight;
                return [
                  clamp(e.clientX + 32, 0, window.innerWidth - w - 24),
                  clamp(e.clientY - h / 2, 90, window.innerHeight - h - 24),
                ];
              };
              const onEnter = (e) => {
                const [x, y] = place(e);
                gsap.set(pv, { x, y });
              };
              const onMove = (e) => {
                const [x, y] = place(e);
                xTo(x);
                yTo(y);
              };
              list.addEventListener("pointerenter", onEnter);
              list.addEventListener("pointermove", onMove);
              return () => {
                previewOK.current = false;
                list.removeEventListener("pointerenter", onEnter);
                list.removeEventListener("pointermove", onMove);
              };
            }
          );

          return () => mm.revert();
        })
      ),
    { scope: container }
  );

  const shot = active !== null ? WORK[active].img : null;
  const showPreview = previewOn && !!shot;

  const onRowEnter = (e, i) => {
    if (e.pointerType !== "mouse") return;
    hoverRef.current = true;
    setActive(i);
    if (previewOK.current) setPreviewOn(true);
  };
  const onListLeave = () => {
    hoverRef.current = false;
    setPreviewOn(false);
  };

  return (
    <section
      id="experience"
      ref={container}
      className="relative border-b border-[var(--border-color)] scroll-mt-[120px]"
    >
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 pt-20 md:pt-32 pb-0">
        {/* ---------------- HEADER ---------------- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] md:text-sm font-mono text-[var(--accent)] uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              <ScrambleIn>( 02 ) — Checkpoint</ScrambleIn>
            </p>
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

          <a
            href="/ashraf%20full%20stack.pdf"
            download="Mohamed_Asharaf_Resume.pdf"
            className="cursor-dot-zone group self-start md:self-auto inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--accent)] text-[var(--accent)] font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--accent)] hover:text-[var(--background)] transition-colors"
          >
            <RollText>Download resume</RollText>
            <FiDownload aria-hidden="true" className="text-base" />
          </a>
        </div>

        {/* ---------------- TORUSS ROW ---------------- */}
        <div className="exp-top-rule h-px w-full bg-[var(--foreground)] opacity-30" />

        <button
          type="button"
          aria-expanded={open}
          aria-controls="exp-toruss-panel"
          onClick={() => setOpen((v) => !v)}
          className="cursor-dot-zone group w-full text-left py-6 md:py-8 grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-x-4 sm:gap-x-6 lg:gap-x-8 xl:gap-x-12 gap-y-3"
        >
          <SplitReveal
            as="span"
            type="chars"
            effect="tilt"
            stagger={0.04}
            duration={1.1}
            className="exp-wordmark block whitespace-nowrap font-display font-black tracking-tighter leading-[1.1] text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300"
          >
            Toruss
          </SplitReveal>

          <span className="col-span-2 lg:col-span-1 lg:col-start-2 row-start-2 lg:row-start-1 min-w-0 flex flex-col gap-1">
            <span className="text-base md:text-lg opacity-60">Creative Agency</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]">
              Full Stack Developer
            </span>
          </span>

          <span className="hidden lg:block whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em]">
            2026 — Present
          </span>

          <span
            aria-hidden="true"
            className="row-start-1 col-start-2 lg:col-start-4 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors"
          >
            {open ? <FiMinus /> : <FiPlus />}
          </span>

          <span className="lg:hidden col-span-2 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">
            2026 — Present
          </span>
        </button>

        {/* ---------------- WORK LOG ---------------- */}
        <div
          id="exp-toruss-panel"
          className="grid transition-[grid-template-rows] duration-500 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          aria-hidden={!open}
          inert={!open}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget) ScrollTrigger.refresh();
          }}
        >
          <div className="overflow-hidden">
            <div className="flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.3em] opacity-50">
              <span>Selected contributions</span>
              <span aria-hidden="true">
                {active === null ? "—" : pad(active + 1)} / {pad(N)}
              </span>
            </div>

            <ol ref={listRef} onPointerLeave={onListLeave}>
              {WORK.map((p, i) => {
                const on = active === i;
                const dim = active !== null && !on;
                const shift = `transition-transform duration-300 ease-out ${
                  on ? "lg:translate-x-4" : ""
                }`;
                return (
                  <li
                    key={p.title}
                    data-row
                    onPointerEnter={(e) => onRowEnter(e, i)}
                    onFocus={() => setActive(i)}
                  >
                    <div
                      className={`row-rule h-px w-full transition-colors duration-500 ${
                        on ? "bg-[var(--accent)]" : "bg-[var(--border-color)]"
                      }`}
                    />
                    <div
                      className={`py-5 lg:py-7 grid grid-cols-[2.5rem_1fr_auto] lg:grid-cols-[3.5rem_17rem_1fr_auto] gap-x-4 lg:gap-x-8 gap-y-2 items-baseline transition-opacity duration-300 ${
                        dim ? "lg:opacity-40" : ""
                      }`}
                    >
                      <span
                        className={`font-mono text-xs opacity-50 ${shift}`}
                      >
                        {pad(i + 1)}
                      </span>

                      <ScrambleIn
                        as="h3"
                        className={`min-w-0 break-words font-display text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tight leading-tight text-[var(--foreground)] ${shift}`}
                      >
                        {p.title}
                      </ScrambleIn>

                      <p
                        className={`col-span-2 col-start-2 row-start-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 text-sm lg:text-base leading-relaxed opacity-70 max-w-2xl ${shift}`}
                      >
                        {p.line}
                      </p>

                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${p.title}`}
                          className="cursor-dot-zone group/visit col-start-3 row-start-1 lg:col-start-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[var(--accent)]"
                        >
                          <RollText>Visit</RollText>
                          <FiArrowUpRight
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5"
                          />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Cursor-following screenshot: desktop mouse only (position driven by GSAP) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="hidden lg:block fixed left-0 top-0 z-[80] w-[300px] pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-300 ease-out ${
            showPreview ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="aspect-[1903/978] w-full">
            {shot && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/projects/${shot}.jpg?v=2`}
                alt=""
                decoding="async"
                draggable={false}
                className="w-full h-full object-fill"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
