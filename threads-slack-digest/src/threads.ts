import { config } from "./config.js";

const GRAPH_BASE = "https://graph.threads.net/v1.0";

export interface ThreadsPost {
  id: string;
  text: string;
  permalink?: string;
  timestamp: string;
}

/**
 * 본인 Threads 계정에 최근 lookbackDays 일 동안 올라온 게시물을 가져온다.
 * 공식 Threads API(Graph) 사용 — 토큰 소유 계정의 글만 읽을 수 있다.
 * 참고: https://developers.facebook.com/docs/threads/threads-media#retrieve-a-list-of-all-a-user-s-threads
 */
export async function fetchRecentPosts(lookbackDays = config.lookbackDays): Promise<ThreadsPost[]> {
  const since = Math.floor((Date.now() - lookbackDays * 24 * 60 * 60 * 1000) / 1000);
  const params = new URLSearchParams({
    fields: "id,text,permalink,timestamp,media_type",
    since: String(since),
    limit: "50",
    access_token: config.threads.accessToken,
  });

  const url = `${GRAPH_BASE}/${encodeURIComponent(config.threads.userId)}/threads?${params}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Threads API 오류 (${res.status}): ${body}`);
  }

  const json = (await res.json()) as { data?: Array<Record<string, unknown>> };
  const posts = (json.data ?? [])
    .map((p) => ({
      id: String(p.id),
      text: typeof p.text === "string" ? p.text : "",
      permalink: typeof p.permalink === "string" ? p.permalink : undefined,
      timestamp: String(p.timestamp ?? ""),
    }))
    // 텍스트가 있는 글만 (사진/영상만 있는 글 제외)
    .filter((p) => p.text.trim().length > 0);

  return posts;
}
