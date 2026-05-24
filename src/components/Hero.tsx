import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section id="top" className="overflow-hidden bg-lime">
      <div className="mx-auto flex min-h-[78vh] max-w-[1600px] flex-col items-center justify-center px-6 py-20 text-center sm:px-12 sm:py-28">
        <h1 className="font-display text-[15vw] leading-[0.95] tracking-tight whitespace-pre-line sm:text-[12vw] lg:text-[9vw]">
          {profile.tagline}
        </h1>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
          >
            작업물 보기 ↓
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-ink px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
          >
            연락하기
          </a>
        </div>
      </div>
    </section>
  );
}
