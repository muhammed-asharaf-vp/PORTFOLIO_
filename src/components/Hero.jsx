"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".hero-char", {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    }).from(".hero-pill", { 
      opacity: 0, 
      scale: 0.8, 
      stagger: 0.1, 
      ease: "back.out(1.7)" 
    }, "-=0.5");
  }, { scope: container });

  return (
    <section ref={container} className="h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
      <p className="text-[var(--accent)] font-mono mb-4 tracking-widest uppercase">Front End Developer</p>
      
      <div className="overflow-hidden">
        <h1 className="text-[14vw] leading-[0.8] font-black uppercase tracking-tighter text-[var(--foreground)]">
          {Array.from("MOHAMED").map((char, i) => (
            <span key={i} className="hero-char inline-block">{char}</span>
          ))}
        </h1>
      </div>
      
      <div className="overflow-hidden">
        <h1 className="text-[14vw] leading-[0.8] font-black uppercase tracking-tighter text-[var(--foreground)] ml-[5vw]">
          {Array.from("ASHARAF").map((char, i) => (
            <span key={i} className="hero-char inline-block">{char}</span>
          ))}
          <span className="hero-char inline-block text-[var(--accent)]">.</span>
        </h1>
      </div>

      <div className="flex flex-wrap gap-3 mt-12">
        {/* Updated skills based on Resume [cite: 14, 15, 16, 17] */}
        {['React.js', 'Gsap', 'Three.Js','TailWind CSS', 'BootStrap','TypeScript','Next.Js'].map((tech) => (
          <span key={tech} className="hero-pill px-6 py-3 border border-[var(--border-color)] rounded-full text-sm font-bold uppercase hover:text-[#000000] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-default">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
