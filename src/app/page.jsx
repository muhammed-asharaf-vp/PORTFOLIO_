import Navbar from "@/Components/Navbar";
import Hero from "@/Components/Hero";
import Marquee from "@/Components/Marquee";
import Experience from "@/Components/Experience";
import Projects from "@/Components/Projects";
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