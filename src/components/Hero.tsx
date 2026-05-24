import { profile } from "@/data/portfolio";

// 찢어진(torn) 배너 모양 — 위/아래 가장자리가 삐죽삐죽
const TORN =
  "polygon(0% 14%, 8% 1%, 16% 15%, 25% 2%, 34% 14%, 43% 1%, 52% 15%, 61% 2%, 70% 14%, 79% 1%, 88% 15%, 100% 3%, 100% 97%, 90% 99%, 81% 86%, 72% 99%, 62% 85%, 53% 99%, 43% 86%, 34% 99%, 24% 85%, 15% 99%, 6% 87%, 0% 97%)";

export default function Hero() {
  return (
    <section
      id="top"
      className="overflow-hidden bg-[#ece9e1]"
    >
      <div className="mx-auto flex min-h-[80vh] max-w-[1600px] flex-col items-center justify-center px-6 py-16 sm:px-12 sm:py-24">
        <div
          className="flex w-full max-w-5xl items-center justify-center bg-[#0a0a0b] px-10 py-28 text-center sm:py-36"
          style={{ clipPath: TORN }}
        >
          <h1 className="font-display text-[11vw] font-extrabold leading-[1.02] tracking-tight whitespace-pre-line text-[#f5f3ed] sm:text-[7.5vw] lg:text-[6vw]">
            {profile.tagline}
          </h1>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-[#0a0a0b] px-7 py-3.5 text-sm font-semibold text-[#f5f3ed] transition-transform hover:-translate-y-0.5"
          >
            작업물 보기 ↓
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-[#0a0a0b] px-7 py-3.5 text-sm font-semibold text-[#0a0a0b] transition-colors hover:bg-[#0a0a0b] hover:text-[#f5f3ed]"
          >
            연락하기
          </a>
        </div>
      </div>
    </section>
  );
}
