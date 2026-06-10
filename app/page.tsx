import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#0a0a0a" }}>
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Footer />
    </main>
  );
}
