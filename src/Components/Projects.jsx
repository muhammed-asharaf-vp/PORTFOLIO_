"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const container = useRef();
  const scrollContainer = useRef();

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop: Horizontal Scroll
    mm.add("(min-width: 1024px)", () => {
      const scrollWidth = scrollContainer.current.scrollWidth;
      const windowWidth = window.innerWidth;

      gsap.to(scrollContainer.current, {
        x: () => -(scrollWidth - windowWidth),
        ease: "none",
        force3D: true, // <--- Forces GPU Acceleration (Fixes lag)
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1, // Reduced slightly for tighter response
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
  }, { scope: container });

  const projects = [
    {
      id: "01",
      title: "Smart Serve",
      category: "Vehicle ERP System",
      pitch: "A complete solution for Service Centers. Digitized job cards and inventory tracking, reducing manual processing time by 40%.",
      stack: ["ASP.NET Core", "React", "Dapper", "SQL"],
      theme: "light"
    },
    {
      id: "02",
      title: "Smart Desk",
      category: "Office Management",
      pitch: "SaaS-ready architecture. Manages 5+ office environments with strict Role-Based Access Control (RBAC) and subscription logic.",
      stack: ["EF Core", "Redux", "Azure", "Clean Arch"],
      theme: "dark"
    },
    {
      id: "03",
      title: "ShoeCart",
      category: "E-Commerce Platform",
      pitch: "High-performance shopping experience. Features real-time cart synchronization, dynamic filtering, and secure JWT authentication.",
      stack: ["Web API", "React", "Auth", "SQL"],
      theme: "light"
    }
  ];

  return (
    <section 
      ref={container} 
      id="projects" 
      className="relative bg-[var(--background)] lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row lg:items-center border-t border-[var(--border-color)]"
    >
      
      {/* Background Grid (Optimized with simpler mask for performance) */}
      <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }}>
      </div>

      {/* PERFORMANCE FIX: 
         Added 'will-change-transform' to hint browser about movement.
      */}
      <div 
        ref={scrollContainer} 
        className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 px-6 lg:px-24 items-center h-full py-20 lg:py-0 will-change-transform"
      >
        
        {/* --- 1. INTRO CARD --- */}
        <div className="w-full lg:w-[35vw] shrink-0 flex flex-col justify-center z-10">
          <div className="mb-6 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-[var(--accent)]"></span>
            <span className="font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
              Work Archive 2025
            </span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-[var(--foreground)] leading-[0.8] tracking-tighter uppercase">
            Selected<br/>
            <span className="text-transparent text-stroke-foreground">Works</span>
          </h2>
          <p className="mt-8 text-xl opacity-60 max-w-md font-light leading-relaxed">
            Engineering scalable backends & interactive frontends using Clean Architecture.
          </p>
        </div>

        {/* --- 2. PROJECTS LOOP --- */}
        {projects.map((project) => (
            <div key={project.id} className="w-[90vw] lg:w-[55vw] h-[60vh] lg:h-[70vh] relative group shrink-0">
                
                {/* CARD CONTAINER */}
                <div className={`
                    absolute inset-0 border flex flex-col justify-between overflow-hidden shadow-2xl p-8 md:p-12 transition-colors duration-500
                    ${project.theme === 'dark' 
                        ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]' 
                        : 'bg-[var(--card-bg)] border-[var(--border-color)] hover:border-[var(--accent)]'
                    }
                `}>
                    
                    {/* Background Index Number */}
                    <span className={`
                        absolute -bottom-10 -right-10 text-[30vh] lg:text-[40vh] font-black leading-none select-none pointer-events-none transition-opacity
                        ${project.theme === 'dark' ? 'text-[var(--background)] opacity-[0.05]' : 'text-[var(--foreground)] opacity-[0.03] group-hover:opacity-[0.05]'}
                    `}>
                        {project.id}
                    </span>
                    
                    {/* Header */}
                    <div className="flex justify-between items-start z-10">
                        <div>
                            <span className={`font-mono text-xs tracking-widest uppercase mb-3 block ${project.theme === 'dark' ? 'text-[var(--accent)]' : 'text-[var(--accent)]'}`}>
                                {project.category}
                            </span>
                            <h3 className={`text-5xl md:text-7xl font-black uppercase leading-[0.9] ${project.theme === 'dark' ? '' : 'text-[var(--foreground)]'}`}>
                                {project.title.split(" ").map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h3>
                        </div>
                        <div className={`
                            p-4 rounded-full border transition-all cursor-pointer
                            ${project.theme === 'dark' 
                                ? 'border-[var(--background)] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black' 
                                : 'border-[var(--foreground)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-black'
                            }
                        `}>
                            <FiArrowUpRight className="text-3xl" />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="z-10">
                        <p className="text-lg md:text-xl opacity-80 mb-10 border-l-2 border-[var(--accent)] pl-6 max-w-lg font-light leading-relaxed">
                            {project.pitch}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {project.stack.map(tag => (
                                <span key={tag} className={`
                                    px-4 py-2 text-xs font-bold uppercase border transition-colors cursor-default
                                    ${project.theme === 'dark'
                                        ? 'border-[var(--background)]/30 hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                                        : 'border-[var(--foreground)]/20 hover:bg-[var(--foreground)] hover:text-[var(--background)]'
                                    }
                                `}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ))}

        {/* --- 3. CTA CARD --- */}
        <div className="w-full lg:w-[40vw] flex flex-col items-center justify-center shrink-0 z-10 gap-8 py-20 lg:py-0">
             <div className="w-full h-[1px] bg-[var(--foreground)] opacity-20"></div>
             <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--foreground)]">Have a concept?</p>
             <a href="mailto:rinshadcontacts@gmail.com" className="text-7xl md:text-9xl font-black uppercase text-[var(--foreground)] hover:text-transparent hover:text-stroke-accent transition-all duration-300 cursor-pointer">
               Hire Me
             </a>
        </div>

      </div>
    </section>
  );
}