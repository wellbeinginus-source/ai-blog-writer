import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-dark-bg text-dark-fg">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow text-dark-muted">A Service by</p>
            <h3 className="mt-4 font-serif text-2xl leading-[1.2] text-dark-fg sm:text-3xl">
              <span className="nowrap">주식회사 웰빙이너스</span>
            </h3>
            <p className="mt-4 font-serif-light text-sm italic text-dark-muted sm:text-base">
              Wellness, built into your day.
            </p>
            <a
              href="mailto:wellbeinginus@gmail.com"
              className="link-underline mt-6 inline-block text-[15px] text-dark-fg"
            >
              wellbeinginus@gmail.com
            </a>
          </div>

          <div className="lg:col-span-5">
            <p className="eyebrow text-dark-muted">Explore</p>
            <ul className="mt-4 space-y-2 text-[14px] text-dark-fg">
              <li>
                <Link href="/" className="link-underline">
                  에디터 소개
                </Link>
              </li>
              <li>
                <Link href="/generate" className="link-underline">
                  글 작성하기
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="link-underline">
                  이용 플랜
                </Link>
              </li>
              <li>
                <a
                  href="https://wellbeingin.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  웰빙이너스 공식 ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-dark-border pt-8">
          <div className="flex flex-col gap-3 text-[11px] leading-relaxed text-dark-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year}{" "}
              <span className="nowrap">주식회사 웰빙이너스.</span>{" "}
              <span className="nowrap">All rights reserved.</span>
            </p>
            <p className="tracking-[0.22em]">WELLBEINGINUS · EDITOR</p>
          </div>
          <p className="mt-3 text-[11px] leading-[1.8] text-dark-muted/80">
            <span className="nowrap">주식회사 웰빙이너스</span>
            <span className="mx-2 text-dark-muted/50">·</span>
            <span className="nowrap">대표 하윤지</span>
            <span className="mx-2 text-dark-muted/50">·</span>
            <span className="nowrap">사업자등록번호 570-86-03233</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
