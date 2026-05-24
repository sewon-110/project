import Image from "next/image";
import { works } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="work" className="border-t border-line bg-bg">
      <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-12 sm:py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
            Selected
            <br />
            Work
          </h2>
          <span className="rounded-full border border-line px-4 py-1.5 font-mono text-xs text-fg/70">
            {String(works.length).padStart(2, "0")} projects
          </span>
        </div>

        {/* 마소너리: 다양한 비율의 이미지를 컬럼으로 자연스럽게 배치 */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-5">
          {works.map((work) => (
            <a
              key={work.src}
              href={work.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group block break-inside-avoid overflow-hidden rounded-2xl border border-line bg-surface transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden border-b border-line">
                {work.tall ? (
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={work.src}
                      alt={work.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-fg px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-bg">
                      Full page ↗
                    </span>
                  </div>
                ) : (
                  <Image
                    src={work.src}
                    alt={work.title}
                    width={work.width}
                    height={work.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>

              <div className="flex items-start justify-between gap-3 px-4 py-4">
                <div>
                  <h3 className="text-sm font-semibold leading-snug tracking-tight">
                    {work.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg/55">
                    {work.category}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-fg/55">
                  {work.year}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
