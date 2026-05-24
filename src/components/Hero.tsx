import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-[1600px] flex-col justify-center px-6 pt-24 pb-20 sm:pt-36 sm:pb-28"
    >
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {profile.role} · {profile.location}
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold leading-[1.15] tracking-tight whitespace-pre-line sm:text-6xl">
        {profile.tagline}
      </h1>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="#work"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          작업물 보기
        </a>
        <a
          href="#contact"
          className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          연락하기
        </a>
      </div>
    </section>
  );
}
