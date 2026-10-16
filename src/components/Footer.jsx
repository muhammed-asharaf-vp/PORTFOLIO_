import { FiArrowUpRight } from "react-icons/fi";
import SplitReveal from "@/components/text/SplitReveal";
import ScrambleIn from "@/components/text/ScrambleIn";
import RollText from "@/components/text/RollText";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-24 md:py-32 px-5 sm:px-8 flex flex-col items-center justify-center text-center bg-[var(--background)] border-t border-[var(--border-color)]"
    >
      <p className="font-mono text-[var(--accent)] mb-8 uppercase tracking-widest text-xs md:text-sm">
        <ScrambleIn>Ready to Collaborate?</ScrambleIn>
      </p>

      {/* ---------------- DESKTOP UI ---------------- */}
      <div className="hidden md:block">
        <a
          href="mailto:mohamedasharafvpp@gmail.com"
          className="cursor-dot-zone group relative inline-flex items-center gap-4"
        >
          <SplitReveal
            as="span"
            type="chars"
            effect="tilt"
            scrub
            start="top 95%"
            stagger={0.05}
            className="font-display text-[7vw] font-black uppercase leading-[0.9] tracking-tighter text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]"
          >
            Let&apos;s Talk
          </SplitReveal>

          <FiArrowUpRight
            aria-hidden="true"
            className=" text-[var(--accent)] text-6xl transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:translate-x-2 "
          />
        </a>

        <p className="mt-6 text-base opacity-60 max-w-xl font-light leading-relaxed">
          Available for freelance collaborations and full-time positions.
        </p>
      </div>

      {/* ---------------- MOBILE UI ---------------- */}
      <div className="block md:hidden w-full max-w-md">
        <SplitReveal
          as="h2"
          type="chars"
          effect="tilt"
          stagger={0.04}
          className="font-display text-3xl font-black uppercase tracking-tight text-[var(--foreground)] leading-[1]"
        >
          Let&apos;s Talk
        </SplitReveal>

        <p className="mt-3 text-sm opacity-70 font-light leading-relaxed">
          Available for freelance collaborations and full-time positions.
        </p>

        <a
          href="mailto:mohamedasharafvpp@gmail.com"
          className="cursor-dot-zone mt-6 inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-[var(--accent)] text-black font-bold uppercase tracking-widest active:scale-95 transition"
        >
          Contact Me <FiArrowUpRight className="text-xl" />
        </a>
      </div>

      {/* ---------------- SOCIAL LINKS ---------------- */}
      <div className="mt-14 md:mt-20 flex flex-wrap justify-center gap-4 md:gap-16 text-xs md:text-sm font-bold uppercase tracking-widest">
        <SocialLink
          href="https://www.linkedin.com/in/mohamed-asharaf-vp-63790a36b/"
          label="LinkedIn"
        />
        <SocialLink
          href="https://github.com/muhammed-asharaf-vp"
          label="GitHub"
        />
        <SocialLink
          href="https://www.instagram.com/ashrrff._"
          label="Instagram"
        />
      </div>

      <div className="mt-12 md:mt-16 text-[10px] md:text-xs opacity-40 font-mono">
        © 2026 Mohamed Asharaf — Next.js • GSAP • Tailwind CSS
      </div>
    </footer>
  );
}

/* ---------------- COMPONENT ---------------- */

function SocialLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className=" cursor-dot-zone relative group hover:text-[var(--accent)] transition-colors px-5 py-3 rounded-full border border-[var(--border-color)] md:border-none md:px-0 md:py-0 "
    >
      <RollText>{label}</RollText>

      {/* underline only for desktop */}
      <span className="hidden md:block absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
    </a>
  );
}
