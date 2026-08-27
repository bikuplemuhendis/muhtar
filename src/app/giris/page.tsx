import Link from "next/link";
import { LoginForm } from "@/components/auth-forms";
import { BrandMark } from "@/components/brand";
import { DemoAccounts } from "@/components/demo-accounts";

export const metadata = { title: "Giriş" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "";
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-night p-10 text-cream lg:flex lg:flex-col">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="relative">
          <BrandMark tone="dark" />
          <h1 className="display mt-16 max-w-md text-5xl font-semibold leading-tight">
            Defter cebinizde, mühür ofiste.
          </h1>
          <p className="mt-4 max-w-sm text-cream/70">
            Personel hızlı teslim eder. Vatandaş nerede olduğunu görür. Kimlik numarası
            ekrana yazılmaz.
          </p>
        </div>
        <div className="relative mt-auto">
          <DemoAccounts />
        </div>
      </aside>
      <main className="flex flex-col justify-center bg-cream px-4 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden">
            <BrandMark />
          </div>
          <h2 className="display mt-8 text-3xl font-semibold">Giriş</h2>
          <p className="mt-2 text-ink-soft">Vatandaş veya muhtarlık personeli.</p>
          <div className="mt-6">
            <LoginForm next={next} />
          </div>
          <div className="mt-6 lg:hidden">
            <DemoAccounts tone="light" />
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
        </div>
      </main>
    </div>
  );
}
