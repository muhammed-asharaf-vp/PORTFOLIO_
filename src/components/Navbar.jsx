"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FiSun, FiMoon, FiDownload, FiLoader, FiMenu, FiX } from "react-icons/fi"; 
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Menu State

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // --- GSAP ANIMATIONS ---
  useGSAP(() => {
    // 1. Initial Drop-in
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    );
  }, []);

  // 2. Mobile Menu Animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        display: "block"
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        display: "none"
      });
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setActiveTab(href);
    setIsMobileMenuOpen(false); // Close menu on click

    if (window.lenis) {
      window.lenis.scrollTo(href === "/" ? 0 : href, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      if (href === "/") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    if (isDownloading) return;
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/asharaf.cv.pdf"; 
      link.download = "Mohamed_Asharaf_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-4 md:top-6 left-0 w-full z-50 flex flex-col items-center px-4"
      >
        {/* --- MAIN NAVBAR PILL --- */}
        <div className="relative z-50 flex items-center justify-between w-full max-w-sm md:max-w-xl p-1.5 pl-4 md:pl-5 bg-[var(--background)]/80 backdrop-blur-xl border border-[var(--border-color)] rounded-full shadow-2xl ring-1 ring-[var(--foreground)]/5">
          
          {/* 1. LOGO */}
          <Link
            href="/"
            onClick={(e) => handleScroll(e, "/")}
            className="group relative h-6 overflow-hidden flex flex-col items-start justify-start cursor-pointer mr-auto"
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

          {/* 2. DESKTOP TABS (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-1 mx-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`
                  relative px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-full transition-all duration-300
                  ${
                    activeTab === link.href
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block w-[1px] h-5 bg-[var(--border-color)] mx-2 opacity-50"></div>

          {/* 3. RIGHT ACTIONS */}
          <div className="flex items-center gap-1.5 md:gap-2">
            
            {/* RESUME BUTTON (Responsive: Text hides on tiny screens) */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`
                group flex items-center gap-2 px-3 py-2 md:py-2 text-xs font-bold uppercase rounded-full transition-all border border-[var(--border-color)]
                ${isDownloading 
                  ? "bg-[var(--accent)] text-black cursor-wait" 
                  : "bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black active:scale-95"
                }
              `}
            >
              {isDownloading ? (
                <>
                  <span className="hidden sm:inline">Loading</span>
                  <FiLoader className="animate-spin text-sm" />
                </>
              ) : (
                <>
                  {/* Desktop Text */}
                  <span className="hidden sm:inline">Resume</span> 
                  {/* Mobile Text (Hidden on very small screens < 360px) */}
                  <span className="hidden min-[360px]:inline sm:hidden">CV</span>
                  <FiDownload className="text-sm group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* THEME TOGGLE */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[var(--card-bg)] hover:bg-[var(--foreground)] hover:text-[var(--background)] border border-[var(--border-color)] transition-all duration-300 active:rotate-90"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
              </button>
            )}

            {/* MOBILE MENU TOGGLE (Visible < md) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] transition-all active:scale-90"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        <div
          ref={mobileMenuRef}
          className="w-full max-w-sm overflow-hidden opacity-0 h-0 hidden md:hidden mt-2"
        >
          <div className="bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] rounded-2xl p-2 flex flex-col gap-1 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`
                  w-full px-4 py-3 text-sm font-bold uppercase tracking-wide rounded-xl transition-all flex justify-between items-center group
                  ${
                    activeTab === link.href
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
                  }
                `}
              >
                {link.name}
                {/* Arrow Icon on Hover */}
                <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}