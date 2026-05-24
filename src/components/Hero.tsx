import { heroWord, heroPhrases } from "@/data/portfolio";

export default function Hero() {
  return (
    <section id="top" className="overflow-hidden bg-[#ece9e1] text-[#0a0a0b]">
      <div className="mx-auto flex min-h-[84vh] max-w-[1600px] flex-col items-center justify-center gap-6 px-6 py-20 sm:px-12 lg:flex-row lg:justify-center lg:gap-8">
        <h1 className="font-hero text-[24vw] font-black leading-[0.8] tracking-tighter lg:text-[12vw]">
          {heroWord}
        </h1>

        <div className="flex items-stretch justify-center gap-2 sm:gap-3">
          <span
            aria-hidden="true"
            className="font-hero text-[26vw] font-light leading-[0.78] lg:text-[12vw]"
          >
            (
          </span>
          <ul className="flex flex-col justify-center text-left font-hero text-2xl font-extrabold leading-[1.08] tracking-tight sm:text-3xl lg:text-[2.6vw]">
            {heroPhrases.map((phrase) => (
              <li key={phrase}>{phrase}</li>
            ))}
          </ul>
          <span
            aria-hidden="true"
            className="font-hero text-[26vw] font-light leading-[0.78] lg:text-[12vw]"
          >
            )
          </span>
        </div>
      </div>
    </section>
  );
}
