"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export default function TextPressure({
  text,
  className = "",
  minFontSize = 48,
  textColor = "var(--foreground)",
  stroke = false,
  strokeColor = "var(--accent)",
}) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);

  const chars = text.split("");

  /* mouse tracking */
  useEffect(() => {
    const move = (e) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* resize */
  const setSize = useCallback(() => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    setFontSize(Math.max(width / (chars.length / 1.8), minFontSize));
  }, [chars.length, minFontSize]);

  useEffect(() => {
    const resize = debounce(setSize, 100);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [setSize]);

  /* animation */
  useEffect(() => {
    let raf;
    const animate = () => {
      mouse.current.x += (cursor.current.x - mouse.current.x) / 12;
      mouse.current.y += (cursor.current.y - mouse.current.y) / 12;

      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const maxDist = rect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const r = span.getBoundingClientRect();
          const center = { x: r.x + r.width / 2, y: r.y + r.height / 2 };
          const d = dist(mouse.current, center);

          const wght = Math.floor(getAttr(d, maxDist, 100, 900));
          const wdth = Math.floor(getAttr(d, maxDist, 75, 150));

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}`;
        });
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const styles = useMemo(
    () => (
      <style>{`
        @font-face {
          font-family: "Compressa";
          src: url("https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2");
        }

        .pressure span {
          display: inline-block;
        }

        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          -webkit-text-stroke: 2px ${strokeColor};
          color: transparent;
        }
      `}</style>
    ),
    [strokeColor]
  );

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      {styles}
      <h1
        ref={titleRef}
        className={`pressure ${stroke ? "stroke" : ""} ${className}`}
        style={{
          fontFamily: "Compressa",
          fontSize,
          textAlign: "center",
          whiteSpace: "nowrap",
          color: textColor,
          userSelect: "none",
        }}
      >
        {chars.map((c, i) => (
          <span
            key={i}
            ref={(el) => (spansRef.current[i] = el)}
            data-char={c}
            style={{ position: "relative" }}
          >
            {c}
          </span>
        ))}
      </h1>
    </div>
  );
}