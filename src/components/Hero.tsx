import { heroWord, heroPhrases } from "@/data/portfolio";
import { LetterSwapForward } from "@/components/ui/letter-swap";

export default function Hero() {
  return (
    <section
      id="top"
      className="sticky top-0 z-0 h-screen overflow-hidden bg-[#dadadc] text-[#0a0a0b]"
    >
      {/* 좌상단 네임플레이트 */}
      <div className="absolute left-6 top-6 z-10 font-mono text-base font-medium uppercase leading-tight tracking-wider text-[#0a0a0b]/70 sm:left-12 sm:top-8 sm:text-lg">
        Designer
        <br />
        Sewon Im
      </div>
      {/* 우상단 버전 */}
      <div className="absolute right-6 top-6 z-10 text-right font-mono text-base font-medium uppercase leading-tight tracking-wider text-[#0a0a0b]/70 sm:right-12 sm:top-8 sm:text-lg">
        2026
        <br />
        ver
      </div>

      <div className="mx-auto flex h-full max-w-[2560px] flex-col items-center justify-center gap-10 px-6 py-20 sm:px-12">
        {/* I WORK ON ( ... ) 조합 */}
        <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
          <h1 className="whitespace-nowrap font-hero text-[9vw] font-black italic leading-[0.85] tracking-tighter lg:text-[5.5vw]">
            <span className="relative isolate inline-block">
              <span
                aria-hidden="true"
                className="absolute inset-x-[-0.05em] bottom-[0.04em] top-[0.12em] -z-10 origin-left bg-[#e6ff33] [animation:paint_0.7s_0.5s_ease-out_both]"
              />
              {heroWord}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span
              aria-hidden="true"
              className="font-hero text-[12vw] font-light leading-[0.78] lg:text-[6.5vw]"
            >
              (
            </span>
            <ul className="flex flex-col justify-center text-left font-hero text-2xl font-extrabold leading-[1.08] tracking-tight sm:text-3xl lg:text-[2.6vw]">
              {heroPhrases.map((phrase, i) => (
                <li key={phrase}>
                  <LetterSwapForward
                    label={phrase}
                    staggerFrom="first"
                    autoPlay
                    playDelay={300 + i * 320}
                    className="w-fit cursor-default"
                  />
                </li>
              ))}
            </ul>
            <span
              aria-hidden="true"
              className="font-hero text-[12vw] font-light leading-[0.78] lg:text-[6.5vw]"
            >
              )
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
