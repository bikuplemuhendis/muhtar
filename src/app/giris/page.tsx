import Link from "next/link";
import { LoginForm } from "@/components/auth-forms";
import { BrandMark, SiteFooter } from "@/components/brand";

export const metadata = { title: "Giriş" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "";
  return (
    <>
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <BrandMark />
        <h1 className="display mt-8 text-3xl font-semibold">Giriş</h1>
        <p className="mt-2 text-ink-soft">Vatandaş veya muhtarlık personeli olarak devam edin.</p>
        <div className="mt-6">
          <LoginForm next={next} />
        </div>
        <div className="mt-6 paper-card rounded-3xl p-4 text-sm leading-6">
          <p className="font-semibold">Deneme hesapları</p>
          <p className="mt-2">
            Muhtar: <code>muhtar@caddebostan.ornek</code>
          </p>
          <p>
            Vatandaş: <code>ahmet@ornek.com</code>
          </p>
          <p>Parola: <code>Teslim123!</code></p>
        </div>
        <p className="mt-6 text-sm">
          Hesabınız yok mu?{" "}
          <Link href="/kayit" className="font-semibold text-stamp">
            Vatandaş kaydı
          </Link>{" "}
          ·{" "}
          <Link href="/muhtarlik-olustur" className="font-semibold text-stamp">
            Muhtarlık aç
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
