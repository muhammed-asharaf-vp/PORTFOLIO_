"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Eram Education",
    desc: "Engineered a responsive education platform for institutions using Next.js, TypeScript, and Tailwind CSS, with reusable UI components for admissions, academics, gallery, and resources. Integrated backend APIs to power admissions, contacts, and downloadable resources, while GSAP-driven page transitions and animations delivered a polished user experience. Refined responsive layouts and performance across desktop, tablet, and mobile devices.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Node.js", "MongoDB"],
  },
  {
    title: "Best Mountain",
    desc: "Built a modern B2B website using Next.js, TypeScript, React.js, and Tailwind CSS, featuring responsive product and content sections for sustainable raw materials and industrial applications. Integrated dynamic content and downloadable resources to enhance product discovery, along with interactive UI elements and smooth animations for an engaging user experience. Optimized image loading and frontend performance for seamless cross-device compatibility in production.",
    tags: ["React", "GSAP", "Tailwind CSS", "Node.js", "MongoDB"],
  },
  {
    title: "Pulse Pariraksha",
    desc: "Developed a preventive healthcare booking platform featuring 30+ health check-up packages with slot reservation, WhatsApp confirmation, and dynamic package filtering. Built responsive sections for testimonials, FAQs, and the booking journey to improve user engagement. Integrated form-based lead capture and optimized performance across devices for a smooth user experience.",
    tags: ["React", "GSAP", "Tailwind CSS", "Node.js", "PostgreSQL"],
  },
  {
    title: "Veloce Watch Store",
    desc: "Designed and engineered an interactive premium watch showcase website with a fully responsive layout. Built modular UI components and added smooth UI interactions for a premium user experience.",
    tags: ["React", "GSAP"],
  },
  {
    title: "Chatloop Social",
    desc: "Developed secure social networking features with auth and profile workflows.",
    tags: ["Flutter", "Python"],
  },
];

export default function Experience() {
  const container = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".timeline-neon", { height: "100%" });
        return;
      }

      // Neon line fills up
      gsap.fromTo(
        ".timeline-neon",
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      // Text Reveal
      const items = gsap.utils.toArray(".reveal-box");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: container },
  );

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      overwrite: "auto", // don't stack a new tween on every mousemove
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center",
    });
  };

  const handleMouseLeave = (e) => {
    if (window.innerWidth < 1024) return;

    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      overwrite: "auto",
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      id="experience"
      ref={container}
      className="relative py-20 md:py-32 px-5 sm:px-8 md:px-12 max-w-[1800px] mx-auto border-b border-[var(--border-color)] overflow-clip scroll-mt-[120px]"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 md:mb-20">
        <div className="reveal-box">
          <h2 className="text-sm font-mono text-[var(--accent)] uppercase tracking-[0.3em] mb-2">
            ( 02 ) — Checkpoint
          </h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[var(--foreground)] tracking-tight">
            Experience
          </h3>
        </div>
      </div>

      <div className="relative grid grid-cols-12 gap-8 md:gap-12">
        {/* TIMELINE LINE only — dots removed */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-[var(--border-color)]/30 left-4 md:left-[28%]">
          <div className="timeline-neon absolute top-0 left-0 w-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent)]" />
        </div>

        <div className="col-span-12 md:col-span-4 md:text-right md:pr-16 pl-10 md:pl-0">
          <div className="reveal-box md:sticky md:top-32">
            <h3 className="hidden md:block text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--foreground)] to-transparent opacity-80">
              2026
            </h3>
            <div className="md:hidden flex items-center gap-3">
              <h3 className="text-3xl font-black text-[var(--foreground)]">
                2026
              </h3>
              <span className="font-mono text-[10px] px-3 py-1 rounded-full border border-[var(--border-color)] text-[var(--accent)] uppercase tracking-widest">
                Present
              </span>
            </div>
            <div className="hidden md:flex mt-2 justify-end gap-3 items-center">
              <span className="w-8 h-[1px] bg-[var(--accent)]"></span>
              <span className="font-mono text-sm text-[var(--accent)] uppercase tracking-widest">
                Present
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 md:pl-8 pl-10">
          <div className="reveal-box mb-10 md:mb-16 relative">
            <div className="absolute -left-6 md:-left-12 top-2 w-3 h-3 md:w-4 md:h-4 bg-[var(--accent)] rounded-full" />
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[var(--foreground)] leading-tight">
              Toruss — Creative Agency
            </h3>
            <h4 className="text-lg sm:text-xl md:text-2xl font-light text-[var(--foreground)] opacity-70 mt-2">
              Front End Developer
            </h4>
            <p className="text-sm sm:text-base md:text-lg opacity-60 mt-5 md:mt-6 leading-relaxed max-w-2xl">
              Engineering the future of web interfaces. Transforming raw designs
              into pixel-perfect, interactive, and scalable React applications
              within a high-velocity Agile environment.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h5 className="reveal-box font-mono text-xs uppercase tracking-widest opacity-40 mb-6 md:mb-8">
              {"// Deployed Modules"}
            </h5>

            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                className="reveal-box group relative p-1 bg-[var(--border-color)]/20 rounded-3xl"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative bg-[var(--card-bg)] p-6 sm:p-7 md:p-8 rounded-[22px] overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent)] transition-colors duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] opacity-5 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20" />

                  <div className="flex items-start gap-4 sm:gap-6 relative z-10">
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-mono text-xs p-2 border border-[var(--accent)] text-[var(--accent)] rounded-lg">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <h6 className="text-xl sm:text-2xl font-bold uppercase mb-2 group-hover:text-[var(--accent)] transition-colors">
                        {project.title}
                      </h6>
                      <p className="text-sm sm:text-base opacity-60 mb-4 leading-relaxed">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono opacity-50 uppercase bg-black/10 px-2 py-1 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
