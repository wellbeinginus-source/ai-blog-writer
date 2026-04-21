import Link from "next/link";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* 헤더 */}
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
            AI 블로그 라이터
          </h1>
          <Link
            href="/pricing"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            가격
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-10">
        {/* 히어로 */}
        <section className="text-center py-16">
          <h2 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 leading-tight">
            키워드만 넣으면
            <br />
            <span className="text-blue-600">SEO 최적화 글</span>이 완성됩니다
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            AI가 검색 상위 노출에 최적화된 블로그 글을 자동으로
            작성해드립니다. 네이버 블로그, 워드프레스 맞춤 지원.
          </p>
          <Link
            href="/generate"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-xl text-lg hover:bg-blue-700 transition-colors"
          >
            무료로 글 생성해보기
          </Link>
          <p className="mt-3 text-sm text-zinc-400">
            무료 3회 체험 가능
          </p>
        </section>

        {/* 기능 소개 */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">&#9997;</span>
            </div>
            <h3 className="font-bold text-base mb-2 text-zinc-800 dark:text-zinc-100">
              AI 자동 글쓰기
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              키워드만 입력하면 제목, 본문, 해시태그, 메타디스크립션까지
              한 번에 생성됩니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">&#128200;</span>
            </div>
            <h3 className="font-bold text-base mb-2 text-zinc-800 dark:text-zinc-100">
              SEO 최적화
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              검색 상위 노출을 위한 키워드 배치, 소제목 구조, 키워드 밀도를
              자동으로 최적화합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">&#128203;</span>
            </div>
            <h3 className="font-bold text-base mb-2 text-zinc-800 dark:text-zinc-100">
              원클릭 복사
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              생성된 글을 제목, 본문, 해시태그별로 복사해서
              바로 블로그에 붙여넣으세요.
            </p>
          </div>
        </section>

        {/* 가격표 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-zinc-800 dark:text-zinc-100">
            합리적인 가격
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 text-center">
              <h3 className="font-bold text-lg mb-2">무료 체험</h3>
              <p className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">
                0원
              </p>
              <p className="text-sm text-zinc-500 mb-4">3회 생성</p>
              <Link
                href="/generate"
                className="block w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                시작하기
              </Link>
            </div>
            <div className="bg-blue-600 rounded-2xl p-6 text-center text-white relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-zinc-800 text-xs font-bold px-3 py-1 rounded-full">
                인기
              </span>
              <h3 className="font-bold text-lg mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-1">월 49,000원</p>
              <p className="text-sm text-blue-200 mb-4">월 30회 생성</p>
              <Link
                href="/pricing"
                className="block w-full py-3 rounded-xl bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors"
              >
                구독하기
              </Link>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 text-center">
              <h3 className="font-bold text-lg mb-2">Pro</h3>
              <p className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">
                월 99,000원
              </p>
              <p className="text-sm text-zinc-500 mb-4">월 100회 생성</p>
              <Link
                href="/pricing"
                className="block w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                구독하기
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 광고 */}
      <div className="max-w-4xl mx-auto px-5">
        <KakaoAdFit unit="DAN-oNAfbPd0GghC8yvp" width={320} height={100} />
      </div>

      {/* 푸터 */}
      <footer className="border-t border-zinc-200 dark:border-zinc-700 py-6 text-center">
        <div className="flex justify-center gap-4 text-xs text-zinc-400 mb-2">
          <a href="https://auction-calc.vercel.app" className="hover:text-zinc-600">경매 계산기</a>
          <a href="https://tax-calc-five.vercel.app" className="hover:text-zinc-600">세금 계산기</a>
          <a href="https://unsehanip.vercel.app" className="hover:text-zinc-600">운세한입</a>
        </div>
        <p className="text-xs text-zinc-400">
          운영: 온기획(ON) | js4yj@naver.com
        </p>
      </footer>
    </div>
  );
}
