import { profile } from "@/data/portfolio";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-5xl px-6 py-20 sm:py-28"
    >
      <div className="grid gap-10 border-t pt-14 sm:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold tracking-tight">About</h2>
        <p className="max-w-2xl text-lg leading-relaxed text-foreground/80">
          {profile.about}
        </p>
      </div>
    </section>
  );
}
