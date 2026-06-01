/**
 * 로컬 미리보기용: API 호출 없이 샘플 데이터로 카드 이미지를 out/preview.png 로 저장.
 *   npm run preview
 */
import { mkdir, writeFile } from "node:fs/promises";
import { renderCardImage } from "./render.js";
import type { CardData } from "./summarize.js";

const sample: CardData = {
  headline: "레퍼런스는 많이 보는 게 아니라 나눠 보는 겁니다",
  highlight: "많이 보는 게 아니라",
  cards: [
    { heading: "유튜브 레퍼런스", body: "알고리즘이 이미 많이 본 영상만 다시 보여줍니다.", sub: "새로운 무드보다 익숙한 포맷이 반복됩니다." },
    { heading: "인스타그램 레퍼런스", body: "멋진 컷은 모이는데 왜 좋은지 설명하기 어렵습니다.", sub: "기법, 구도, 광고 목적이 섞여버립니다." },
    { heading: "핀터레스트 레퍼런스", body: "이미지 무드는 잡히지만 영상의 호흡과 움직임은 비어있습니다." },
    { heading: "그래서 필요한 것", body: "무드, 기법, 광고, 모션, 구도를 사이트별로 나눠 범위를 확장합니다." },
  ],
  key: "많이 저장하기보다 어떤 목적의 레퍼런스인지 정해두는 게 먼저입니다.",
};

const buf = await renderCardImage(sample, { handle: "@ai.sangkyun", index: "2/8" });
await mkdir("out", { recursive: true });
await writeFile("out/preview.png", buf);
console.log("✅ out/preview.png 저장 완료");
