import { chromium } from "playwright";
import { renderCardHtml } from "./template.js";
import type { CardData } from "./summarize.js";

const WIDTH = 1080;
const HEIGHT = 1350;

/** 카드 데이터를 PNG 버퍼로 렌더링한다 (1080x1350, 인스타 4:5 비율). */
export async function renderCardImage(data: CardData, opts?: { handle?: string; index?: string }): Promise<Buffer> {
  const html = renderCardHtml(data, opts);
  const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  try {
    const page = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 2,
    });
    await page.setContent(html, { waitUntil: "networkidle" });
    const buf = await page.screenshot({ type: "png" });
    return buf;
  } finally {
    await browser.close();
  }
}
