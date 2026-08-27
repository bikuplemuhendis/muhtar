import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
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
  themeColor: "#07111f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-ink">{children}</body>
    </html>
  );
}
