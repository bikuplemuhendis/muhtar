import { BrandMark, SiteFooter } from "@/components/brand";
import { KVKK_POLICY_VERSION, KVKK_PURPOSE, RETENTION_MONTHS_AFTER_DELIVERY } from "@/lib/constants";

export const metadata = { title: "KVKK aydınlatma" };

export default function KvkkPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <BrandMark />
        <h1 className="display mt-8 text-3xl font-semibold">KVKK aydınlatma metni</h1>
        <p className="mt-2 text-sm text-ink-soft">Sürüm {KVKK_POLICY_VERSION}</p>
        <div className="mt-6 space-y-4 text-base leading-7">
          <p>
            Teslim, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri işleyen bir
            evrak teslim takip hizmetidir. Amaç: {KVKK_PURPOSE}.
          </p>
          <h2 className="display text-xl font-semibold">İşlenen veriler</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Ad soyad, e-posta, telefon (üyelik)</li>
            <li>T.C. kimlik numarasının HMAC özeti ve son 4 hanesi</li>
            <li>Evrak türü, takip kodu, teslim durumu, muhtarlık iletişim bilgisi</li>
          </ul>
          <h2 className="display text-xl font-semibold">İşlenmeyen veriler</h2>
          <p>
            Evrak tarama görüntüsü, evrak metni ve tam T.C. kimlik numarası sistemde tutulmaz
            veya gösterilmez. Kamu sorgusu ad soyad döndürmez.
          </p>
          <h2 className="display text-xl font-semibold">Saklama</h2>
          <p>
            Teslim kaydı, teslim tarihinden itibaren {RETENTION_MONTHS_AFTER_DELIVERY} ay
            sonra anonimleştirilmek üzere işaretlenir. Üye, hesabını silerek kimlik eşlemesini
            kaldırabilir.
          </p>
          <h2 className="display text-xl font-semibold">Haklarınız</h2>
          <p>
            Üyelik panelinden verilerinize erişebilir, JSON olarak indirebilir ve silme
            talep edebilirsiniz. Muhtarlıklar yalnızca kendi kiracı kayıtlarını görür.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
