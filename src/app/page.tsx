import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}
