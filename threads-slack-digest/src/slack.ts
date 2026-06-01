import { WebClient } from "@slack/web-api";
import { config } from "./config.js";

/** 렌더링한 카드 이미지를 Slack 채널에 업로드한다. */
export async function postToSlack(image: Buffer, opts: { title: string; comment?: string }): Promise<void> {
  const client = new WebClient(config.slack.token);

  await client.files.uploadV2({
    channel_id: config.slack.channel,
    file: image,
    filename: `threads-digest-${new Date().toISOString().slice(0, 10)}.png`,
    title: opts.title,
    initial_comment: opts.comment,
    // username / icon 은 files.uploadV2 에서 직접 지원하지 않으므로
    // 표시 이름/아이콘은 Slack 앱 설정(Display Name)에서 지정합니다.
  });
}
