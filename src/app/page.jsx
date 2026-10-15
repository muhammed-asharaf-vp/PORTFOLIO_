import dynamic from "next/dynamic";

import HomeIntro from "@/components/HomeIntro";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";
import CustomCursor from "@/components/CustomCursor";

// Below the fold: split the game into its own chunk
const ReflexGame = dynamic(() => import("@/components/Game"));

// Server component: only the interactive sections ship client JS
export default function Home() {
  return (
    <main className="bg-[var(--background)] selection:bg-[var(--accent)] selection:text-black">
      <CustomCursor />

      {/* Preloader + Navbar + Hero (Hero waits for the preloader) */}
      <HomeIntro />

      <Marquee />
      <About />
      <Experience />
      <Projects />
      <ReflexGame />
      <Footer />
    </main>
  );
}
