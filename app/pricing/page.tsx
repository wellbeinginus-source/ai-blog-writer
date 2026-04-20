import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
            AI 블로그 라이터
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-zinc-800 dark:text-zinc-100">
          가격 플랜
        </h2>
        <p className="text-center text-zinc-500 dark:text-zinc-400 mb-12">
          필요한 만큼 선택하세요
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 무료 */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8">
            <h3 className="font-bold text-lg mb-4">무료 체험</h3>
            <p className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">0원</p>
            <p className="text-sm text-zinc-500 mb-6">3회 생성</p>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 mb-8">
              <li>- AI 블로그 글 생성 3회</li>
              <li>- 네이버/워드프레스 맞춤</li>
              <li>- 원클릭 복사</li>
            </ul>
            <Link
              href="/generate"
              className="block w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-bold text-sm text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              시작하기
            </Link>
          </div>

          {/* Basic */}
          <div className="bg-blue-600 rounded-2xl p-8 text-white relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-zinc-800 text-xs font-bold px-3 py-1 rounded-full">
              인기
            </span>
            <h3 className="font-bold text-lg mb-4">Basic</h3>
            <p className="text-4xl font-bold mb-1">월 49,000원</p>
            <p className="text-sm text-blue-200 mb-6">월 30회 생성</p>
            <ul className="space-y-3 text-sm text-blue-100 mb-8">
              <li>- 무료 체험 기능 전부 포함</li>
              <li>- 월 30회 글 생성</li>
              <li>- SEO 키워드 밀도 분석</li>
              <li>- 광고 없음</li>
            </ul>
            <button
              disabled
              className="block w-full py-3 rounded-xl bg-white/20 text-white font-bold text-sm text-center cursor-not-allowed"
            >
              준비 중
            </button>
          </div>

          {/* Pro */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8">
            <h3 className="font-bold text-lg mb-4">Pro</h3>
            <p className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">월 99,000원</p>
            <p className="text-sm text-zinc-500 mb-6">월 100회 생성</p>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 mb-8">
              <li>- Basic 기능 전부 포함</li>
              <li>- 월 100회 글 생성</li>
              <li>- 긴 글 (3,000자+) 지원</li>
              <li>- 우선 지원</li>
            </ul>
            <button
              disabled
              className="block w-full py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 text-zinc-400 font-bold text-sm text-center cursor-not-allowed"
            >
              준비 중
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-400 mt-8">
          결제 기능은 곧 오픈 예정입니다. 문의: js4yj@naver.com
        </p>
      </main>
    </div>
  );
}
