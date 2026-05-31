import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import WorkProcess from "@/components/WorkProcess";
import FirstScrollToWork from "@/components/FirstScrollToWork";

export default function Home() {
  return (
    <>
      <FirstScrollToWork />
      <main>
        <Hero />

        {/* 히어로 위로 올라오며 덮는 화이트 한 장 */}
        <section
          id="intro"
          className="sticky top-0 z-10 flex h-screen items-center bg-white text-[#0a0a0b]"
        >
          <WorkProcess />
        </section>

        {/* 그 위로 다시 덮는 work 패널 */}
        <div className="relative z-20 bg-[#dadadc]">
          <Projects />
        </div>
      </main>
    </>
  );
}
