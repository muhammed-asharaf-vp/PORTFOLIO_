import { FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-32 flex flex-col items-center justify-center text-center bg-[var(--background)] border-t border-[var(--border-color)]"
    >
      <p className="font-mono text-[var(--accent)] mb-8 uppercase tracking-widest text-sm">
        Ready to Collaborate?
      </p>

      {/* Arrow + Text */}
      <a
        href="mailto:rinshadcontacts@gmail.com"
        className="group relative inline-flex items-center gap-4 cursor-pointer"
      >
        <span className="text-[12vw] font-black uppercase leading-[0.8] tracking-tighter text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
          Let&apos;s Talk
        </span>

        <FiArrowUpRight
          className="
            text-[var(--accent)]
            text-5xl
            md:text-6xl
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

      <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-bold uppercase tracking-widest">
        <a
          href="https://www.linkedin.com/in/rinsh4dd"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] transition-colors relative group"
        >
          LinkedIn
          <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
        </a>
        <a
          href="https://github.com/rinsh4dd"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] transition-colors relative group"
        >
          GitHub
          <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
        </a>
        <a
          href="https://instagram.com/rinsh4dd"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] transition-colors relative group"
        >
          Instagram
          <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
        </a>
      </div>

      <div className="mt-16 text-xs opacity-40 font-mono">
        © 2026 Mohammed Rinshad. Built with Next.js &amp; GSAP.
      </div>
    </footer>
  );
}
