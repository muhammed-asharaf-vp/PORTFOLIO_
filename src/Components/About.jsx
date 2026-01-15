"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef();
  const specsRef = useRef();

  useGSAP(
    () => {
      // 1. Bio Text Animation (Left & Top Content)
      gsap.from(".about-bio", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. Technical Specs List Animation
      const rows = gsap.utils.toArray(".spec-row");

      rows.forEach((row, i) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 85%", // Triggers when each row is near bottom of viewport
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1, // Stagger effect
          ease: "power3.out",
        });

        // Animate the line width
        gsap.from(row.querySelector(".divider-line"), {
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.2,
          ease: "expo.out",
        });
      });
    },
    { scope: container }
  );

  const specs = [
    {
      label: "Core Stack",
      value: "C#, ASP.NET Core, Entity Framework Core, Dapper",
    },
    {
      label: "Frontend",
      value: "React.js, JavaScript, Tailwind CSS, Context API",
    },
    {
      label: "Data & Cloud",
      value: "MS SQL Server, Azure SQL, Stored Procedures",
    },
    {
      label: "DevOps",
      value: "Microsoft Azure, Git, GitHub, CI/CD",
    },
  ];
  return (
    <section
      ref={container}
      className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12">
        {/* --- LEFT COLUMN: STICKY HEADER --- */}
        <div className="md:col-span-3">
          <h2 className="about-bio text-xs font-mono text-[var(--accent)] uppercase tracking-[0.2em] sticky top-32 flex items-center gap-3">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
            ( 01 ) Profile
          </h2>
        </div>

        {/* --- RIGHT COLUMN: CONTENT --- */}
        <div className="md:col-span-9 flex flex-col gap-24">
          {/* 1. BIO */}
          <div>
            <h3 className="about-bio text-4xl md:text-7xl font-light leading-[1.1] text-[var(--foreground)] tracking-tighter mb-10">
              Full Stack Developer architecting{" "}
              <span className="text-[var(--accent)] font-normal">
                scalable systems
              </span>{" "}
              with precision.
            </h3>
            <div className="about-bio grid grid-cols-1 md:grid-cols-2 gap-8 text-lg md:text-xl font-light opacity-70 leading-relaxed">
              <p>
                [cite_start]Specializing in the Microsoft ecosystem, I build
                robust RESTful APIs using{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  ASP.NET Core
                </strong>{" "}
                and high-performance databases with{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  SQL Server
                </strong>
                [cite: 14].
              </p>
              <p>
                [cite_start]On the client side, I craft responsive, type-safe
                interfaces using{" "}
                <strong className="text-[var(--foreground)] font-normal">
                  React.js
                </strong>{" "}
                and modern CSS frameworks, ensuring a seamless user experience
                from database to pixel[cite: 15].
              </p>
            </div>
          </div>

          {/* 2. TECH SPECS LIST */}
          <div className="w-full" ref={specsRef}>
            <h4 className="about-bio font-mono text-xs uppercase tracking-widest opacity-40 mb-8">
              // Technical Specifications
            </h4>

            <div className="flex flex-col">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="spec-row group relative overflow-hidden"
                >
                  {/* Top Border Line */}
                  <div className="divider-line w-full h-[1px] bg-[var(--border-color)] group-hover:bg-[var(--accent)] transition-colors duration-500 origin-left"></div>

                  {/* Content */}
                  <div className="py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4 group-hover:pl-4 transition-all duration-300">
                    <span className="text-sm font-mono text-[var(--accent)] uppercase tracking-widest w-48 shrink-0">
                      {spec.label}
                    </span>
                    <span className="text-xl md:text-3xl font-light text-[var(--foreground)] tracking-tight">
                      {spec.value}
                    </span>
                  </div>
                </div>
              ))}
              {/* Bottom Border Line (Static) */}
              <div className="w-full h-[1px] bg-[var(--border-color)]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
