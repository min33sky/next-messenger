import "./globals.css";
import { Nanum_Gothic } from "next/font/google";

const NanumGothic = Nanum_Gothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-nanum-gothic",
});

export const metadata = {
  title: "Next Messenger",
  description: "Next Messenger by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`scroll-smooth antialiased`}>
      {/* TODO: 폰트 로드 문제 있음.......*/}
      {/*<body className={`font-nanum-gothic ${NanumGothic.className}`}>*/}
      <body className={``}>{children}</body>
    </html>
  );
}
