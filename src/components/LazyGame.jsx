"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Client-only chunk: not part of the initial page load at all
const TypingGame = dynamic(() => import("@/components/Game"), { ssr: false });

/**
 * Keeps the typing game out of the initial page load. It mounts when it comes
 * within ~800px of the viewport, or once the browser is idle after load, so it's
 * ready before anyone reaches it. Until then a placeholder of roughly the game's
 * height holds its place, so the layout below doesn't jump (it happens off-screen).
 */
export default function LazyGame() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && show(),
      { rootMargin: "800px 0px" },
    );
    observer.observe(ref.current);

    // Safari has no requestIdleCallback
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(show, { timeout: 5000 })
      : window.setTimeout(show, 3000);

    return () => {
      observer.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={visible ? undefined : "min-h-[790px] md:min-h-[710px]"}
    >
      {visible && <TypingGame />}
    </div>
  );
}
