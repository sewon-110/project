// 포트폴리오 콘텐츠 — 이 파일만 수정하면 사이트 전체 내용이 바뀝니다.
// ⚠️ name / email / socials 는 본인 정보로 바꿔주세요.

export const profile = {
  name: "이름",
  role: "Visual Designer, Game Marketing",
  // Hero 영역의 큰 문구 (\n 으로 줄바꿈)
  tagline: "Creative,\nAlways",
  // About 문단
  about:
    "PUBG, NEW STATE, inZOI 등 글로벌 게임 IP의 마케팅 비주얼을 만들어 온 디자이너입니다. 키비주얼, 프로모션, 콜라보, 이벤트 페이지, 인게임 UI까지, 브랜드의 톤을 지키면서 플레이어의 시선을 사로잡는 그래픽을 설계합니다.",
  // 히어로 서브 문구 (친절한 인사 톤, \n 으로 줄바꿈)
  subtitle:
    "안녕하세요, 게임의 첫인상을 디자인하는 비주얼 디자이너입니다.\n키비주얼부터 프로모션, 웹, UI까지, 브랜드의 설렘을 한 장면에 담아요.\n편하게 둘러봐 주세요 :)",
  email: "iswony110@gmail.com",
  location: "Seoul, KR",
};

// Hero — 왼쪽 큰 단어 + 오른쪽 괄호 안 문구 리스트
export const heroWord = "I WORK ON";
export const heroPhrases = [
  "Game Marketing",
  "Key Visuals",
  "UI/UX",
  "Web Promotion",
];

// Work Process — 화이트 섹션 (수정해서 쓰세요). img 는 /work/ 아래 파일 경로(선택)
export const process: { step: string; title: string; desc: string; img?: string }[] = [
  { step: "01", title: "Build & Shoot", desc: "게임 빌드 안에서 직접 컷을 세팅하고, 인게임으로 촬영해 소스를 만듭니다." },
  { step: "02", title: "Compositing", desc: "촬영 소스를 합성하고 리터칭해 한 장면으로 정리합니다." },
  { step: "03", title: "Design", desc: "타이포와 레이아웃을 더해 최종 비주얼로 완성합니다." },
];

export const socials: { label: string; href: string }[] = [
  { label: "Behance", href: "https://behance.net/" },
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

export type Work = {
  title: string;
  category: string;
  year: string;
  src: string; // /work/ 아래 파일 (대표 이미지)
  images?: string[]; // 여러 장이면 상세에서 모두 표시 (없으면 src 1장)
  width: number;
  height: number;
  // 선택 시 오른쪽에 표시되는 세부 설명
  description: string;
  // 세로로 아주 긴 웹페이지 캡처는 상단만 크롭해서 보여줍니다.
  tall?: boolean;
  // 목업 표시 방식: slide(좌우 캐러셀) / scroll(긴 페이지 세로 스크롤)
  mockup?: "slide" | "scroll";
  // 명시적 그룹 라벨 — 큰 작업도 이 라벨로 리스트에서 묶임
  group?: string;
  // 리스트 우측에 표시할 클라이언트 (기본 KRAFTON)
  client?: string;
};

// 최신·임팩트 순으로 정렬. public/work/ 의 이미지를 가리킵니다.
export const works: Work[] = [
  { title: "KRAFTON AI WEB", category: "Web", year: "2026", src: "", images: [], width: 1920, height: 1080, description: "KRAFTON의 AI 웹 서비스입니다. 이미지는 준비 중이며, 스크린샷을 주시면 넣어드리겠습니다." },
  { title: "PUBG Contender — FIRST", category: "PUBG Social Marketing", year: "2025", src: "/work/pubg-contender-first-1.png", width: 1080, height: 1350, description: "PUBG 'Contender' 스킨 출시 프로모션입니다. 캐릭터와 아이템을 강조한 세로형 키 컷으로 디자인했습니다." },
  { title: "PUBG E-SPORTS Board", category: "Esports Key Visual", year: "2023", src: "/work/pgc-2023-bangkok.webp", images: ["/work/pgc-2023-bangkok.webp", "/work/esports-1.webp", "/work/esports-2.webp", "/work/esports-3.webp", "/work/esports-4.webp"], width: 1400, height: 1064, description: "PUBG e스포츠 보드와 키비주얼 모음입니다. PGC 2023 방콕을 비롯한 대회 비주얼을 작업했습니다." },
  { title: "PUBG: Rondo — Brotherhood", category: "Key Visual", year: "2023", src: "/work/pubg-rondo-brotherhood-alpha.png", images: ["/work/pubg-rondo-brotherhood-alpha.png", "/work/pubg-rondo-brotherhood-beta.png"], width: 1920, height: 1080, group: "PUBG Key Visual", description: "신규 맵 Rondo의 'Brotherhood' 캐릭터 키비주얼입니다. 알파와 베타 팀 구성으로 세계관과 캐릭터 서사를 확장했습니다." },
  { title: "PUBG Gunplay Update", category: "PUBG Social Marketing", year: "2024", src: "/work/pubg-gunplay-update.png", width: 1080, height: 1080, description: "PUBG 총기 플레이 업데이트 안내 그래픽입니다. 무기별 변경 수치를 직관적인 정보 레이아웃으로 정리했습니다." },
  { title: "PUBG — Are You Ready?", category: "PUBG Social Marketing", year: "2022", src: "/work/pubg-are-you-ready.jpg", width: 1080, height: 1080, description: "PUBG 시즌 키비주얼 'Are You Ready?'입니다. 전장의 긴장감을 한 장면으로 압축했습니다." },
  { title: "PUBG × Street Fighter", category: "PUBG Social Marketing", year: "2023", src: "/work/pubg-street-fighter.jpg", width: 1080, height: 1080, description: "PUBG와 Street Fighter의 콜라보 프로모션입니다. 두 IP의 캐릭터성을 균형 있게 배치했습니다." },
  { title: "PUBG — The Guardians Teaser", category: "PUBG Social Marketing", year: "2023", src: "/work/pubg-the-guardians.png", width: 1080, height: 1080, description: "'The Guardians' 컬렉션 티저입니다. 사신수 모티프 카드로 호기심을 유발했습니다." },
  { title: "PUBG — Yule Sleigh Progressive Skin", category: "PUBG Social Marketing", year: "2021", src: "/work/pubg-yule-sleigh.png", width: 1080, height: 1080, description: "성장형 스킨 'Yule Sleigh' 프로모션입니다. 크리스마스 무드의 디오라마로 연출했습니다." },
  { title: "PUBG 5th × Spotify Playlist", category: "PUBG Social Marketing", year: "2022", src: "/work/pubg-spotify-playlist.png", width: 1080, height: 1080, description: "PUBG 5주년과 Spotify의 플레이리스트 콜라보입니다. 음악과 게임 무드를 결합해 디자인했습니다." },
  { title: "PUBG 25.2 Live Server Open", category: "PUBG Social Marketing", year: "2023", src: "/work/pubg-liveserver-25-2.png", width: 1080, height: 1350, description: "25.2 라이브 서버 오픈 프로모션입니다. 업데이트 핵심을 세로형 카드로 전달했습니다." },
  { title: "PUBG 17.2 Test Server Open", category: "PUBG Social Marketing", year: "2022", src: "/work/pubg-testserver-17-2.png", width: 1080, height: 1080, description: "17.2 테스트 서버 오픈 카드입니다. 반복 운용되는 업데이트 고지 템플릿으로 제작했습니다." },
  { title: "PUBG 12.1 Test Server Open", category: "PUBG Social Marketing", year: "2021", src: "/work/pubg-testserver-12-1.png", width: 1080, height: 1080, description: "12.1 테스트 서버 오픈 카드입니다. 시리즈 일관성을 가진 고지 비주얼로 작업했습니다." },
  { title: "PUBG 11.2 Test Server Open", category: "PUBG Social Marketing", year: "2021", src: "/work/pubg-testserver-11-2.png", width: 1080, height: 1080, description: "11.2 테스트 서버 오픈 카드입니다. 인게임 무드를 살려 업데이트를 고지했습니다." },
  { title: "PUBG — Coupon Event", category: "PUBG Social Marketing", year: "2021", src: "/work/pubg-wsus-coupon.png", width: 1080, height: 1080, description: "쿠폰 이벤트 프로모션입니다. 참여를 유도하는 직관적인 메시지로 구성했습니다." },
  { title: "PUBG 42.1 Map Selection Announcement", category: "Key Visual", year: "2026", src: "/work/pubg-map-selection-42-1.jpg", width: 1920, height: 1080, group: "PUBG Key Visual", description: "PUBG 42.1 맵 셀렉션 시스템 안내 그래픽입니다." },
  { title: "KRAFTON Gamer Profile", category: "Product UI", year: "2025", src: "/work/krafton-gamer-profile.png", images: ["/work/krafton-gamer-profile.png", "/work/krafton-mingling.png"], width: 2560, height: 2042, mockup: "slide", description: "KRAFTON 게이머 프로필과 밍글링 UI입니다. 플레이 데이터와 관심 장르 노출부터 취향 기반 매칭, 호환도 시각화까지 소셜 프로필 경험을 설계했습니다." },
  { title: "검은사막 신규캐릭터 아처", category: "Web", year: "2020", src: "/work/kakao-01.webp", images: ["/work/kakao-01.webp"], width: 1920, height: 1080, client: "kakaogames", description: "검은사막 신규 캐릭터 '아처' 출시 웹 프로모션입니다." },
  { title: "검은사막 천만의 선택", category: "Web", year: "2019", src: "/work/kakao-02.webp", images: ["/work/kakao-02.webp"], width: 1920, height: 1080, client: "kakaogames", description: "검은사막 '천만의 선택' 캠페인 웹 디자인입니다." },
];
