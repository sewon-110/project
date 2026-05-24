# 개인 포트폴리오

미니멀/모던 스타일의 디자이너·크리에이터 포트폴리오. Next.js 16 + TypeScript + Tailwind CSS v4.

## 내용 수정하기

사이트의 모든 텍스트와 프로젝트는 **`src/data/portfolio.ts`** 한 파일에서 관리합니다.

- `profile` — 이름, 직함, 소개 문구, 이메일
- `socials` — Instagram / Behance / LinkedIn 등 링크
- `projects` — 작업물 목록 (제목, 분류, 연도, 설명, 링크, 썸네일 그라데이션)

프로젝트 썸네일은 현재 그라데이션 박스입니다. 실제 이미지를 쓰려면 `public/`에 이미지를 넣고 `src/components/Projects.tsx`에서 `<div>` 자리에 `<Image>`로 교체하면 됩니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속.

## Vercel 배포

### 방법 1 — GitHub 연동 (권장)

1. 이 폴더를 GitHub 저장소로 push
2. [vercel.com](https://vercel.com) 로그인 → **Add New > Project** → 저장소 선택
3. 설정 변경 없이 **Deploy** (Next.js 자동 인식)

이후 push할 때마다 자동 재배포됩니다.

### 방법 2 — Vercel CLI

```bash
npm i -g vercel
vercel          # 미리보기 배포
vercel --prod   # 운영 배포
```
