import { process } from "@/data/portfolio";

export default function WorkProcess() {
  return (
    <div className="mx-auto w-full max-w-[2560px] px-6 sm:px-12">
      <h2 className="font-hero text-5xl font-extrabold italic leading-[0.9] tracking-tight sm:text-7xl lg:text-[6vw]">
        <span className="relative isolate inline-block">
          <span
            aria-hidden="true"
            className="absolute inset-x-[-0.05em] bottom-[0.04em] top-[0.12em] -z-10 origin-left bg-[#e6ff33] [animation:paint_0.7s_0.5s_ease-out_both]"
          />
          Work Process
        </span>
      </h2>
      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
        {process.map((p) => (
          <div key={p.step} className="border-t-2 border-[#0a0a0b] pt-5">
            <div className="font-mono text-sm text-[#0a0a0b]/45">{p.step}</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#0a0a0b]/70 sm:text-base">
              {p.desc}
            </p>
            {/* 단계별 이미지 영역 */}
            <div className="mt-5 flex aspect-video w-full items-center justify-center overflow-hidden bg-[#0a0a0b]/[0.06]">
              {p.img ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0a0a0b]/30">
                  image
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
