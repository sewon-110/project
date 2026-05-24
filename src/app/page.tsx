import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}
