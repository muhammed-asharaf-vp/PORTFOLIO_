"use client";

import { useEffectEvent, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const STORAGE_KEY = "preloader_done";

const alreadyPlayed = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const markPlayed = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // storage blocked (private mode etc.) — just replay next time
  }
};

// Block wheel/touch scrolling (including Lenis) while the overlay is up
const blockScroll = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export default function Preloader({ onFinish }) {
  const [show, setShow] = useState(true);
  const finish = useEffectEvent(() => onFinish?.());

  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  const mPathRef = useRef(null);
  const aPathRef = useRef(null);
  const mGlowRef = useRef(null);
  const aGlowRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Already seen this session (or reduced motion): skip before first paint
    if (alreadyPlayed() || reducedMotion) {
      containerRef.current.style.display = "none";
      finish();
      // unmount in a callback, not synchronously inside the effect
      const id = requestAnimationFrame(() => setShow(false));
      return () => cancelAnimationFrame(id);
    }

    const html = document.documentElement;
    const scrollOpts = { capture: true, passive: false };
    html.style.overflow = "hidden";
    window.addEventListener("wheel", blockScroll, scrollOpts);
    window.addEventListener("touchmove", blockScroll, scrollOpts);
    const unlockScroll = () => {
      html.style.overflow = "";
      window.removeEventListener("wheel", blockScroll, scrollOpts);
      window.removeEventListener("touchmove", blockScroll, scrollOpts);
    };

    const isMobile = window.innerWidth < 768;
    const strokePaths = [mPathRef.current, aPathRef.current];
    const glowPaths = [mGlowRef.current, aGlowRef.current];

    // ✅ Use the REAL length of each path instead of a hardcoded number.
    // This is what removes the little "snap" at the start of the draw-in,
    // since a mismatched dasharray causes the stroke to jump before it animates.
    const lengths = strokePaths.map((p) => p.getTotalLength());

    strokePaths.forEach((p, i) => {
      gsap.set(p, {
        strokeDasharray: lengths[i],
        strokeDashoffset: lengths[i],
        opacity: 1, // opacity is controlled by the draw itself now, not a separate fade
      });
    });
    glowPaths.forEach((p, i) => {
      gsap.set(p, {
        strokeDasharray: lengths[i],
        strokeDashoffset: lengths[i],
        opacity: 0,
      });
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        markPlayed(); // only after a full play, so a mid-animation reload replays it
        unlockScroll();
        setShow(false);
        finish(); // ✅ notify parent so Hero can reveal
      },
    });

    // Letters draw in
    tl.to(strokePaths, {
      strokeDashoffset: 0,
      duration: 1.3,
      ease: "power2.inOut",
      stagger: 0.15,
    });

    // Glow trails slightly behind the stroke, softer and smoother fade-in
    tl.to(
      glowPaths,
      {
        strokeDashoffset: 0,
        opacity: 0.35,
        duration: 1.3,
        ease: "power2.inOut",
        stagger: 0.15,
      },
      "<0.08",
    );

    // Progress bar now lives INSIDE the main timeline so it's always in sync
    // with everything else, instead of running on its own independent clock.
    tl.to(
      progressRef.current,
      { width: "100%", duration: 1.6, ease: "power1.inOut" },
      0,
    );

    if (!isMobile) {
      // Smoother pulse using a sine ease instead of an abrupt linear yoyo —
      // reads as a soft "breathe" rather than a flash.
      tl.to(
        svgRef.current,
        {
          filter: "drop-shadow(0 0 20px #D9F216)",
          duration: 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        },
        "-=0.3",
      );
    }

    // Scramble-reveal text — throttled so characters don't flicker faster
    // than the eye can read, and eased so it decelerates into the final word.
    const finalText = "MOHAMED ASHARAF";
    const chars = "!@#$%&*/";
    let lastFrame = -1;

    tl.to(
      {},
      {
        duration: 0.9,
        ease: "power1.out",
        onUpdate: function () {
          const p = this.progress();
          const frame = Math.floor(p * 24); // cap scramble updates to ~24 steps
          if (frame === lastFrame) return;
          lastFrame = frame;

          const reveal = Math.floor(p * finalText.length);
          let out = finalText.substring(0, reveal);
          for (let i = reveal; i < finalText.length; i++) {
            out += chars[(Math.random() * chars.length) | 0];
          }
          if (textRef.current) textRef.current.textContent = out;
        },
        onComplete: () => {
          if (textRef.current) textRef.current.textContent = finalText;
        },
      },
      "-=0.55",
    );

    // Smoother, slightly longer exit with an expo ease — feels like a
    // deliberate glide instead of a hard slide-out.
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "expo.inOut",
      delay: 0.2,
    });

    return () => {
      tl.kill();
      unlockScroll();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
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
              className="blur-[1px] md:blur-[3px]"
              style={{ opacity: 0 }}
            />
            <path
              ref={aGlowRef}
              d="M110 155 L145 55 L180 155 M125 120 H165"
              fill="none"
              stroke="#D9F216"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="blur-[1px] md:blur-[3px]"
              style={{ opacity: 0 }}
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
              style={{ opacity: 0 }}
            />
            <path
              ref={aPathRef}
              d="M110 155 L145 55 L180 155 M125 120 H165"
              fill="none"
              stroke="url(#metal-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0 }}
            />
          </g>
        </svg>
      </div>

      <div className="h-8 md:h-12 overflow-hidden flex items-center">
        <p
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
