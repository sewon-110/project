// 포트폴리오 콘텐츠 — 이 파일만 수정하면 사이트 전체 내용이 바뀝니다.
// ⚠️ name / email / socials 는 본인 정보로 바꿔주세요.

export const profile = {
  name: "이름",
  role: "Visual Designer · Game Marketing",
  // Hero 영역의 큰 문구 (\n 으로 줄바꿈)
  tagline: "게임의 세계를\n한 장의 이미지로 압축합니다.",
  // About 문단
  about:
    "PUBG, NEW STATE, inZOI 등 글로벌 게임 IP의 마케팅 비주얼을 만들어 온 디자이너입니다. 키비주얼·프로모션·콜라보·이벤트 페이지·인게임 UI까지, 브랜드의 톤을 지키면서 플레이어의 시선을 사로잡는 그래픽을 설계합니다.",
  email: "iswony110@gmail.com",
  location: "Seoul, KR",
};

export const socials: { label: string; href: string }[] = [
  { label: "Behance", href: "https://behance.net/" },
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

export type Work = {
  title: string;
  category: string;
  year: string;
  src: string; // /work/ 아래 파일
  width: number;
  height: number;
  // 세로로 아주 긴 웹페이지 캡처는 카드에서 상단만 크롭해서 보여줍니다.
  tall?: boolean;
};

// 최신·임팩트 순으로 정렬. public/work/ 의 이미지를 가리킵니다.
export const works: Work[] = [
  { title: "PUBG × aespa — PNC 2025 Special Stage", category: "Collaboration", year: "2025", src: "/work/pubg-aespa-pnc-2025.png", width: 1080, height: 1350 },
  { title: "KRAFTON G-STAR 2022 Key Visual", category: "Brand · Key Visual", year: "2022", src: "/work/gstar-2022-black.jpg", width: 3840, height: 2160 },
  { title: "PUBG Contender — FIRST", category: "Skin Promotion", year: "2025", src: "/work/pubg-contender-first-1.png", width: 1080, height: 1350 },
  { title: "PGC 2023 Bangkok", category: "Esports · Key Visual", year: "2023", src: "/work/pgc-2023-bangkok.webp", width: 1400, height: 1064 },
  { title: "PUBG: Rondo — Brotherhood", category: "Key Visual", year: "2023", src: "/work/pubg-rondo-brotherhood-alpha.png", width: 1920, height: 1080 },
  { title: "inZOI MOD Update Roadmap", category: "Infographic", year: "2025", src: "/work/inzoi-mod-roadmap.png", width: 1920, height: 1080 },
  { title: "PUBG Gunplay Update", category: "Update Graphic", year: "2024", src: "/work/pubg-gunplay-update.png", width: 1080, height: 1080 },
  { title: "Dinkum — Nintendo eShop", category: "Key Visual", year: "2022", src: "/work/dinkum-nintendo-switch.png", width: 3840, height: 2160 },
  { title: "PUBG — Are You Ready?", category: "Key Visual", year: "2022", src: "/work/pubg-are-you-ready.jpg", width: 1080, height: 1080 },
  { title: "PUBG × Street Fighter", category: "Collaboration", year: "2023", src: "/work/pubg-street-fighter.jpg", width: 1080, height: 1080 },
  { title: "PUBG — The Guardians Teaser", category: "Promotion", year: "2023", src: "/work/pubg-the-guardians.png", width: 1080, height: 1080 },
  { title: "PUBG — Yule Sleigh Progressive Skin", category: "Skin Promotion", year: "2021", src: "/work/pubg-yule-sleigh.png", width: 1080, height: 1080 },
  { title: "PUBG 5th × Spotify Playlist", category: "Collaboration", year: "2022", src: "/work/pubg-spotify-playlist.png", width: 1080, height: 1080 },
  { title: "PUBG 7th Anniversary Event", category: "Web · Event Page", year: "2024", src: "/work/pubg-7th-anniversary-pc.jpg", width: 2560, height: 8366, tall: true },
  { title: "NEW STATE MOBILE — Season 4 Rewards", category: "Promotion", year: "2022", src: "/work/newstate-season4.png", width: 1080, height: 1080 },
  { title: "PUBG NEW STATE — Global Launch #1", category: "Launch Campaign", year: "2021", src: "/work/newstate-launch-01.png", width: 1080, height: 1080 },
  { title: "PUBG NEW STATE — Global Launch #2", category: "Launch Campaign", year: "2021", src: "/work/newstate-launch-02.png", width: 1080, height: 1080 },
  { title: "PUBG NEW STATE — Global Launch #3", category: "Launch Campaign", year: "2021", src: "/work/newstate-launch-03.png", width: 1080, height: 1080 },
  { title: "PUBG 25.2 Live Server Open", category: "Promotion", year: "2023", src: "/work/pubg-liveserver-25-2.png", width: 1080, height: 1350 },
  { title: "PUBG 17.2 Test Server Open", category: "Promotion", year: "2022", src: "/work/pubg-testserver-17-2.png", width: 1080, height: 1080 },
  { title: "PUBG 12.1 Test Server Open", category: "Promotion", year: "2021", src: "/work/pubg-testserver-12-1.png", width: 1080, height: 1080 },
  { title: "PUBG 11.2 Test Server Open", category: "Promotion", year: "2021", src: "/work/pubg-testserver-11-2.png", width: 1080, height: 1080 },
  { title: "PUBG — Coupon Event", category: "Promotion", year: "2021", src: "/work/pubg-wsus-coupon.png", width: 1080, height: 1080 },
  { title: "Palworld Mobile — Notice Banners", category: "Web · Banner", year: "2025", src: "/work/palworld-mobile-notices.jpg", width: 3840, height: 3769 },
];
