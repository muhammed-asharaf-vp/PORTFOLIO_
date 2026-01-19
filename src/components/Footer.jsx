import { FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-24 md:py-32 px-5 sm:px-8 flex flex-col items-center justify-center text-center bg-[var(--background)] border-t border-[var(--border-color)]"
    >
      <p className="font-mono text-[var(--accent)] mb-8 uppercase tracking-widest text-xs md:text-sm">
        Ready to Collaborate?
      </p>

      {/* ---------------- DESKTOP UI ---------------- */}
      <div className="hidden md:block">
        <a
          href="mailto:mohamedasharafvpp@gmail.com"
          className="cursor-dot-zone group relative inline-flex items-center gap-4"
        >
          <span className="text-[10vw] font-black uppercase leading-[0.8] tracking-tighter text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
            Let&apos;s Talk
          </span>

          <FiArrowUpRight
            className="
              text-[var(--accent)]
              text-6xl
              transition-all
              duration-300
              opacity-0
              translate-y-2
              group-hover:opacity-100
              group-hover:-translate-y-2
              group-hover:translate-x-2
            "
          />
        </a>

        <p className="mt-6 text-base opacity-60 max-w-xl font-light leading-relaxed">
          Available for freelance collaborations and full-time positions.
        </p>
      </div>

      {/* ---------------- MOBILE UI ---------------- */}
      <div className="block md:hidden w-full max-w-md">
        <h2 className="text-4xl font-black uppercase tracking-tight text-[var(--foreground)] leading-[1]">
          Let&apos;s Talk
        </h2>

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
          href="https://www.linkedin.com/in/mohamed-asharaf-vp-63790a36b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          label="LinkedIn"
        />
        <SocialLink
          href="https://github.com/muhammed-asharaf-vp"
          label="GitHub"
        />
        <SocialLink
          href="https://www.instagram.com/ashrrff._?utm_source=qr&igsh=bXN2MzUwNXljeHNp"
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
      className="
        cursor-dot-zone
        relative group
        hover:text-[var(--accent)]
        transition-colors
        px-5 py-3
        rounded-full
        border border-[var(--border-color)]
        md:border-none
        md:px-0 md:py-0
      "
    >
      {label}

      {/* underline only for desktop */}
      <span className="hidden md:block absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
    </a>
  );
}
