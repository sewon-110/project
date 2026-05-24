import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="top"
      className="overflow-hidden rounded-[28px] bg-lime sm:rounded-[44px]"
    >
      <div className="mx-auto flex min-h-[78vh] max-w-[1600px] flex-col justify-center px-6 py-20 sm:px-12 sm:py-28">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-ink/70">
          {profile.role} · {profile.location}
        </p>
        <h1 className="font-display text-[15vw] leading-[0.95] tracking-tight whitespace-pre-line sm:text-[11vw] lg:text-[8.5vw]">
          {profile.tagline}
        </h1>
        <div className="mt-12 flex flex-wrap items-center gap-4">
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
