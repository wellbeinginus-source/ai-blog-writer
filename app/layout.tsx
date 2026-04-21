import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-blog-writer-eosin.vercel.app"),
  title: {
    default: "AI 블로그 작성기 | 웰빙이너스 에디터 서비스",
    template: "%s | 웰빙이너스 에디터",
  },
  description:
    "키워드만 입력하면 SEO 최적화된 블로그 글을 구성·작성·다듬어 완성해 드립니다. 주식회사 웰빙이너스가 운영하는 전문 AI 에디터 서비스.",
  keywords: [
    "AI 블로그 작성기",
    "AI 블로그 라이터",
    "블로그 글 자동 생성",
    "SEO 글쓰기",
    "네이버 블로그 자동화",
    "워드프레스 AI",
    "웰빙이너스",
  ],
  openGraph: {
    title: "AI 블로그 작성기 | 웰빙이너스 에디터 서비스",
    description: "키워드만 넣으면 SEO 최적화 블로그 글이 정돈되어 도착합니다.",
    type: "website",
    locale: "ko_KR",
    url: "https://ai-blog-writer-eosin.vercel.app",
    siteName: "웰빙이너스 에디터",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <meta name="naver-site-verification" content="f58745f1f3df66efcdf57032244d85a6907a0fc0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6L251D0CYV"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6L251D0CYV');
            `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3913442122539155"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
