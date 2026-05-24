'use client'

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { works } from "@/data/portfolio"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)

  // Derive the category list once. Order preserved as encountered in
  // the works array so the most-shipped categories naturally lead.
  const categories = useMemo(() => {
    const map = new Map<string, number>()
    for (const w of works) map.set(w.category, (map.get(w.category) ?? 0) + 1)
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  }, [])

  const [selected, setSelected] = useState<string | null>(null)
  const filtered = useMemo(
    () => (selected ? works.filter((w) => w.category === selected) : works),
    [selected]
  )

  // 내부 콘텐츠 높이 - 화면 높이 = 스크롤(translate)할 거리. Re-measures
  // whenever `filtered` changes so the sticky-scroll envelope adjusts to
  // the new content height when the user toggles a category.
  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const measure = () =>
      setDist(Math.max(0, el.scrollHeight - window.innerHeight))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [filtered])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, -dist])

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ height: `calc(100vh + ${dist}px)` }}
      className="relative bg-black text-[#e9e9ec]"
    >
      {/* 블랙 패널을 top에 고정, 내부 콘텐츠는 스크롤에 맞춰 위로 이동 */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={innerRef}
          style={{ y }}
          className="mx-auto max-w-[1600px] px-6 py-16 sm:px-12 sm:py-20"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-6">
            <h2 className="font-display text-6xl font-extrabold italic leading-[0.9] tracking-tight sm:text-8xl">
              Work
            </h2>
            <span className="rounded-full border border-white/30 px-4 py-1.5 font-mono text-xs text-white/70">
              {String(filtered.length).padStart(2, "0")} projects
            </span>
          </div>

          {/* 2-col split — left is a big-bold clickable category list
              with hairlines (matches sewon's reference image), right is
              the masonry of the filtered works. Below lg the categories
              collapse on top of the grid. */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(280px,1fr)_2fr] lg:gap-14">
            <aside>
              <ul className="border-t border-white/15">
                <li className="border-b border-white/15">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className={`flex w-full items-baseline justify-between gap-3 py-3 text-left text-3xl font-extrabold tracking-tight transition-opacity sm:text-4xl ${
                      selected === null ? "opacity-100" : "opacity-55 hover:opacity-100"
                    }`}
                  >
                    <span>All Work</span>
                    <span className="font-mono text-xs text-white/55">
                      ({works.length})
                    </span>
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.name} className="border-b border-white/15">
                    <button
                      type="button"
                      onClick={() => setSelected(c.name)}
                      className={`flex w-full items-baseline justify-between gap-3 py-3 text-left text-3xl font-extrabold tracking-tight transition-opacity sm:text-4xl ${
                        selected === c.name ? "opacity-100" : "opacity-55 hover:opacity-100"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="font-mono text-xs text-white/55">
                        ({c.count})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* 2단 마소너리 — 우측 절반에 맞게 columns 단일/이중만 */}
            <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 [&>*]:mb-4 sm:[&>*]:mb-5">
              {filtered.map((work) => (
                <a
                  key={work.src}
                  href={work.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden border-b border-white/10">
                    {work.tall ? (
                      <div className="relative aspect-[3/4] w-full">
                        <Image
                          src={work.src}
                          alt={work.title}
                          fill
                          sizes="(max-width: 1024px) 50vw, 600px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-black">
                          Full page ↗
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={work.src}
                        alt={work.title}
                        width={work.width}
                        height={work.height}
                        sizes="(max-width: 1024px) 50vw, 600px"
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-3 px-4 py-4">
                    <div>
                      <h3 className="text-sm font-semibold leading-snug tracking-tight">
                        {work.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/55">
                        {work.category}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-white/55">
                      {work.year}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
