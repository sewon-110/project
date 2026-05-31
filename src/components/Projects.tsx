"use client";

import { useEffect, useState } from "react";
import { works, type Work } from "@/data/portfolio";
import DesktopMockup from "@/components/ui/desktop-mockup";
import ScrollMockup from "@/components/ui/scroll-mockup";

// 1080x1080 / 1080x1350 프로모션 이미지 = 묶어서 작은 썸네일로
const isPromo = (w: Work) =>
  w.width === 1080 && (w.height === 1080 || w.height === 1350);

type Item =
  | { type: "work"; work: Work }
  | { type: "group"; label: string; items: Work[] };

function buildItems(): Item[] {
  const features: Work[] = [];
  const groups = new Map<string, Work[]>();
  for (const w of works) {
    // 명시적 group 이 있으면 그 라벨로, 없으면 프로모션(1080)만 카테고리로 묶음
    const label = w.group ?? (isPromo(w) ? w.category : null);
    if (label === null) {
      features.push(w);
    } else {
      if (!groups.has(label)) groups.set(label, []);
      groups.get(label)!.push(w);
    }
  }
  const yearOf = (items: Work[]) => Math.max(...items.map((i) => Number(i.year)));
  const withYear: { item: Item; year: number }[] = [
    ...features.map((w) => ({
      item: { type: "work", work: w } as Item,
      year: Number(w.year),
    })),
    ...[...groups.entries()].map(([label, items]) => ({
      item: { type: "group", label, items } as Item,
      year: yearOf(items),
    })),
  ];
  // 최신순(연도 내림차순)
  withYear.sort((a, b) => b.year - a.year);
  const result = withYear.map((x) => x.item);
  // KRAFTON AI WEB 을 1번째로 고정
  const aiIdx = result.findIndex(
    (it) => it.type === "work" && it.work.title === "KRAFTON AI WEB",
  );
  if (aiIdx > 0) {
    const [ai] = result.splice(aiIdx, 1);
    result.unshift(ai);
  }
  // PUBG Social Marketing 을 2번째 위치로 고정
  const smIdx = result.findIndex(
    (it) => it.type === "group" && it.label === "PUBG Social Marketing",
  );
  if (smIdx !== -1 && smIdx !== 1) {
    const [sm] = result.splice(smIdx, 1);
    result.splice(1, 0, sm);
  }
  return result;
}

const items = buildItems();

export default function Projects() {
  const [sel, setSel] = useState<number | null>(0);
  const current = sel === null ? null : items[sel];
  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImg(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section id="work" className="min-h-screen bg-black text-[#e9e9ec]">
      <div className="mx-auto grid w-full max-w-[2560px] gap-10 px-6 py-16 sm:px-12 sm:py-24 lg:grid-cols-[0.8fr_1.3fr] lg:gap-80 lg:h-screen lg:py-0">
        {/* LEFT — 고정 (스크롤 안 함) */}
        <div className="lg:flex lg:h-full lg:flex-col lg:justify-center lg:overflow-hidden lg:py-12">
          <h2 className="mb-8 font-hero text-7xl font-extrabold italic leading-[0.85] tracking-tight sm:text-8xl lg:text-[9vw]">
            <span className="relative isolate inline-block text-[#0a0a0b]">
              <span
                aria-hidden="true"
                className="absolute inset-x-[-0.05em] bottom-[0.04em] top-[0.12em] -z-10 origin-left bg-[#e6ff33] [animation:paint_0.7s_0.6s_ease-out_both]"
              />
              Work
            </span>
          </h2>
          <ul className="border-b border-white/15 pl-2 lg:pl-4">
            {items.map((item, i) => {
              const active = i === sel;
              const label = item.type === "work" ? item.work.title : item.label;
              const client =
                item.type === "work"
                  ? (item.work.client ?? "KRAFTON")
                  : (item.items[0]?.client ?? "KRAFTON");
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setSel(i)}
                    className={`flex w-full items-center justify-between gap-4 border-t border-white/15 py-3.5 text-left transition-opacity sm:py-4 ${
                      active ? "opacity-100" : "opacity-40 hover:opacity-75"
                    }`}
                  >
                    <span className="text-lg font-semibold leading-snug tracking-tight sm:text-2xl">
                      {label}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] tracking-wider text-white/40">
                      {client}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT — 독립 스크롤 (스크롤바 숨김) */}
        <div
          id="work-detail"
          className="no-scrollbar lg:h-full lg:overflow-y-auto lg:py-12"
        >

          {current === null ? (
            <p className="font-mono text-sm uppercase tracking-[0.15em] text-white/35">
              ← 작업을 선택하세요
            </p>
          ) : current.type === "work" ? (
            <div>
              {/* 타이틀이 이미지 위에 */}
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-white/55">
                {current.work.category}
              </div>
              <h3 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
                {current.work.title}
              </h3>
              {current.work.mockup === "scroll" ? (
                <ScrollMockup
                  pc={(current.work.images ?? [current.work.src])[0]}
                  mobile={(current.work.images ?? [])[1]}
                  alt={current.work.title}
                />
              ) : current.work.mockup === "slide" ? (
                <DesktopMockup
                  images={current.work.images ?? [current.work.src]}
                  alt={current.work.title}
                />
              ) : (
                <div className="flex flex-col items-start gap-4">
                  {(current.work.images ?? [current.work.src]).map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setModalImg(img)}
                      className="block w-full"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={current.work.title}
                        className="w-full cursor-zoom-in"
                      />
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
                {current.work.description}
              </p>
            </div>
          ) : (
            <div>
              <h3 className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {current.label}
              </h3>
              <div className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-white/55">
                {current.items.reduce((n, w) => n + (w.images?.length ?? 1), 0)}{" "}
                works
              </div>
              {/* 작은 썸네일 여러 개 (작업별 이미지 모두) */}
              <div
                className={`grid gap-4 ${
                  current.items.every((w) => w.width >= w.height)
                    ? "grid-cols-1"
                    : "grid-cols-2 sm:grid-cols-3"
                }`}
              >
                {current.items
                  .flatMap((w) =>
                    (w.images ?? [w.src]).map((img) => ({
                      img,
                      title: w.title,
                    })),
                  )
                  .map((t) => (
                    <button
                      key={t.img}
                      type="button"
                      onClick={() => setModalImg(t.img)}
                      className="group block w-full text-left"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.img}
                        alt={t.title}
                        className={`w-full cursor-zoom-in object-cover object-top transition-opacity group-hover:opacity-80 ${
                          current.items.every((w) => w.width >= w.height)
                            ? "aspect-video"
                            : "aspect-square"
                        }`}
                      />
                      <p className="mt-1.5 line-clamp-1 text-[11px] text-white/55">
                        {t.title}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </section>

      {modalImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={() => setModalImg(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={modalImg}
            alt=""
            className="max-h-[90vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setModalImg(null)}
            aria-label="닫기"
            className="absolute right-5 top-5 font-mono text-xs uppercase tracking-wider text-white/70 transition-colors hover:text-white"
          >
            ✕ Close
          </button>
        </div>
      )}
    </>
  );
}
