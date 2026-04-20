"use client";

import { useState } from "react";
import Link from "next/link";

export default function GeneratePage() {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("정보형");
  const [platform, setPlatform] = useState("naver");
  const [length, setLength] = useState(2000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!keyword.trim()) return;

    // 무료 횟수 체크
    const count = Number(localStorage.getItem("ai_blog_free_count") || "0");
    if (count >= 3) {
      setError("무료 체험 3회를 모두 사용했습니다. 구독 후 이용해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim(), tone, platform, length }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "생성에 실패했습니다.");
      }

      const data = await res.json();

      // 무료 횟수 증가
      localStorage.setItem("ai_blog_free_count", String(count + 1));

      // 결과를 sessionStorage에 저장 후 이동
      sessionStorage.setItem("blog_result", JSON.stringify(data));
      window.location.href = "/result";
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const freeCount = typeof window !== "undefined"
    ? Number(localStorage.getItem("ai_blog_free_count") || "0")
    : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
            AI 블로그 라이터
          </Link>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            무료 {Math.max(0, 3 - freeCount)}회 남음
          </span>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-8">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">
          블로그 글 생성
        </h2>

        <div className="space-y-5">
          {/* 키워드 */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              키워드
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="예: 부동산 경매 초보 가이드"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-sm bg-white dark:bg-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* 글 톤 */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              글 톤
            </label>
            <div className="flex flex-wrap gap-2">
              {["정보형", "리뷰형", "경험담형", "How-to형"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tone === t
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 플랫폼 */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              타겟 플랫폼
            </label>
            <div className="flex gap-2">
              {[
                { key: "naver", label: "네이버 블로그" },
                { key: "wordpress", label: "워드프레스" },
                { key: "general", label: "일반" },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPlatform(p.key)}
                  className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    platform === p.key
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 글 길이 */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              글 길이
            </label>
            <div className="flex gap-2">
              {[
                { value: 1000, label: "1,000자" },
                { value: 2000, label: "2,000자" },
                { value: 3000, label: "3,000자" },
              ].map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLength(l.value)}
                  className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    length === l.value
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* 에러 */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
              {error}
              {error.includes("구독") && (
                <Link href="/pricing" className="block mt-2 text-blue-600 underline">
                  구독 플랜 보기
                </Link>
              )}
            </div>
          )}

          {/* 생성 버튼 */}
          <button
            onClick={handleGenerate}
            disabled={!keyword.trim() || loading}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "AI가 글을 작성하고 있어요..." : "글 생성하기"}
          </button>

          {loading && (
            <p className="text-center text-sm text-zinc-400">
              보통 10~20초 정도 걸립니다
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
