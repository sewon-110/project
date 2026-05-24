'use client';

import { useEffect, useState } from 'react';

// index 0 = 기본 동글동글 폰트. 악센트 글자가 1~4번으로 잠깐 튐.
const FONTS = [
  'var(--font-display)',
  "'Bebas Neue', sans-serif",
  "'Playfair Display', serif",
  'var(--font-geist-mono), monospace',
];

export default function AnimatedTitle({
  text,
  className = '',
  accent = 'vw', // 이 글자들만 애니메이션 (대소문자 무시)
}: {
  text: string;
  className?: string;
  accent?: string;
}) {
  const lines = text.split('\n');
  const flatChars: string[] = [];
  lines.forEach((l) => Array.from(l).forEach((c) => flatChars.push(c)));

  const accentSet = new Set(accent.toLowerCase().split(''));
  const accentPositions = flatChars
    .map((c, i) => (accentSet.has(c.toLowerCase()) ? i : -1))
    .filter((i) => i >= 0);

  const [fontIdx, setFontIdx] = useState<number[]>(() =>
    Array(flatChars.length).fill(0),
  );

  useEffect(() => {
    if (accentPositions.length === 0) return;
    let revert: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      const pos =
        accentPositions[Math.floor(Math.random() * accentPositions.length)];
      const f = 1 + Math.floor(Math.random() * (FONTS.length - 1)); // 기본 제외
      setFontIdx((prev) => {
        const n = [...prev];
        n[pos] = f;
        return n;
      });
      // 잠깐 머문 뒤 기본 폰트로 복귀
      revert = setTimeout(() => {
        setFontIdx((prev) => {
          const n = [...prev];
          n[pos] = 0;
          return n;
        });
      }, 900);
    }, 1800);
    return () => {
      clearInterval(tick);
      clearTimeout(revert);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, accent]);

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
                {ch === ' ' ? ' ' : ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
