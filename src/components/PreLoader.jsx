"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [show, setShow] = useState(true);
  
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  
  // Refs for animation targets
  const mPathRef = useRef(null);
  const aPathRef = useRef(null);
  const mGlowRef = useRef(null);
  const aGlowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
        onComplete: () => setShow(false)
    });

    // 1. Initial State
    gsap.set([mPathRef.current, aPathRef.current, mGlowRef.current, aGlowRef.current], {
        strokeDasharray: 600,
        strokeDashoffset: 600,
        opacity: 0
    });

    // 2. Animate: Draw the strokes
    tl.to([mPathRef.current, aPathRef.current], {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.2
    })
    // The "Glow" layer follows slightly behind
    .to([mGlowRef.current, aGlowRef.current], {
        strokeDashoffset: 0,
        opacity: 0.5, 
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.2
    }, "<0.1") 

    // 3. Impact Flash (Lime Green)
    .to(svgRef.current, {
        filter: "drop-shadow(0 0 25px #D9F216)", 
        duration: 0.3,
        yoyo: true,
        repeat: 1
    })

    // 4. Scramble Text Decode
    .to({}, {
        duration: 1.5,
        onUpdate: function() {
            const finalText = "MOHAMED ASHARAF";
            const chars = "!@#$%^&*{}/";
            const progress = this.progress();
            const revealIndex = Math.floor(progress * finalText.length);
            
            let scrambled = finalText.substring(0, revealIndex);
            for(let i = revealIndex; i < finalText.length; i++) {
                scrambled += chars[Math.floor(Math.random() * chars.length)];
            }
            if(textRef.current) textRef.current.innerText = scrambled;
        }
    }, "-=1.5")

    // 5. Exit: Slide Up
    .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        delay: 0.5
    });

    // Parallel: Progress Bar
    gsap.to(progressRef.current, {
        width: "100%",
        duration: 3,
        ease: "power2.inOut"
    });

    return () => tl.kill();
  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden p-5 select-none"
    >
        {/* BACKGROUND GRID */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
                 backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* --- LOGO CONTAINER (Responsive Sizing) --- */}
        {/* Changed from fixed w-64 to fluid width with max constraints */}
        <div className="relative w-[60vw] h-[60vw] max-w-[250px] max-h-[250px] md:max-w-[350px] md:max-h-[350px] mb-6 md:mb-10 aspect-square">
            <svg
                ref={svgRef}
                viewBox="0 0 200 200"
                className="w-full h-full overflow-visible"
                style={{ filter: "drop-shadow(0 0 5px rgba(217, 242, 22, 0.4))" }}
            >
                <defs>
                    <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#71717a" />
                        <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                </defs>

                {/* LAYER 1: Glow */}
                <g transform="translate(3, 3)">
                    <path
                        ref={mGlowRef}
                        d="M 20,100 L 20,40 Q 20,20 40,20 Q 60,20 60,40 L 60,100 Q 60,20 100,20 Q 140,20 140,100"
                        fill="none" stroke="#D9F216" strokeWidth="6" strokeLinecap="round"
                        className="opacity-50 blur-[3px]"
                    />
                    <path
                        ref={aGlowRef}
                        d="M 120,100 L 150,20 L 180,100 M 130,70 L 170,70"
                        fill="none" stroke="#D9F216" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                        className="opacity-50 blur-[3px]"
                    />
                </g>

                {/* LAYER 2: Solid */}
                <g>
                    <path
                        ref={mPathRef}
                        d="M 20,100 L 20,40 Q 20,20 40,20 Q 60,20 60,40 L 60,100 Q 60,20 100,20 Q 140,20 140,100"
                        fill="none" stroke="url(#metal-grad)" strokeWidth="4" strokeLinecap="round"
                    />
                    <path
                        ref={aPathRef}
                        d="M 120,100 L 150,20 L 180,100 M 130,70 L 170,70"
                        fill="none" stroke="url(#metal-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                    />
                </g>
                
                {/* Tech Dots */}
                <circle cx="20" cy="100" r="3" fill="#D9F216" className="animate-pulse" />
                <circle cx="140" cy="100" r="3" fill="#D9F216" className="animate-pulse" />
                <circle cx="180" cy="100" r="3" fill="#D9F216" className="animate-pulse" />
            </svg>
        </div>

        {/* --- SCRAMBLE TEXT --- */}
        <div className="h-8 md:h-12 overflow-hidden flex items-center">
            <h1 
                ref={textRef} 
                // Uses clamp to ensure text never gets too small or too big
                className="font-black font-mono tracking-tighter text-white text-center uppercase whitespace-nowrap"
                style={{ fontSize: "clamp(1.2rem, 4vw, 2.5rem)" }} 
            >
                {/* GSAP fills this */}
            </h1>
        </div>

        {/* Subtitle */}
        <p className="text-[#D9F216] font-mono tracking-[0.3em] md:tracking-[0.5em] mt-2 md:mt-4 uppercase text-[10px] md:text-xs text-center">
            Front End Developer
        </p>

        {/* --- LOADING LINE --- */}
        <div className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-zinc-900">
            <div 
                ref={progressRef}
                className="h-full bg-[#D9F216] w-0 shadow-[0_0_20px_#D9F216]"
            ></div>
        </div>
    </div>
  );
}