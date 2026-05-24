'use client';

import { useEffect, useState } from 'react';

// 글자마다 순환할 폰트 모음 (동글동글 → 콘덴스드 → 세리프 → 모노 → 손글씨)
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
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 450);
    return () => clearInterval(id);
  }, []);

  const lines = text.split('\n');

  return (
    <span className={className} aria-label={text}>
      {lines.map((line, li) => (
        <span key={li} className="block whitespace-nowrap" aria-hidden="true">
          {Array.from(line).map((ch, ci) => {
            const idx = li * 100 + ci; // 줄을 가로질러 스태거
            const font = FONTS[(tick + idx) % FONTS.length];
            return (
              <span
                key={ci}
                style={{ fontFamily: font }}
                className="inline-block transition-transform duration-300 ease-out"
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
