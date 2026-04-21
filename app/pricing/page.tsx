import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const PLANS = [
  {
    key: "free",
    name: "무료 체험",
    priceLabel: "0원",
    perLabel: "3회 한정",
    description: "부담 없이 결과물의 결을 확인해 보세요.",
    features: [
      "블로그 글 3회 생성",
      "네이버·워드프레스 맞춤",
      "제목·본문·해시태그 전체 제공",
      "원클릭 복사",
    ],
    cta: { label: "시작하기", href: "/generate", variant: "outline" as const },
    disabled: false,
  },
  {
    key: "basic",
    name: "Basic",
    priceLabel: "월 49,000원",
    perLabel: "월 30회",
    description: "꾸준히 쓰시는 분을 위한 기본 플랜.",
    features: [
      "무료 체험 기능 전체 포함",
      "월 30회 글 생성",
      "SEO 키워드 밀도 분석",
      "광고 없음",
    ],
    cta: { label: "준비 중", href: "#", variant: "muted" as const },
    highlight: true,
    disabled: true,
  },
  {
    key: "pro",
    name: "Pro",
    priceLabel: "월 99,000원",
    perLabel: "월 100회",
    description: "전문 블로거·마케터를 위한 확장 플랜.",
    features: [
      "Basic 기능 전체 포함",
      "월 100회 글 생성",
      "긴 글(3,000자+) 지원",
      "우선 문의 지원",
    ],
    cta: { label: "준비 중", href: "#", variant: "outline" as const },
    disabled: true,
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-28">
            <div className="max-w-2xl">
              <p className="eyebrow">Pricing</p>
              <h1 className="mt-4 font-serif type-headline text-foreground">
                필요한 만큼,
                <br />
                부담 없이.
              </h1>
              <p className="mt-8 type-lead text-muted">
                처음 한 번, 일주일에 한 편, 매일 한 편.
                쓰는 빈도에 맞춰 선택하실 수 있도록 세 가지 플랜을 준비했습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="border-b border-border bg-background-alt">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid grid-cols-1 gap-0 border-t border-l border-border bg-surface sm:grid-cols-3">
              {PLANS.map((plan) => {
                const { key, ...rest } = plan;
                return <PlanCard key={key} {...rest} />;
              })}
            </div>

            <p className="mt-10 text-center text-[13px] leading-[1.8] text-subtle">
              결제 연동은 순차적으로 열립니다.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              문의:{" "}
              <a
                href="mailto:wellbeinginus@gmail.com"
                className="link-underline text-foreground-soft"
              >
                wellbeinginus@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="mb-12 sm:mb-16">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 font-serif type-headline text-foreground">
                자주 묻는 질문
              </h2>
            </div>
            <dl className="divide-y divide-border border-y border-border">
              <FaqItem
                q="생성된 글의 저작권은 누구에게 있나요?"
                a="생성된 결과물의 이용 권한은 전적으로 사용자에게 있습니다. 자유롭게 블로그·사이트에 게시하실 수 있습니다."
              />
              <FaqItem
                q="무료 체험은 어떻게 제공되나요?"
                a="결제 정보 입력 없이 3회까지 이용하실 수 있습니다. 횟수는 사용하시는 브라우저 기준으로 관리됩니다."
              />
              <FaqItem
                q="글의 톤과 플랫폼은 어떻게 다른가요?"
                a="네이버 블로그는 구어체·짧은 문단 위주로, 워드프레스는 소제목 계층과 정돈된 문장으로, 일반 블로그는 중립적인 기본 톤으로 조정됩니다."
              />
              <FaqItem
                q="같은 키워드로 여러 번 생성해도 되나요?"
                a="가능합니다. 같은 키워드여도 매 요청마다 새로운 구조와 문장으로 생성됩니다."
              />
            </dl>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function PlanCard({
  name,
  priceLabel,
  perLabel,
  description,
  features,
  cta,
  highlight,
  disabled,
}: (typeof PLANS)[number]) {
  return (
    <article
      className={`flex flex-col border-r border-b border-border p-8 sm:p-10 lg:p-12 ${
        highlight ? "bg-brand-wash" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`eyebrow ${highlight ? "text-brand" : ""}`}>{name}</p>
        {highlight && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.22em] uppercase text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            추천
          </span>
        )}
      </div>

      <p className="mt-8 font-serif text-4xl text-foreground sm:text-[2.5rem]">
        <span className="nowrap">{priceLabel}</span>
      </p>
      <p className="mt-2 text-[13px] text-muted">
        <span className="nowrap">{perLabel}</span>
      </p>

      <p className="mt-6 text-[14px] leading-[1.85] text-muted">
        {description}
      </p>

      <ul className="mt-8 flex-1 space-y-3 border-t border-border pt-6 text-[14px] leading-[1.7] text-foreground-soft">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className={`mt-2 inline-block h-1 w-3 shrink-0 ${
                highlight ? "bg-brand" : "bg-border-strong"
              }`}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        {disabled ? (
          <span
            className={`inline-flex items-center w-full justify-center px-6 py-3.5 text-[12px] font-medium tracking-[0.16em] uppercase ${
              cta.variant === "muted"
                ? "bg-foreground/20 text-foreground/60"
                : "border border-border text-subtle"
            } cursor-not-allowed`}
          >
            {cta.label}
          </span>
        ) : (
          <Link
            href={cta.href}
            className={`inline-flex items-center w-full justify-center px-6 py-3.5 text-[12px] font-medium tracking-[0.16em] uppercase transition-colors ${
              cta.variant === "muted"
                ? "bg-accent text-background hover:bg-accent-hover"
                : "border border-border-strong text-foreground hover:bg-background-alt"
            }`}
          >
            {cta.label} →
          </Link>
        )}
      </div>
    </article>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-[1fr_2fr] sm:gap-10">
      <dt className="font-serif text-[17px] leading-[1.55] text-foreground sm:text-lg">
        {q}
      </dt>
      <dd className="text-[14px] leading-[1.85] text-muted sm:text-[15px]">
        {a}
      </dd>
    </div>
  );
}
