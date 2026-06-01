import "dotenv/config";

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`환경변수 ${name} 가 설정되어 있지 않습니다. .env 또는 GitHub Secrets 를 확인하세요.`);
  return v;
}

function optional(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export const config = {
  threads: {
    accessToken: required("THREADS_ACCESS_TOKEN"),
    userId: optional("THREADS_USER_ID", "me"),
  },
  anthropic: {
    apiKey: required("ANTHROPIC_API_KEY"),
    model: optional("MODEL", "claude-sonnet-4-6"),
  },
  slack: {
    token: required("SLACK_BOT_TOKEN"),
    channel: required("SLACK_CHANNEL_ID"),
    username: process.env.SLACK_USERNAME || undefined,
    iconEmoji: process.env.SLACK_ICON_EMOJI || undefined,
  },
  lookbackDays: Number(optional("LOOKBACK_DAYS", "2")),
  forceRun: optional("FORCE_RUN", "false").toLowerCase() === "true",
};

export type Config = typeof config;
