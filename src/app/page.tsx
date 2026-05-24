import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* 스크롤 시 히어로 위로 올라오며 덮는 콘텐츠 패널 */}
        <div className="relative z-10 bg-[#dadadc]">
          <Projects />
          <About />
          <Contact />
        </div>
      </main>
    </>
  );
}
