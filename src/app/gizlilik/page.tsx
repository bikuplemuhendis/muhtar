import { BrandMark, SiteFooter } from "@/components/brand";

export const metadata = { title: "Gizlilik" };

export default function PrivacyPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <BrandMark />
        <h1 className="display mt-8 text-3xl font-semibold">Gizlilik</h1>
        <div className="mt-6 space-y-4 text-base leading-7">
          <p>
            Teslim bir SaaS uygulamasıdır. Her muhtarlık (kiracı) yalnızca kendi ofisine
            kaydedilen evrakları görür. Vatandaş, T.C. kimlik özeti kendisine ait evrakları
            tüm muhtarlıklarda tarayabilir; başkasının evrakını göremez.
          </p>
          <p>
            Oturum çerezi HttpOnly’dir. Denetim kaydı IP, işlem türü ve takip kodu tutar;
            tam kimlik numarası yazılmaz.
          </p>
          <p>
            Bu ürün hukuki danışmanlık yerine geçmez; KVKK uyumunu kolaylaştıran teknik
            tedbirler sunar.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
