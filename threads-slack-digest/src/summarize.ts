import Anthropic from "@anthropic-ai/sdk";
import { config } from "./config.js";
import type { ThreadsPost } from "./threads.js";

export interface CardItem {
  heading: string; // 카드 소제목 (예: "유튜브 레퍼런스")
  body: string; // 핵심 문장
  sub?: string; // 보조 설명 (회색)
}

export interface CardData {
  headline: string; // 큰 제목
  highlight?: string; // headline 중 라임색으로 강조할 구절 (headline 의 부분 문자열)
  cards: CardItem[]; // 2~4개
  key: string; // "핵심" 한 줄 요약
}

const anthropic = new Anthropic({ apiKey: config.anthropic.apiKey });

const SYSTEM = `너는 SNS(Threads) 게시물들을 한 장의 카드뉴스로 요약하는 한국어 에디터다.
여러 게시물을 관통하는 하나의 주제를 잡아 시선을 끄는 카드 한 장으로 압축한다.

규칙:
- 모든 출력은 한국어.
- headline: 12~22자 내외의 강렬한 한 줄. 줄바꿈은 넣지 말 것.
- highlight: headline 안에서 가장 핵심이 되는 구절을 그대로 골라낸다(headline 의 부분 문자열이어야 함).
- cards: 2~4개. 각 카드는 heading(짧은 소제목), body(한두 문장 핵심), sub(선택, 보조 설명).
- key: 전체를 관통하는 "핵심" 한 줄. 25자 내외.
- 과장/광고 톤 금지. 담백하고 정보 중심으로.`;

const tool: Anthropic.Tool = {
  name: "build_card",
  description: "요약 결과를 카드 데이터로 구조화한다.",
  input_schema: {
    type: "object",
    properties: {
      headline: { type: "string" },
      highlight: { type: "string" },
      cards: {
        type: "array",
        minItems: 2,
        maxItems: 4,
        items: {
          type: "object",
          properties: {
            heading: { type: "string" },
            body: { type: "string" },
            sub: { type: "string" },
          },
          required: ["heading", "body"],
        },
      },
      key: { type: "string" },
    },
    required: ["headline", "highlight", "cards", "key"],
  },
};

export async function summarize(posts: ThreadsPost[]): Promise<CardData> {
  const joined = posts
    .map((p, i) => `[게시물 ${i + 1}] (${p.timestamp})\n${p.text}`)
    .join("\n\n");

  const msg = await anthropic.messages.create({
    model: config.anthropic.model,
    max_tokens: 1024,
    system: [
      // 변하지 않는 지침은 캐시 → 반복 실행 시 비용 절감
      { type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } },
    ],
    tools: [tool],
    tool_choice: { type: "tool", name: "build_card" },
    messages: [
      {
        role: "user",
        content: `아래는 최근 Threads 게시물들이다. 하나의 카드뉴스로 요약해줘.\n\n${joined}`,
      },
    ],
  });

  const block = msg.content.find((b) => b.type === "tool_use");
  if (!block || block.type !== "tool_use") {
    throw new Error("요약 결과(tool_use)를 받지 못했습니다.");
  }
  return block.input as CardData;
}
