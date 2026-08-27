import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Teslim — Muhtarlık evrak sistemi",
    template: "%s · Teslim",
  },
  description:
    "Muhtarlıklar için çok kiracılı evrak teslim sistemi. Gelen evrakı kişilere dağıtın, teslim durumunu izleyin; vatandaşlar evraklarının hangi muhtarlıkta olduğunu güvenli şekilde sorgulasın.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f3eee4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${sourceSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-ink">{children}</body>
    </html>
  );
}
