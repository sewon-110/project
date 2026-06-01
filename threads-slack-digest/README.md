# Threads → Slack 다이제스트

본인 **Threads(메타)** 계정에 올라온 글들을 **Claude** 로 요약하고,
첨부 레퍼런스 같은 **카드 이미지**로 만들어 **Slack 채널**에 자동 게시합니다.
**월·수·금**(2일 간격, 주말 제외)에 GitHub Actions 가 자동 실행합니다.

```
Threads API → Claude 요약 → HTML/CSS 카드 → Playwright PNG → Slack 업로드
```

## 동작 흐름

1. `schedule.ts` — 오늘이 게시일(월/수/금)인지 판단. 주말이면 건너뜀.
2. `threads.ts` — 최근 `LOOKBACK_DAYS`(기본 2일)치 내 Threads 글 수집.
3. `summarize.ts` — Claude 로 카드 데이터(headline / cards / 핵심)로 요약.
4. `template.ts` + `render.ts` — 카드 HTML 을 1080×1350 PNG 로 렌더링.
5. `slack.ts` — Slack 채널에 이미지 업로드.

## 로컬 실행

```bash
cd threads-slack-digest
npm install
npx playwright install chromium
cp .env.example .env   # 값 채우기

npm run preview        # API 없이 샘플 카드 → out/preview.png (디자인 확인용)
npm start              # 실제 수집 → 요약 → Slack 게시
```

> `npm start` 는 스케줄 가드가 있어 월/수/금에만 실제로 게시합니다.
> 요일과 무관하게 테스트하려면 `.env` 에 `FORCE_RUN=true`.

## 필요한 키 / 설정

### 1. Threads 액세스 토큰 (`THREADS_ACCESS_TOKEN`)
- https://developers.facebook.com/docs/threads 에서 Threads 앱 생성 후 토큰 발급.
- 권한 scope: `threads_basic`.
- 공식 API 는 **토큰 소유 계정 본인의 글만** 읽을 수 있습니다.
  (남의 공개 계정 수집은 공식 API 로 불가 — 별도 논의 필요)

### 2. Claude API (`ANTHROPIC_API_KEY`)
- https://console.anthropic.com 에서 발급. 기본 모델 `claude-sonnet-4-6`.

### 3. Slack (`SLACK_BOT_TOKEN`, `SLACK_CHANNEL_ID`)
- https://api.slack.com/apps 에서 앱 생성 → **OAuth & Permissions** 에서 봇 scope
  `chat:write`, `files:write` 추가 → 워크스페이스 설치 → `xoxb-...` 토큰 복사.
- 봇을 게시할 채널에 초대(`/invite @봇이름`).
- 채널 ID 는 채널 이름 우클릭 → "링크 복사" 의 끝부분(`C...`).
- 표시 이름/아이콘은 Slack 앱 설정의 **Display Name / Icon** 에서 지정합니다.

## GitHub Actions 자동화

워크플로: [`.github/workflows/digest.yml`](../.github/workflows/digest.yml)
(GitHub Actions 는 레포 루트의 `.github/workflows` 만 인식하므로 루트에 둡니다.)

리포지토리 **Settings → Secrets and variables → Actions** 에 등록:

| 종류 | 이름 |
|------|------|
| Secret | `THREADS_ACCESS_TOKEN`, `ANTHROPIC_API_KEY`, `SLACK_BOT_TOKEN`, `SLACK_CHANNEL_ID` |
| Secret (선택) | `THREADS_USER_ID` |
| Variable | `MODEL`, `SLACK_USERNAME`, `SLACK_ICON_EMOJI`, `LOOKBACK_DAYS` |

- **스케줄**: `cron: "0 0 * * 1,3,5"` = 매주 월·수·금 09:00 KST.
  GitHub cron 은 UTC 기준이라 00:00 UTC 로 설정되어 있습니다.
- **수동 실행**: Actions 탭 → 이 워크플로 → *Run workflow* (강제 실행됨).

## 스케줄을 바꾸고 싶다면

`digest.yml` 의 cron 과 `src/schedule.ts` 의 요일 조건을 함께 수정하세요.
(예: 매일 → `0 0 * * 1-5`, schedule.ts 에서 월·수·금 제한 제거)
