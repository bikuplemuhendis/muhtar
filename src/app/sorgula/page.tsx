import Link from "next/link";
import { LookupForm } from "@/components/lookup-form";
import { BrandMark, SiteFooter } from "@/components/brand";

export const metadata = { title: "Evrak sorgula" };

export default function LookupPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-night text-cream">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[28rem]" />
      <main className="relative mx-auto w-full max-w-md px-4 py-10">
        <BrandMark tone="dark" />
        <h1 className="display mt-10 text-4xl font-semibold">Evrak nerede?</h1>
        <p className="mt-3 text-cream/70">
          Takip kodu ve kimlik numaranızın son 4 hanesi yeter. Ad soyad ve evrak içeriği
          gösterilmez.
        </p>
        <div className="mt-7">
          <LookupForm />
        </div>
        <p className="mt-6 text-sm leading-6 text-cream/55">
          Tüm evraklarınız için{" "}
          <Link href="/kayit" className="font-semibold text-gold">
            üye olun
          </Link>
          . Deneme: <span className="text-cream">EVK-26DEMO1</span> · son 4:{" "}
          <span className="text-cream">0146</span>
        </p>
      </main>
      <SiteFooter tone="dark" />
    </div>
  );
}
