import { TenantRegisterForm } from "@/components/auth-forms";
import { BrandMark, SiteFooter } from "@/components/brand";

export const metadata = { title: "Muhtarlık oluştur" };

export default function CreateTenantPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <BrandMark />
        <h1 className="display mt-8 text-3xl font-semibold">Muhtarlığınızı ekleyin</h1>
        <p className="mt-2 text-ink-soft">
          Kendi defteriniz, personeliniz ve kamu sayfanız oluşur. Vatandaşlar adres ve
          telefonunuzu teslim sorgusunda görür.
        </p>
        <div className="mt-6 paper-card rounded-[28px] p-4">
          <TenantRegisterForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
