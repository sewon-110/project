import type { CardData } from "./summarize.js";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** headline 안의 highlight 구절을 라임색 <span> 으로 감싼다. */
function renderHeadline(headline: string, highlight?: string): string {
  const safe = escapeHtml(headline);
  if (!highlight) return safe;
  const safeHi = escapeHtml(highlight);
  if (!safe.includes(safeHi)) return safe;
  return safe.replace(safeHi, `<span class="hi">${safeHi}</span>`);
}

export function renderCardHtml(data: CardData, opts: { handle?: string; index?: string } = {}): string {
  const handle = escapeHtml(opts.handle ?? "@threads.digest");
  const index = escapeHtml(opts.index ?? "");

  const cards = data.cards
    .slice(0, 4)
    .map((c, i) => {
      const highlighted = i === data.cards.length - 1; // 마지막 카드를 강조 (레퍼런스 톤)
      return `
      <div class="card ${highlighted ? "card--hi" : ""}">
        <div class="card-h">${escapeHtml(c.heading)}</div>
        <div class="card-b">${escapeHtml(c.body)}</div>
        ${c.sub ? `<div class="card-s">${escapeHtml(c.sub)}</div>` : ""}
      </div>`;
    })
    .join("");

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root { --lime: #c8ff36; --bg: #0b0b0b; --card: #161616; }
  html, body { width: 1080px; height: 1350px; }
  body {
    background: var(--bg);
    color: #fff;
    font-family: "Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", system-ui, sans-serif;
    padding: 72px 64px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    -webkit-font-smoothing: antialiased;
  }
  .top { display: flex; justify-content: space-between; align-items: center; }
  .label { font-size: 30px; font-weight: 800; letter-spacing: 1px; }
  .label::after { content: ""; display: block; width: 84px; height: 5px; background: var(--lime); margin-top: 12px; border-radius: 3px; }
  .meta { color: #8a8a8a; font-size: 26px; font-weight: 600; }

  .headline { font-size: 78px; font-weight: 900; line-height: 1.18; letter-spacing: -1px; }
  .headline .hi { color: var(--lime); }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .card { background: var(--card); border-radius: 22px; padding: 36px 34px; border: 2px solid transparent; }
  .card--hi { border-color: var(--lime); background: rgba(200,255,54,0.06); }
  .card-h { color: var(--lime); font-size: 30px; font-weight: 800; margin-bottom: 16px; }
  .card-b { font-size: 32px; font-weight: 700; line-height: 1.35; }
  .card-s { color: #9a9a9a; font-size: 26px; font-weight: 500; line-height: 1.4; margin-top: 14px; }

  .key { margin-top: auto; background: var(--card); border-radius: 22px; padding: 36px 34px; position: relative; overflow: hidden; }
  .key::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 8px; background: var(--lime); }
  .key-h { color: var(--lime); font-size: 30px; font-weight: 800; margin-bottom: 14px; }
  .key-b { font-size: 34px; font-weight: 700; line-height: 1.35; }
</style>
</head>
<body>
  <div class="top">
    <div class="label">Article</div>
    <div class="meta">${handle}${index ? ` &nbsp;·&nbsp; ${index}` : ""}</div>
  </div>

  <div class="headline">${renderHeadline(data.headline, data.highlight)}</div>

  <div class="grid">${cards}</div>

  <div class="key">
    <div class="key-h">핵심</div>
    <div class="key-b">${escapeHtml(data.key)}</div>
  </div>
</body>
</html>`;
}
