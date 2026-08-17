"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";
import ReflexGame from "@/components/Game";
import Preloader from "@/components/PreLoader";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <main className="bg-[var(--background)] selection:bg-[var(--accent)] selection:text-black">
      {/* PRELOADER */}
      <Preloader onFinish={() => setHeroReady(true)} />

      <CustomCursor />
      <Navbar />

      {/* HERO (waits for preloader) */}
      <Hero ready={heroReady} />

      <Marquee />
      <About />
      <Experience />
      <Projects />
      <ReflexGame />
      <Footer />
    </main>
  );
}
