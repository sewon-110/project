import { config } from "./config.js";
import { shouldRunToday } from "./schedule.js";
import { fetchRecentPosts } from "./threads.js";
import { summarize } from "./summarize.js";
import { renderCardImage } from "./render.js";
import { postToSlack } from "./slack.js";

async function main() {
  // 1) 스케줄 가드 (주말 제외 / 월·수·금)
  const decision = shouldRunToday();
  if (!decision.run && !config.forceRun) {
    console.log(`⏭  건너뜀: ${decision.reason}`);
    return;
  }
  if (config.forceRun) console.log("⚙️  FORCE_RUN=true → 스케줄 무시하고 실행");

  // 2) Threads 최근 글 수집
  console.log(`📥 최근 ${config.lookbackDays}일 Threads 게시물 수집 중...`);
  const posts = await fetchRecentPosts();
  if (posts.length === 0) {
    console.log("ℹ️  요약할 새 게시물이 없어 종료합니다.");
    return;
  }
  console.log(`   ${posts.length}개 게시물 발견`);

  // 3) Claude 로 카드 요약
  console.log("🧠 요약 생성 중...");
  const card = await summarize(posts);
  console.log(`   제목: ${card.headline}`);

  // 4) 카드 이미지 렌더링
  console.log("🎨 이미지 렌더링 중...");
  const image = await renderCardImage(card, { handle: config.slack.username });

  // 5) Slack 업로드
  console.log("📤 Slack 업로드 중...");
  await postToSlack(image, {
    title: card.headline,
    comment: `*${card.headline}*\n핵심: ${card.key}`,
  });

  console.log("✅ 완료");
}

main().catch((err) => {
  console.error("❌ 실패:", err);
  process.exit(1);
});
