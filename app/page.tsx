import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const FEATURES = [
  {
    kicker: "Structure",
    title: "검색 구조에 맞춘 설계",
    body: "키워드 위치, 소제목 계층, 단락 길이, 키워드 밀도 — SEO가 요구하는 뼈대에 맞춰 초안이 조립됩니다.",
  },
  {
    kicker: "Voice",
    title: "플랫폼에 맞는 톤",
    body: "네이버 블로그의 구어체, 워드프레스의 정돈된 어조. 타겟 독자의 눈높이에 맞는 목소리로 다듬어 드립니다.",
  },
  {
    kicker: "Delivery",
    title: "바로 쓸 수 있는 형태",
    body: "제목·메타·본문·해시태그·소제목 구조까지, 붙여넣기만 하면 되는 완성된 포맷으로 전달합니다.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 pt-20 pb-20 sm:px-8 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
            <p className="eyebrow enter">
              <span className="nowrap">A Service by</span>
              <span className="mx-1.5">·</span>
              <span className="nowrap">주식회사 웰빙이너스</span>
            </p>

            <h1 className="mt-10 font-serif type-display text-foreground enter delay-100">
              쓰고 싶었지만,
              <br />
              시간이 <span className="text-brand">없었던</span> 글.
            </h1>

            <p className="mt-8 font-serif-light text-xl italic text-muted sm:text-[1.5rem] enter delay-200">
              The words you meant to write.
            </p>

            <div className="mt-14 max-w-2xl enter delay-300">
              <p className="type-lead text-muted">
                웰빙이너스 에디터는 당신의 키워드에서 출발해,
                검색에 노출되고 읽히는 글 한 편을 완성해 돌려드립니다.
              </p>
              <p className="type-lead mt-5 text-muted">
                제목·본문·메타 디스크립션·해시태그까지 ―
                다듬을 시간이 없는 날, 에디터가 초안을 대신 정리합니다.
              </p>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-3 enter delay-300">
              <Link
                href="/generate"
                className="group inline-flex items-center bg-accent px-7 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-background transition-colors hover:bg-accent-hover"
              >
                글 쓰기 시작
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center border border-border-strong px-7 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-foreground transition-colors hover:bg-surface"
              >
                이용 플랜 보기
              </Link>
            </div>

            <p className="mt-10 text-[13px] text-subtle">
              무료 3회 체험 제공 · 결제 정보 입력 불필요
            </p>
          </div>
        </section>

        {/* ── Features ────────────────────── */}
        <section className="border-b border-border bg-background-alt">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
            <div className="mb-16 max-w-2xl sm:mb-20">
              <p className="eyebrow">What We Do</p>
              <h2 className="mt-4 font-serif type-headline text-foreground">
                AI가 쓰는 글이 아니라,
                <br />
                에디터가 정리한 글.
              </h2>
              <p className="mt-8 type-lead text-muted">
                우리는 자동 생성된 결과물을 그대로 내보내지 않습니다.
                SEO 기준과 플랫폼별 관용에 맞춰
                매번 같은 품질의 초안이 나오도록 구조를 설계했습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 border-t border-l border-border bg-surface sm:grid-cols-3">
              {FEATURES.map((f, i) => (
                <article
                  key={f.title}
                  className="flex flex-col border-r border-b border-border p-8 sm:p-10 lg:p-12"
                >
                  <p className="font-serif text-3xl italic text-brand sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="eyebrow mt-8">{f.kicker}</p>
                  <h3 className="mt-3 font-serif text-xl text-foreground sm:text-2xl">
                    {f.title}
                  </h3>
                  <p className="mt-5 flex-1 text-[14px] leading-[1.9] text-muted">
                    {f.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing teaser ──────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-5">
                <p className="eyebrow">Pricing</p>
                <h2 className="mt-4 font-serif type-headline text-foreground">
                  필요한 만큼,
                  <br />
                  부담 없이.
                </h2>
                <p className="mt-8 type-lead text-muted">
                  가볍게 시작할 수 있는 무료 체험과,
                  꾸준히 쓰는 분을 위한 두 가지 구독 플랜을 준비했습니다.
                </p>
                <Link
                  href="/pricing"
                  className="link-underline mt-10 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.16em] uppercase text-foreground"
                >
                  플랜 자세히 보기 <span>→</span>
                </Link>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <PlanTeaser name="Free" price="0원" detail="3회 체험" />
                  <PlanTeaser name="Basic" price="월 49,000원" detail="월 30회" highlight />
                  <PlanTeaser name="Pro" price="월 99,000원" detail="월 100회" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function PlanTeaser({
  name,
  price,
  detail,
  highlight = false,
}: {
  name: string;
  price: string;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`border p-6 transition-colors ${
        highlight
          ? "border-brand bg-brand-wash"
          : "border-border bg-surface hover:bg-background-alt"
      }`}
    >
      <p className={`eyebrow ${highlight ? "text-brand" : ""}`}>{name}</p>
      <p className="mt-6 font-serif text-2xl text-foreground sm:text-[1.625rem]">
        <span className="nowrap">{price}</span>
      </p>
      <p className="mt-1 text-[13px] text-muted">
        <span className="nowrap">{detail}</span>
      </p>
    </div>
  );
}
