import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `당신은 10년 경력의 SEO 전문 블로그 라이터입니다.

## 규칙
1. 제목: 핵심 키워드를 앞쪽에 배치, 30~40자, 클릭을 유도하는 형태
2. 본문 구조: 도입부(공감 유도 2~3문장) → H2/H3 소제목 3~5개(키워드 자연 삽입) → 결론(요약+CTA)
3. 각 섹션은 200~400자
4. 키워드 밀도: 본문 대비 1.5~2.5% (자연스럽게)
5. 네이버 블로그: 구어체, 자연스러운 말투, 줄바꿈 많이
6. 워드프레스: 소제목 태그 활용, 체계적 구조
7. 본문은 HTML 형식으로 작성 (h2, h3, p, ul, li 태그 사용)

## 출력 형식 (반드시 JSON만 출력)
{
  "title": "제목",
  "metaDescription": "메타 디스크립션 155자 이내",
  "content": "<h2>소제목</h2><p>본문</p>...",
  "hashtags": ["태그1", "태그2", "태그3", "태그4", "태그5"],
  "outline": ["소제목1", "소제목2", "소제목3"]
}`;

type ErrorCode =
  | "bad_request"
  | "missing_key"
  | "rate_limit"
  | "quota_exceeded"
  | "auth"
  | "parse"
  | "unknown";

function errorResponse(code: ErrorCode, message: string, status: number, meta?: Record<string, unknown>) {
  return NextResponse.json({ code, error: message, ...meta }, { status });
}

export async function POST(req: NextRequest) {
  try {
    const { keyword, tone, platform, length } = await req.json();

    if (!keyword || typeof keyword !== "string") {
      return errorResponse("bad_request", "키워드를 입력해 주세요.", 400);
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return errorResponse("missing_key", "서비스 설정에 문제가 있습니다. 관리자에게 문의해 주세요.", 500);
    }

    const userMessage = `키워드: ${keyword}\n톤: ${tone || "정보형"}\n플랫폼: ${platform || "naver"}\n길이: ${length || 2000}자`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return errorResponse("parse", "응답을 정리하는 중 문제가 발생했습니다. 다시 시도해 주세요.", 500);
    }

    const jsonStr = text.slice(start, end + 1);
    const result = JSON.parse(jsonStr);

    return NextResponse.json(result);
  } catch (err) {
    // Anthropic SDK 에러 분류
    if (err instanceof Anthropic.APIError) {
      const raw = (err.message || "").toLowerCase();

      // Spending cap / quota exceeded
      if (raw.includes("usage limit") || raw.includes("quota")) {
        const match = (err.message || "").match(/regain access on (\d{4}-\d{2}-\d{2})/i);
        const resumeDate = match?.[1];
        return errorResponse(
          "quota_exceeded",
          "현재 서비스가 일시적으로 이용량이 많아 대기 중입니다. 잠시 후 다시 시도해 주세요.",
          503,
          resumeDate ? { resumeDate } : undefined
        );
      }

      // Rate limit
      if (err.status === 429 || raw.includes("rate limit")) {
        return errorResponse(
          "rate_limit",
          "트래픽이 몰려 잠시 대기 중입니다. 30초 후 다시 시도해 주세요.",
          429
        );
      }

      // Auth
      if (err.status === 401 || err.status === 403) {
        return errorResponse(
          "auth",
          "서비스 인증에 문제가 있습니다. 관리자에게 문의해 주세요.",
          500
        );
      }
    }

    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    console.error("[generate] error:", message);
    return errorResponse(
      "unknown",
      "글을 다듬는 중 예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      500
    );
  }
}
