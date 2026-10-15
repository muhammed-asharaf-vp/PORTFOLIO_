"use client";
import { useTheme } from "next-themes";
import { useState, useRef } from "react";
import { FiSun, FiMoon, FiDownload, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export default function Navbar({ ready = true }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Intro slide-in, played once the preloader has left the screen
  useGSAP(() => {
    if (!ready) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 },
    );
  }, [ready]);

  useGSAP(() => {
    gsap.to(
      mobileMenuRef.current,
      isMobileMenuOpen
        ? {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            display: "block",
          }
        : {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
            display: "none",
          },
    );
  }, [isMobileMenuOpen]);

  const handleScroll = (e, href) => {
    e.preventDefault();
    setActiveTab(href);
    setIsMobileMenuOpen(false);

    // Home top
    if (href === "/") {
      if (window.lenis) window.lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Scroll to section
    const target = document.querySelector(href);
    if (!target) return;

    // If using Lenis
    if (window.lenis) {
      window.lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-4 md:top-6 left-0 w-full z-50 flex flex-col items-center px-4"
    >
      <div className="relative z-50 flex items-center justify-between w-full max-w-sm md:max-w-xl p-1.5 pl-4 md:pl-5 bg-[var(--background)]/80 backdrop-blur-xl border border-[var(--border-color)] rounded-full shadow-2xl ring-1 ring-[var(--foreground)]/5">
        {/* LOGO */}
        <Link
          href="/"
          onClick={(e) => handleScroll(e, "/")}
          className="cursor-dot-zone group relative h-6 overflow-hidden flex flex-col items-start justify-start cursor-pointer mr-auto"
        >
          <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
            <span className="h-6 flex items-center font-black tracking-tighter uppercase text-base md:text-lg leading-none">
              ASHARAF<span className="text-[var(--accent)]">.</span>
            </span>
            <span className="h-6 flex items-center font-black tracking-tighter uppercase text-base md:text-lg leading-none text-[var(--accent)]">
              ASHARAF<span className="text-[var(--foreground)]">.</span>
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-1 mx-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className={`cursor-dot-zone relative px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-full transition-all duration-300 ${
                activeTab === link.href
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block w-[1px] h-5 bg-[var(--border-color)] mx-2 opacity-50"></div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* RESUME */}
          <a
            href="/asharaf.cv.pdf"
            download="Mohamed_Asharaf_Resume.pdf"
            className="cursor-dot-zone group flex items-center gap-2 px-3 py-2 md:py-2 text-xs font-bold uppercase rounded-full transition-all border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black active:scale-95"
          >
            <span className="hidden sm:inline">Resume</span>
            <span className="hidden min-[360px]:inline sm:hidden">CV</span>
            <FiDownload
              aria-hidden="true"
              className="pointer-events-none text-sm group-hover:translate-y-0.5 transition-transform"
            />
            <span className="sr-only min-[360px]:hidden">Resume</span>
          </a>

          {/* THEME — both icons rendered, CSS picks one, so no hydration mismatch */}
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="cursor-dot-zone relative z-50 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[var(--card-bg)] hover:bg-[var(--foreground)] hover:text-[var(--background)] border border-[var(--border-color)] transition-all duration-300 active:rotate-90"
            aria-label="Toggle Theme"
          >
            <span className="pointer-events-none flex items-center justify-center">
              <FiSun size={15} className="hidden dark:block" />
              <FiMoon size={15} className="dark:hidden" />
            </span>
          </button>

          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="cursor-dot-zone md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] transition-all active:scale-90"
            aria-label="Menu"
          >
            <span className="pointer-events-none flex items-center justify-center">
              {isMobileMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="w-full max-w-sm overflow-hidden opacity-0 h-0 hidden md:hidden mt-2"
      >
        <div className="bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] rounded-2xl p-2 flex flex-col gap-1 shadow-xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className={`cursor-dot-zone w-full px-4 py-3 text-sm font-bold uppercase tracking-wide rounded-xl transition-all flex justify-between items-center group ${
                activeTab === link.href
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
              }`}
            >
              {link.name}
              <span className="pointer-events-none opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
