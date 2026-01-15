"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const container = useRef();

  useGSAP(
    () => {
      // 1. Line Drawing Animation (SCROLL SCRUBBED)
      // This makes the line grow as you scroll down
      gsap.fromTo(".timeline-line", 
        { scaleY: 0 }, 
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%", // Starts drawing when section is in middle of screen
            end: "bottom 80%", // Finishes drawing near the end of the section
            scrub: 1.5, // Smooth scrubbing (1.5s lag for butter feel)
          }
        }
      );

      // 2. Content Fade In (Staggered Entry)
      gsap.from(".exp-content", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="experience"
      className="py-24 md:py-32 px-6 md:px-12 max-w-[1800px] mx-auto border-b border-[var(--border-color)]"
    >
      {/* --- SECTION HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20">
        <h2 className="text-sm font-mono text-[var(--accent)] uppercase tracking-widest mb-4 md:mb-0">
          ( 02 ) Professional History
        </h2>
        <div className="hidden md:flex items-center gap-4 text-xs font-mono uppercase tracking-widest opacity-60">
          <span>Career Timeline</span>
        </div>
      </div>

      {/* --- TIMELINE LAYOUT --- */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Timeline Line (Visual Connector) */}
        <div className="hidden md:block absolute left-[25%] top-0 bottom-0 w-[1px] bg-[var(--border-color)]">
          {/* This is the yellow line that fills on scroll */}
          <div className="timeline-line absolute top-0 left-0 w-full h-full bg-[var(--accent)] origin-top"></div>
        </div>

        {/* --- LEFT COL: DATES & META --- */}
        <div className="md:col-span-3 md:text-right py-2">
          <h3 className="exp-content text-2xl font-black uppercase text-[var(--foreground)]">
            2025
          </h3>
          <span className="exp-content font-mono text-sm opacity-60 uppercase tracking-widest block mt-1">
            Apr — Present
          </span>
          <div className="exp-content mt-4 inline-block px-3 py-1 border border-[var(--accent)] rounded-full text-[10px] font-bold uppercase text-[var(--accent)]">
            Internship
          </div>
        </div>

        {/* --- RIGHT COL: ROLE & DETAILS --- */}
        <div className="md:col-span-9 md:pl-12">
          {/* Header */}
          <div className="mb-12">
            <h3 className="exp-content text-5xl md:text-7xl font-black uppercase text-[var(--foreground)] tracking-tighter mb-2">
              Bridgeon
            </h3>
            <h4 className="exp-content text-xl md:text-2xl font-light text-[var(--foreground)] opacity-80">
              Full Stack Developer Intern
            </h4>
          </div>

          {/* Description */}
          <p className="exp-content text-lg md:text-xl font-light leading-relaxed opacity-70 mb-12 max-w-3xl">
            Operating within an Agile development team, I architect scalable
            backend solutions using the .NET ecosystem. My daily workflow
            involves translating complex business requirements into optimized
            SQL queries and robust API endpoints. Beyond coding, I actively
            participate in code reviews, manage CI/CD pipelines via GitHub
            Actions, and ensure seamless integration between our ASP.NET Core
            microservices and React frontends.
          </p>

          {/* --- KEY DELIVERABLES (The 3 Projects as Tasks) --- */}
          <div className="exp-content">
            <h5 className="font-mono text-xs uppercase tracking-widest opacity-50 mb-8 border-b border-[var(--border-color)] pb-4">
              // Key Deliverables & Modules
            </h5>

            <div className="space-y-8">
              {/* Deliverable 1: Smart Serve */}
              <div className="group flex flex-col md:flex-row gap-6 hover:bg-[var(--card-bg)] p-6 -mx-6 rounded-2xl transition-colors duration-300">
                <div className="w-12 h-12 flex items-center justify-center border border-[var(--border-color)] rounded-full text-[var(--accent)] font-bold shrink-0">
                  01
                </div>
                <div>
                  <h6 className="text-xl font-bold uppercase mb-2 group-hover:text-[var(--accent)] transition-colors">
                    Smart Serve ERP
                  </h6>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed mb-3">
                    Built a comprehensive Vehicle Service Management System.
                    Streamlined operations by digitizing job cards and inventory
                    tracking, resulting in a 40% reduction in manual processing
                    time.
                  </p>
                  <div className="flex gap-3 text-xs font-mono opacity-50 uppercase">
                    <span>ASP.NET Core</span> <span>/</span> <span>Dapper</span>{" "}
                    <span>/</span> <span>React</span>
                  </div>
                </div>
              </div>

              {/* Deliverable 2: Smart Desk */}
              <div className="group flex flex-col md:flex-row gap-6 hover:bg-[var(--card-bg)] p-6 -mx-6 rounded-2xl transition-colors duration-300">
                <div className="w-12 h-12 flex items-center justify-center border border-[var(--border-color)] rounded-full text-[var(--accent)] font-bold shrink-0">
                  02
                </div>
                <div>
                  <h6 className="text-xl font-bold uppercase mb-2 group-hover:text-[var(--accent)] transition-colors">
                    Smart Desk System
                  </h6>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed mb-3">
                    Co-developed a SaaS-ready office system. Engineered the
                    multi-tenant architecture with strict Role-Based Access
                    Control (RBAC) to securely manage data across 5+ distinct
                    office environments.
                  </p>
                  <div className="flex gap-3 text-xs font-mono opacity-50 uppercase">
                    <span>EF Core</span> <span>/</span> <span>SQL Server</span>{" "}
                    <span>/</span> <span>Redux</span>
                  </div>
                </div>
              </div>

              {/* Deliverable 3: ShoeCart */}
              <div className="group flex flex-col md:flex-row gap-6 hover:bg-[var(--card-bg)] p-6 -mx-6 rounded-2xl transition-colors duration-300">
                <div className="w-12 h-12 flex items-center justify-center border border-[var(--border-color)] rounded-full text-[var(--accent)] font-bold shrink-0">
                  03
                </div>
                <div>
                  <h6 className="text-xl font-bold uppercase mb-2 group-hover:text-[var(--accent)] transition-colors">
                    ShoeCart E-Commerce
                  </h6>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed mb-3">
                    Developed a high-performance shopping platform. Focused on
                    state management efficiency using Redux for real-time cart
                    updates and implemented secure JWT authentication for user
                    sessions.
                  </p>
                  <div className="flex gap-3 text-xs font-mono opacity-50 uppercase">
                    <span>Web API</span> <span>/</span>{" "}
                    <span>Authentication</span> <span>/</span>{" "}
                    <span>React</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}