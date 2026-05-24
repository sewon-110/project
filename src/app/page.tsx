import Nav from "@/components/Nav";
import HeroScrollAnimation from "@/components/ui/hero-scroll-animation";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <section id="top">
        <HeroScrollAnimation />
      </section>
      <main className="flex-1">
        <Projects />
        <About />
      </main>
      <Contact />
    </>
  );
}
