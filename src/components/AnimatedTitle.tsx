'use client';

import { useEffect, useState } from 'react';

// 기본(index 0)은 동글동글한 디스플레이 폰트. 나머지로 한 글자씩 튐.
const FONTS = [
  'var(--font-display)',
  "'Bebas Neue', sans-serif",
  "'Playfair Display', serif",
  'var(--font-geist-mono), monospace',
  "'Caveat', cursive",
];

export default function AnimatedTitle({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const lines = text.split('\n');
  const total = lines.reduce((n, l) => n + Array.from(l).length, 0);

  // 글자별 폰트 인덱스 (전부 0 = 기본 폰트로 시작 → SSR 일치)
  const [fontIdx, setFontIdx] = useState<number[]>(() => Array(total).fill(0));

  useEffect(() => {
    const id = setInterval(() => {
      setFontIdx((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        const pos = Math.floor(Math.random() * next.length); // 한 글자만
        let f = Math.floor(Math.random() * FONTS.length);
        if (f === next[pos]) f = (f + 1) % FONTS.length; // 같은 폰트면 다른 걸로
        next[pos] = f;
        return next;
      });
    }, 500);
    return () => clearInterval(id);
  }, []);

  let flat = -1;
  return (
    <span className={className} aria-label={text}>
      {lines.map((line, li) => (
        <span key={li} className="block whitespace-nowrap" aria-hidden="true">
          {Array.from(line).map((ch, ci) => {
            flat += 1;
            const f = fontIdx[flat] ?? 0;
            return (
              <span
                key={ci}
                style={{ fontFamily: FONTS[f] }}
                className="inline-block"
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
