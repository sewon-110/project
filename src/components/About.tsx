import { profile } from "@/data/portfolio";

export default function About() {
  return (
    <section
      id="about"
      className="rounded-[28px] bg-ink text-paper sm:rounded-[44px]"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-12 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-lime sm:text-7xl">
            About
          </h2>
          <p className="max-w-3xl text-xl leading-relaxed sm:text-2xl">
            {profile.about}
          </p>
        </div>
      </div>
    </section>
  );
}
