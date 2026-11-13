"use client";

import { useEffectEvent, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

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

// Shape geometry inside a 160 x 160 viewBox: a 118px square centred at 80,80
const BOX = 118;
const X0 = 21;
const R_SQUARE = 8;
const R_CIRCLE = BOX / 2;

export default function Preloader({ onFinish }) {
  const [show, setShow] = useState(true);
  const finish = useEffectEvent(() => onFinish?.());

  const containerRef = useRef(null);
  const wrapRef = useRef(null);
  const clipRectRef = useRef(null);
  const outlineRef = useRef(null);
  const fillRef = useRef(null);
  const counterRef = useRef(null);
  const labelRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = prefersReducedMotion();

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

    const rects = [clipRectRef.current, outlineRef.current];
    const fill = fillRef.current;
    const counter = counterRef.current;
    const state = { p: 0 };

    // Both rects spin around the centre of the viewBox; the fill level stays horizontal
    gsap.set(rects, { svgOrigin: "80 80", rotation: 0 });
    gsap.set(wrapRef.current, { scale: 0, transformOrigin: "50% 50%" });
    gsap.set([counterRef.current, labelRef.current], { autoAlpha: 0 });
    fill.setAttribute("y", String(X0 + BOX));

    const render = () => {
      fill.setAttribute("y", String(X0 + BOX * (1 - state.p)));
      counter.textContent = String(Math.round(state.p * 100)).padStart(3, "0");
    };
    render();

    const tl = gsap.timeline({
      onComplete: () => {
        markPlayed(); // only after a full play, so a mid-animation reload replays it
        unlockScroll();
        setShow(false);
        finish(); // notify parent so Hero can reveal
      },
    });

    // Intro: shape pops in, labels fade up
    tl.to(wrapRef.current, { scale: 1, duration: 0.7, ease: "expo.out" }, 0);
    tl.to([counterRef.current, labelRef.current], { autoAlpha: 1, duration: 0.6, ease: "power2.out", stagger: 0.12 }, 0.3);

    // Progress: fill rises + counter counts, all on one clock
    tl.to(state, { p: 1, duration: 2.5, ease: "power2.inOut", onUpdate: render }, 0.2);

    // Morph: square -> circle -> square, with a half turn
    tl.to(rects, { attr: { rx: R_CIRCLE }, duration: 1.25, ease: "sine.inOut" }, 0.2);
    tl.to(rects, { attr: { rx: R_SQUARE }, duration: 1.25, ease: "sine.inOut" }, 1.45);
    tl.to(rects, { rotation: -180, duration: 2.5, ease: "power2.inOut" }, 0.2);

    // Exit: labels + outline fade, the blue shape grows to fill the screen, then lifts away
    tl.to([counterRef.current, labelRef.current], { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 2.9);
    tl.to(outlineRef.current, { opacity: 0, duration: 0.25 }, 2.9);
    tl.to(wrapRef.current, { scale: 18, duration: 0.85, ease: "expo.inOut" }, 3.0);
    tl.to(containerRef.current, { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, ">-0.05");

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
      data-preloader
      className="fixed inset-0 z-[9999] bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center overflow-hidden p-5 select-none"
    >
      <div
        ref={wrapRef}
        className="w-[clamp(96px,26vw,150px)] aspect-square will-change-transform"
      >
        <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
          <defs>
            <clipPath id="preloader-shape">
              <rect
                ref={clipRectRef}
                x={X0}
                y={X0}
                width={BOX}
                height={BOX}
                rx={R_SQUARE}
              />
            </clipPath>
          </defs>
          <rect
            ref={fillRef}
            x="0"
            y={X0 + BOX}
            width="160"
            height="160"
            fill="var(--accent)"
            clipPath="url(#preloader-shape)"
          />
          <rect
            ref={outlineRef}
            x={X0}
            y={X0}
            width={BOX}
            height={BOX}
            rx={R_SQUARE}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="3"
          />
        </svg>
      </div>

      <p
        ref={counterRef}
        className="font-mono text-sm md:text-base tracking-[0.2em] mt-8 tabular-nums"
      >
        000
      </p>

      <p
        ref={labelRef}
        className="font-mono uppercase text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] mt-4 text-center opacity-60"
      >
        Full Stack Developer
      </p>
    </div>
  );
}
