"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FiSun, FiMoon, FiDownload, FiLoader, FiCheck } from "react-icons/fi"; // Added Icons
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [isDownloading, setIsDownloading] = useState(false); // State for download
  const navRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // GSAP Entrance
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    );
  }, []);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setActiveTab(href);
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

  // --- DOWNLOAD LOGIC ---
  const handleDownload = (e) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);

    // 1. Simulate a delay for visual feedback (1.5s)
    setTimeout(() => {
      // 2. Create a temporary link to trigger download
      const link = document.createElement("a");
      link.href = "/resume.pdf"; // IMPORTANT: File must be in 'public' folder
      link.download = "Mohamed_Asharaf_Resume.pdf"; // The name the user saves it as
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3. Reset state
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-0 w-full z-50 flex justify-center px-4"
    >
      <div className="flex items-center gap-2 p-1.5 pl-5 bg-[var(--background)]/70 backdrop-blur-md border border-[var(--border-color)] rounded-full shadow-2xl ring-1 ring-[var(--foreground)]/5 transition-all duration-300 hover:scale-[1.01]">
        
        {/* --- LOGO --- */}
        <Link
          href="/"
          onClick={(e) => handleScroll(e, "/")}
          className="group relative h-6 overflow-hidden flex flex-col items-start justify-start cursor-pointer mr-2 md:mr-4"
        >
          <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
            <span className="h-6 flex items-center font-black tracking-tighter uppercase text-lg leading-none">
              ASHARAF<span className="text-[var(--accent)]">.</span>
            </span>
            <span className="h-6 flex items-center font-black tracking-tighter uppercase text-lg leading-none text-[var(--accent)]">
              ASHARAF<span className="text-[var(--foreground)]">.</span>
            </span>
          </div>
        </Link>

        {/* --- TABS (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center gap-1">
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

        <div className="w-[1px] h-5 bg-[var(--border-color)] mx-2 hidden md:block opacity-50"></div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-2">
          
          {/* RESUME BUTTON (Now Visible on Mobile) */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`
              group flex items-center gap-2 px-3 md:px-4 py-2 text-xs font-bold uppercase rounded-full transition-all border border-[var(--border-color)]
              ${isDownloading 
                ? "bg-[var(--accent)] text-black cursor-wait" 
                : "bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black active:scale-95"
              }
            `}
          >
            {/* Logic to swap Text and Icon based on state */}
            {isDownloading ? (
              <>
                <span>Loading</span>
                <FiLoader className="animate-spin" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Resume</span> {/* Text hidden on very small phones */}
                <span className="sm:hidden">CV</span> {/* 'CV' shown on small phones */}
                <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--card-bg)] hover:bg-[var(--foreground)] hover:text-[var(--background)] border border-[var(--border-color)] transition-all duration-300 active:rotate-90"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}