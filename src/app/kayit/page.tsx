import Link from "next/link";
import { CitizenRegisterForm } from "@/components/auth-forms";
import { BrandMark, SiteFooter } from "@/components/brand";

export const metadata = { title: "Vatandaş kaydı" };

export default function RegisterPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <BrandMark />
        <h1 className="display mt-8 text-3xl font-semibold">Üye ol</h1>
        <p className="mt-2 text-ink-soft">
          T.C. kimlik numaranızın özeti ile size gelen evrakları ve ilgili muhtarlığın
          telefonunu görün.
        </p>
        <div className="mt-6">
          <CitizenRegisterForm />
        </div>
        <p className="mt-6 text-sm">
          Zaten üye misiniz?{" "}
          <Link href="/giris" className="font-semibold text-stamp">
            Giriş
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
