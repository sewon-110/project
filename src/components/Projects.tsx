import Image from "next/image";
import { works } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[1600px] px-6 py-20 sm:py-28">
      <div className="mb-12 flex items-baseline justify-between border-b pb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Selected Work</h2>
        <span className="font-mono text-xs text-muted">
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
            className="group block break-inside-avoid overflow-hidden rounded-xl border bg-foreground/[0.02]"
          >
            <div className="relative overflow-hidden">
              {work.tall ? (
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={work.src}
                    alt={work.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-background/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur">
                    Full page ↗
                  </span>
                </div>
              ) : (
                <Image
                  src={work.src}
                  alt={work.title}
                  width={work.width}
                  height={work.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              )}
            </div>

            <div className="flex items-start justify-between gap-3 px-4 py-4">
              <div>
                <h3 className="text-sm font-medium leading-snug tracking-tight">
                  {work.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                  {work.category}
                </p>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted">
                {work.year}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
