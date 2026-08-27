import { LookupForm } from "@/components/lookup-form";
import { BrandMark, SiteFooter } from "@/components/brand";
import Link from "next/link";

export const metadata = { title: "Evrak sorgula" };

export default function LookupPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <BrandMark />
        <h1 className="display mt-8 text-3xl font-semibold">Evrak nerede?</h1>
        <p className="mt-2 text-ink-soft">
          Takip kodu ve kimlik numaranızın son 4 hanesi yeter. Ad soyad ve evrak içeriği
          gösterilmez.
        </p>
        <div className="mt-6">
          <LookupForm />
        </div>
        <p className="mt-6 text-sm leading-6 text-ink-soft">
          Tüm evraklarınızı görmek için{" "}
          <Link href="/kayit" className="font-semibold text-stamp">
            üye olun
          </Link>
          . Deneme kodu: <code>EVK-26DEMO1</code> · son 4: <code>0146</code>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
