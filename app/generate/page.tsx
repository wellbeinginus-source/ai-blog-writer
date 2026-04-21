"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

type ErrorCode =
  | "bad_request"
  | "missing_key"
  | "rate_limit"
  | "quota_exceeded"
  | "auth"
  | "parse"
  | "unknown";

type ApiError = {
  code?: ErrorCode;
  error: string;
  resumeDate?: string;
};

export default function GeneratePage() {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("정보형");
  const [platform, setPlatform] = useState("naver");
  const [length, setLength] = useState(2000);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [freeCount, setFreeCount] = useState(0);

  useEffect(() => {
    setFreeCount(Number(localStorage.getItem("ai_blog_free_count") || "0"));
  }, []);

  async function handleGenerate() {
    if (!keyword.trim()) return;

    const currentCount = Number(localStorage.getItem("ai_blog_free_count") || "0");
    if (currentCount >= 3) {
      setApiError({
        code: "quota_exceeded",
        error:
          "무료 체험 3회를 모두 사용하셨습니다. 계속 이용하시려면 구독 플랜을 확인해 주세요.",
      });
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim(), tone, platform, length }),
      });

      if (!res.ok) {
        const data: ApiError = await res.json();
        setApiError(data);
        return;
      }

      const data = await res.json();
      localStorage.setItem("ai_blog_free_count", String(currentCount + 1));
      setFreeCount(currentCount + 1);
      sessionStorage.setItem("blog_result", JSON.stringify(data));
      window.location.href = "/result";
    } catch {
      setApiError({
        code: "unknown",
        error: "네트워크 연결을 확인해 주세요.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader
        right={
          <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            무료 {Math.max(0, 3 - freeCount)}회 남음
          </span>
        }
      />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
            <p className="eyebrow">Brief</p>
            <h1 className="mt-4 font-serif type-headline text-foreground">
              무엇에 관해,
              <br />
              쓰실 건가요?
            </h1>
            <p className="mt-6 type-lead text-muted">
              키워드와 몇 가지 선택지만 알려주시면,
              에디터가 초안을 정리해 돌려드립니다.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="space-y-12">
              {/* 키워드 */}
              <Field label="01" name="주제 또는 키워드" hint="짧고 명확할수록 좋습니다.">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="예: 부동산 경매 초보 가이드"
                  className="w-full border-b-2 border-border bg-transparent py-3 text-lg text-foreground placeholder:text-subtle focus:border-foreground focus:outline-none"
                />
              </Field>

              {/* 글 톤 */}
              <Field label="02" name="글의 결">
                <div className="flex flex-wrap gap-2">
                  {["정보형", "리뷰형", "경험담형", "How-to형"].map((t) => (
                    <Chip key={t} active={tone === t} onClick={() => setTone(t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </Field>

              {/* 플랫폼 */}
              <Field label="03" name="독자의 자리">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "naver", label: "네이버 블로그" },
                    { key: "wordpress", label: "워드프레스" },
                    { key: "general", label: "일반 블로그" },
                  ].map((p) => (
                    <Chip
                      key={p.key}
                      active={platform === p.key}
                      onClick={() => setPlatform(p.key)}
                      wide
                    >
                      {p.label}
                    </Chip>
                  ))}
                </div>
              </Field>

              {/* 글 길이 */}
              <Field label="04" name="원하는 분량">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 1000, label: "1,000자" },
                    { value: 2000, label: "2,000자" },
                    { value: 3000, label: "3,000자" },
                  ].map((l) => (
                    <Chip
                      key={l.value}
                      active={length === l.value}
                      onClick={() => setLength(l.value)}
                      wide
                    >
                      <span className="nowrap">{l.label}</span>
                    </Chip>
                  ))}
                </div>
              </Field>

              {/* 에러 */}
              {apiError && <ErrorPanel error={apiError} />}

              {/* 제출 */}
              <div className="pt-4">
                <button
                  onClick={handleGenerate}
                  disabled={!keyword.trim() || loading}
                  className="group inline-flex items-center bg-accent px-8 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="pulse-soft">에디터가 초안을 정리 중</span>
                    </>
                  ) : (
                    <>
                      글 만들기
                      <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </button>
                {loading && (
                  <p className="mt-6 text-[13px] leading-[1.8] text-subtle">
                    구조 잡고, 키워드 배치하고, 단락을 다듬는 중입니다.
                    <br />
                    보통 15~30초 정도 걸립니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Field({
  label,
  name,
  hint,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 flex items-baseline gap-4">
        <span className="font-serif text-base italic text-brand">{label}</span>
        <span className="text-[14px] font-medium text-foreground">{name}</span>
        {hint && <span className="text-[12px] text-subtle">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  wide = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`${wide ? "w-full" : ""} border px-5 py-3 text-[13px] font-medium transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-surface text-foreground-soft hover:border-foreground/40"
      }`}
    >
      {children}
    </button>
  );
}

function ErrorPanel({ error }: { error: ApiError }) {
  const code = error.code ?? "unknown";
  const isQuotaExceeded = code === "quota_exceeded";
  const isRateLimit = code === "rate_limit";
  const isFreeUsed = error.error.includes("무료 체험");

  return (
    <div className="border-l-2 border-danger bg-surface px-6 py-5">
      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-danger">
        {isQuotaExceeded ? "서비스 안내" : isRateLimit ? "잠시만 기다려 주세요" : "알림"}
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-foreground-soft">
        {error.error}
      </p>
      {error.resumeDate && (
        <p className="mt-2 text-[13px] text-muted">
          재개 예정: <span className="nowrap">{error.resumeDate}</span>
        </p>
      )}
      {isFreeUsed && (
        <Link
          href="/pricing"
          className="link-underline mt-4 inline-block text-[13px] font-medium tracking-[0.12em] uppercase text-foreground"
        >
          구독 플랜 보기 →
        </Link>
      )}
    </div>
  );
}
