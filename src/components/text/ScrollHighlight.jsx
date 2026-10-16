"use client";

import { gsap, SplitText } from "@/lib/gsap";
import useTextAnimation from "./useTextAnimation";

/**
 * Words start dim and light up one by one, scrubbed to the scroll position.
 */
export default function ScrollHighlight({
  as: Tag = "p",
  dim = 0.15,
  className,
  children,
  ...rest
}) {
  const ref = useTextAnimation((el) => {
    SplitText.create(el, {
      type: "words",
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: dim },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 0.8,
            },
          },
        ),
    });
  });

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
