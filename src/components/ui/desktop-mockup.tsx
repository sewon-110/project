"use client";

import { useEffect, useState } from "react";

// 얇은 라인 프레임 + 내부 이미지가 옆으로 슬라이드되는 캐러셀
export default function DesktopMockup({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setI((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="w-full">
      {/* 얇은 라인 프레임 */}
      <div className="overflow-hidden rounded-lg border border-white/25">
        {/* 상단 바 (얇은 라인) */}
        <div className="flex items-center gap-1.5 border-b border-white/20 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full border border-white/35" />
          <span className="h-2 w-2 rounded-full border border-white/35" />
          <span className="h-2 w-2 rounded-full border border-white/35" />
          <span className="ml-3 font-mono text-[10px] text-white/35">
            krafton.com
          </span>
        </div>
        {/* 가로형(16:10) 화면 — 옆으로 슬라이드 */}
        <div className="aspect-[16/10] w-full overflow-hidden bg-black">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {images.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={alt}
                className="h-full w-full shrink-0 object-cover object-top"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 인디케이터 */}
      {images.length > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          {images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-white/70" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
