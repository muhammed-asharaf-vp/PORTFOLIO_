"use client";

import { TextPlugin } from "gsap/TextPlugin";
import { gsap } from "@/lib/gsap";
import useTextAnimation from "./useTextAnimation";

// Registered here (not in lib/gsap) so it only ships with the lazily loaded game
gsap.registerPlugin(TextPlugin);

/**
 * Typewriter: types its (plain-text) children out with a blinking caret on scroll.
 */
export default function TypeIn({
  as: Tag = "p",
  speed = 0.035,
  className,
  children,
}) {
  const ref = useTextAnimation((el) => {
    const text = el.firstElementChild;
    gsap.from(text, {
      text: { value: "" },
      duration: text.textContent.length * speed,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  return (
    <Tag ref={ref} className={className} aria-label={String(children)}>
      <span aria-hidden="true">{children}</span>
      <span aria-hidden="true" className="type-caret">
        _
      </span>
    </Tag>
  );
}
