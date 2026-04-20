"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BlogResult {
  title: string;
  metaDescription: string;
  content: string;
  hashtags: string[];
  outline: string[];
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
    >
      {copied ? "복사됨!" : `${label} 복사`}
    </button>
  );
}

export default function ResultPage() {
  const [result, setResult] = useState<BlogResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("blog_result");
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            생성된 글이 없습니다
          </p>
          <Link
            href="/generate"
            className="text-blue-600 hover:underline"
          >
            글 생성하러 가기
          </Link>
        </div>
      </div>
    );
  }

  const allText = `${result.title}\n\n${result.content.replace(/<[^>]*>/g, "")}\n\n${result.hashtags.map((t) => `#${t}`).join(" ")}`;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
            AI 블로그 라이터
          </Link>
          <div className="flex gap-2">
            <CopyButton text={allText} label="전체" />
            <Link
              href="/generate"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              새 글 생성
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8 space-y-6">
        {/* 제목 */}
        <section className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              제목
            </h3>
            <CopyButton text={result.title} label="제목" />
          </div>
          <p className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
            {result.title}
          </p>
        </section>

        {/* 메타 디스크립션 */}
        <section className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              메타 디스크립션
            </h3>
            <CopyButton text={result.metaDescription} label="메타" />
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {result.metaDescription}
          </p>
        </section>

        {/* 본문 */}
        <section className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              본문
            </h3>
            <CopyButton
              text={result.content.replace(/<[^>]*>/g, "")}
              label="본문"
            />
          </div>
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: result.content }}
          />
        </section>

        {/* 해시태그 */}
        <section className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              해시태그
            </h3>
            <CopyButton
              text={result.hashtags.map((t) => `#${t}`).join(" ")}
              label="태그"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {result.hashtags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* 소제목 구조 */}
        <section className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
            글 구조 (소제목)
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
            {result.outline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-700 py-6 text-center">
        <p className="text-xs text-zinc-400">
          운영: 온기획(ON) | js4yj@naver.com
        </p>
      </footer>
    </div>
  );
}
