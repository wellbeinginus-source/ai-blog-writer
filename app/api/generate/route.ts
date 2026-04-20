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

export async function POST(req: NextRequest) {
  try {
    const { keyword, tone, platform, length } = await req.json();

    if (!keyword || typeof keyword !== "string") {
      return NextResponse.json({ error: "키워드를 입력해주세요." }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
    }

    const userMessage = `키워드: ${keyword}\n톤: ${tone || "정보형"}\n플랫폼: ${platform || "naver"}\n길이: ${length || 2000}자`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-5-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    // JSON 추출 (Claude가 JSON 외 텍스트를 덧붙일 수 있으므로 brace 매칭)
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return NextResponse.json({ error: "AI 응답을 파싱할 수 없습니다." }, { status: 500 });
    }

    const jsonStr = text.slice(start, end + 1);
    const result = JSON.parse(jsonStr);

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
