import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/Components/Footer";
import About from "@/Components/About";
import ReflexGame from "@/Components/Game";

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