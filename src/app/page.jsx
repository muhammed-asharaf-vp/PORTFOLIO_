import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";
import ReflexGame from "@/components/Game";

export default function Home() {
  return (
    <main className="bg-[var(--background)] selection:bg-[var(--accent)] selection:text-black">
      <Navbar />
      <Hero />
      <Marquee />
      <About/>
      <Experience />
      <Projects />
      <ReflexGame />
      <Footer/>
    </main>
  );    
}