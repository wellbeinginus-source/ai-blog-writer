import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-blog-writer.vercel.app"),
  title: {
    default: "AI 블로그 글 자동 생성 | 키워드만 넣으면 SEO 최적화 글 완성",
    template: "%s | AI 블로그 라이터",
  },
  description:
    "키워드만 입력하면 AI가 SEO 최적화된 블로그 글을 자동으로 작성해드립니다. 네이버 블로그, 워드프레스 맞춤 글 생성.",
  keywords: [
    "AI 블로그",
    "블로그 글 자동 생성",
    "SEO 글쓰기",
    "AI 글쓰기",
    "블로그 자동 발행",
    "네이버 블로그 AI",
    "SEO 최적화",
  ],
  openGraph: {
    title: "AI 블로그 글 자동 생성",
    description: "키워드만 넣으면 SEO 최적화 블로그 글이 완성됩니다.",
    type: "website",
    locale: "ko_KR",
    url: "https://ai-blog-writer.vercel.app",
    siteName: "AI 블로그 라이터",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
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
