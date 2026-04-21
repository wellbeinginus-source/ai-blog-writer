"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

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
      className="inline-flex items-center gap-2 border border-border px-4 py-2 text-[11px] font-medium tracking-[0.16em] uppercase text-foreground transition-colors hover:border-foreground hover:bg-surface"
    >
      <span>{copied ? "복사됨" : `${label} 복사`}</span>
    </button>
  );
}

export default function ResultPage() {
  const [result, setResult] = useState<BlogResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("blog_result");
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!mounted) {
    return null;
  }

  if (!result) {
    return (
      <>
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-5 py-24">
          <div className="text-center">
            <p className="eyebrow">No Draft</p>
            <h2 className="mt-4 font-serif type-headline text-foreground">
              아직 정리된 글이 없습니다.
            </h2>
            <Link
              href="/generate"
              className="mt-10 inline-flex items-center bg-accent px-7 py-3.5 text-[12px] font-medium tracking-[0.16em] uppercase text-background hover:bg-accent-hover"
            >
              글 만들러 가기 →
            </Link>
          </div>
        </main>
      </>
    );
  }

  const allText = `${result.title}\n\n${result.content
    .replace(/<[^>]*>/g, "")
    .trim()}\n\n${result.hashtags.map((t) => `#${t}`).join(" ")}`;

  return (
    <>
      <SiteHeader
        right={
          <div className="flex items-center gap-2">
            <CopyButton text={allText} label="전체" />
            <Link
              href="/generate"
              className="inline-flex items-center bg-accent px-4 py-2 text-[11px] font-medium tracking-[0.16em] uppercase text-background hover:bg-accent-hover"
            >
              새 글
            </Link>
          </div>
        }
      />

      <main className="flex-1">
        {/* Title header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
            <p className="eyebrow">Editor&apos;s Draft</p>
            <h1 className="mt-5 font-serif type-headline text-foreground">
              {result.title}
            </h1>
            <p className="mt-8 max-w-2xl text-[15px] leading-[1.85] text-muted">
              {result.metaDescription}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CopyButton text={result.title} label="제목" />
              <CopyButton text={result.metaDescription} label="메타" />
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="mb-10 flex items-center justify-between">
              <p className="eyebrow">Body</p>
              <CopyButton
                text={result.content.replace(/<[^>]*>/g, "").trim()}
                label="본문"
              />
            </div>
            <article
              className="prose-editorial text-[16px] sm:text-[17px]"
              dangerouslySetInnerHTML={{ __html: result.content }}
            />
          </div>
        </section>

        {/* Structure + tags */}
        <section className="border-b border-border bg-background-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
              {/* Outline */}
              <div>
                <p className="eyebrow">Structure</p>
                <h3 className="mt-3 font-serif text-xl text-foreground sm:text-2xl">
                  소제목 구조
                </h3>
                <ol className="mt-6 space-y-3 border-l border-border pl-5">
                  {result.outline.map((item, i) => (
                    <li
                      key={`${i}-${item}`}
                      className="text-[14px] leading-[1.75] text-muted"
                    >
                      <span className="mr-3 font-serif italic text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Hashtags */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="eyebrow">Hashtags</p>
                  <CopyButton
                    text={result.hashtags.map((t) => `#${t}`).join(" ")}
                    label="태그"
                  />
                </div>
                <h3 className="mt-3 font-serif text-xl text-foreground sm:text-2xl">
                  추천 해시태그
                </h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {result.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border bg-surface px-3 py-1.5 text-[13px] text-foreground-soft"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <p className="eyebrow">Next</p>
            <h2 className="mt-4 font-serif type-headline text-foreground">
              또 다른 글도,
              <br />
              정리해 드릴까요?
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center bg-accent px-7 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-background hover:bg-accent-hover"
              >
                새 글 시작 →
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center border border-border-strong px-7 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-foreground hover:bg-surface"
              >
                플랜 보기
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
