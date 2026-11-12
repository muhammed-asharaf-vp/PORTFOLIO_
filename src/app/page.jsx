import HomeIntro from "@/components/HomeIntro";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";
import CustomCursor from "@/components/CustomCursor";
import LazyGame from "@/components/LazyGame";
import ScrollProgress from "@/components/scroll/ScrollProgress";
import ScrollTilt from "@/components/scroll/ScrollTilt";

// Server component: only the interactive sections ship client JS
export default function Home() {
  return (
    <main className="bg-[var(--background)] selection:bg-[var(--accent)] selection:text-black">
      <CustomCursor />
      <ScrollProgress />

      {/* Preloader + Navbar + Hero (Hero waits for the preloader) */}
      <HomeIntro />

      <ScrollTilt>
        <Marquee />
      </ScrollTilt>
      <About />
      <Experience />
      <Projects />
      <LazyGame />
      <Footer />
    </main>
  );
}
