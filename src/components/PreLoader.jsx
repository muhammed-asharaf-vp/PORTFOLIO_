"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [show, setShow] = useState(false);

  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  const mPathRef = useRef(null);
  const aPathRef = useRef(null);
  const mGlowRef = useRef(null);
  const aGlowRef = useRef(null);

  useEffect(() => {
    // ✅ show only once per session
    const already = sessionStorage.getItem("preloader_done");
    if (already) return;

    sessionStorage.setItem("preloader_done", "true");
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;

    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline({
      onComplete: () => setShow(false),
    });

    gsap.set(
      [mPathRef.current, aPathRef.current, mGlowRef.current, aGlowRef.current],
      {
        strokeDasharray: 800,
        strokeDashoffset: 800,
        opacity: 0,
      },
    );

    tl.to([mPathRef.current, aPathRef.current], {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.12,
    }).to(
      [mGlowRef.current, aGlowRef.current],
      {
        strokeDashoffset: 0,
        opacity: 0.4,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.12,
      },
      "<0.05",
    );

    if (!isMobile) {
      tl.to(svgRef.current, {
        filter: "drop-shadow(0 0 18px #D9F216)",
        duration: 0.25,
        yoyo: true,
        repeat: 1,
      });
    }

    tl.to(
      {},
      {
        duration: 0.8,
        onUpdate: function () {
          const finalText = "MOHAMED ASHARAF";
          const chars = "!@#$%&*/";
          const p = this.progress();
          const reveal = Math.floor(p * finalText.length);

          let out = finalText.substring(0, reveal);
          for (let i = reveal; i < finalText.length; i++) {
            out += chars[(Math.random() * chars.length) | 0];
          }
          if (textRef.current) textRef.current.innerText = out;
        },
      },
      "-=0.6",
    ).to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
      delay: 0.15,
    });

    gsap.to(progressRef.current, {
      width: "100%",
      duration: 1.7,
      ease: "power2.out",
    });

    return () => tl.kill();
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden p-5 select-none"
    >
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-[60vw] h-[60vw] max-w-[220px] max-h-[220px] md:max-w-[320px] md:max-h-[320px] mb-6 md:mb-10 aspect-square">
        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          className="w-full h-full overflow-visible"
          style={{ filter: "drop-shadow(0 0 4px rgba(217, 242, 22, 0.35))" }}
        >
          <defs>
            <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#71717a" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          <g transform="translate(3, 3)">
            <path
              ref={mGlowRef}
              d="M30 155 V55 L70 120 L110 55 V155"
              fill="none"
              stroke="#D9F216"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40 blur-[1px] md:blur-[3px]"
            />
            <path
              ref={aGlowRef}
              d="M110 155 L145 55 L180 155 M125 120 H165"
              fill="none"
              stroke="#D9F216"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40 blur-[1px] md:blur-[3px]"
            />
          </g>

          <g>
            <path
              ref={mPathRef}
              d="M30 155 V55 L70 120 L110 55 V155"
              fill="none"
              stroke="url(#metal-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              ref={aPathRef}
              d="M110 155 L145 55 L180 155 M125 120 H165"
              fill="none"
              stroke="url(#metal-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      <div className="h-8 md:h-12 overflow-hidden flex items-center">
        <h1
          ref={textRef}
          className="font-black font-mono tracking-tighter text-white text-center uppercase whitespace-nowrap"
          style={{ fontSize: "clamp(1.1rem, 4vw, 2.3rem)" }}
        />
      </div>

      <p className="text-[#D9F216] font-mono tracking-[0.3em] md:tracking-[0.5em] mt-2 md:mt-4 uppercase text-[10px] md:text-xs text-center opacity-90">
        Front End Developer
      </p>

      <div className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-zinc-900">
        <div ref={progressRef} className="h-full bg-[#D9F216] w-0" />
      </div>
    </div>
  );
}
