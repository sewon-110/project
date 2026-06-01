/**
 * 게시 스케줄 판단.
 *
 * 요구사항: "2일에 1번, 주말 제외".
 * 가장 예측 가능한 해석으로 월·수·금에만 게시한다.
 *   월 → 수 → 금 사이 간격은 2일, 금 → 월 은 주말을 건너뛴다.
 *
 * 실제 cron 트리거는 .github/workflows/digest.yml 에서 월·수·금으로 제한하지만,
 * 수동 실행이나 cron 변경 시의 안전장치로 여기서 한 번 더 확인한다.
 */
export function shouldRunToday(now = new Date(), timeZone = "Asia/Seoul"): { run: boolean; reason: string } {
  // 지정한 타임존 기준 요일 계산 (0=일 ... 6=토)
  const weekday = new Date(now.toLocaleString("en-US", { timeZone })).getDay();

  if (weekday === 0 || weekday === 6) {
    return { run: false, reason: "주말(토/일)이라 게시하지 않습니다." };
  }
  // 월(1), 수(3), 금(5)
  if (weekday === 1 || weekday === 3 || weekday === 5) {
    return { run: true, reason: "게시일(월/수/금)입니다." };
  }
  return { run: false, reason: "게시 간격(2일) 사이 날이라 건너뜁니다." };
}
