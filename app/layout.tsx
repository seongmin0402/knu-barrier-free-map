import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "공주대학교 배리어프리 맵",
  description: "공주대학교 신관캠퍼스 배리어프리 시설 정보",
  keywords: ["배리어프리", "장애인 편의시설", "공주대학교", "접근성"],
  authors: [{ name: "공주대학교" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
          async
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
