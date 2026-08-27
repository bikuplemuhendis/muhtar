import Link from "next/link";
import { SiteFooter } from "@/components/brand";
import { TopBar } from "@/components/top-bar";
import { TrackingSlip } from "@/components/tracking-slip";
import { STATUSES } from "@/lib/constants";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ silindi?: string }>;
}) {
  const params = await searchParams;
  const deleted = params.silindi === "1";
  return (
    <div className="flex min-h-dvh flex-col bg-night">
      <div className="relative overflow-hidden text-cream">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="grain pointer-events-none absolute inset-0" />
        <TopBar tone="dark" />
        <main className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-16">
          {deleted ? (
            <p className="col-span-full rounded-2xl bg-sage/20 px-4 py-3 text-sm text-cream">
              Hesabınız anonimleştirildi. Teslim kayıtları kişiye bağlanamaz.
            </p>
          ) : null}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              Muhtarlıklar için SaaS
            </p>
            <h1 className="display mt-5 max-w-xl text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Evrak kapıda.
              <span className="block text-stamp">Kimlik defterde değil.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-cream/75">
              Gelen tebligatı kaydedin, kişilere dağıtın, teslimi işaretleyin. Vatandaş
              evrakının hangi muhtarlıkta olduğunu, telefonu ve adresi görür — içeriği değil.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sorgula"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-stamp px-6 text-base font-semibold text-white shadow-[0_16px_32px_rgba(226,59,43,0.35)] btn-press"
              >
                Evrakımı sorgula
              </Link>
              <Link
                href="/muhtarlik-olustur"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 text-base font-semibold text-cream btn-press"
              >
                Muhtarlık olarak başla
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-3 text-center">
              {[
                ["2+", "kiracı ofis"],
                ["4 hane", "kamu sorgusu"],
                ["0 tarama", "içerik yok"],
              ].map(([k, v]) => (
                <div key={v} className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3">
                  <dt className="display text-2xl font-semibold text-gold">{k}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wider text-cream/60">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <TrackingSlip
            trackingCode="EVK-26DEMO1"
            status={STATUSES.READY}
            typeLabel="Resmi tebligat"
            office={{
              name: "Caddebostan Mahallesi Muhtarlığı",
              phone: "0216 356 00 11",
              city: "İstanbul",
              district: "Kadıköy",
            }}
          />
        </main>
      </div>

      <section className="bg-cream text-ink">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-stamp">Nasıl çalışır</p>
          <h2 className="display mt-2 max-w-lg text-4xl font-semibold">Üç dokunuş. Teslim bitti.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Kaydet",
                b: "Alıcı adı, T.C. no, evrak türü. Takip kodu anında üretilir. Tarama yok.",
              },
              {
                n: "02",
                t: "Hazırla",
                b: "Teslime hazır işaretleyin. Vatandaş ofis telefonunu ve adresi görür.",
              },
              {
                n: "03",
                t: "Teslim et",
                b: "Kimlik kontrolü kutusu, tek dokunuş. Denetim kaydı otomatik düşer.",
              },
            ].map((step) => (
              <article key={step.n} className="paper-card lift rounded-[28px] p-6">
                <p className="display text-3xl text-stamp">{step.n}</p>
                <h3 className="mt-3 text-xl font-semibold">{step.t}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{step.b}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[28px] bg-night p-6 text-cream">
              <h3 className="display text-2xl font-semibold">Muhtarlık</h3>
              <p className="mt-2 text-sm leading-6 text-cream/70">
                Kendi defteriniz, personeliniz, kamu sayfanız. Diğer muhtarlığın kaydı
                görünmez.
              </p>
              <Link href="/muhtarlik-olustur" className="mt-5 inline-flex min-h-11 items-center font-semibold text-gold">
                Ofis aç →
              </Link>
            </article>
            <article className="paper-card rounded-[28px] p-6">
              <h3 className="display text-2xl font-semibold">Vatandaş</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
                <li>Hangi muhtarlıkta olduğu</li>
                <li>Muhtar adı, telefon, adres, saat</li>
                <li>Teslim durumu — içerik yok</li>
                <li>Üyelikle birden fazla muhtarlık</li>
              </ul>
              <Link href="/kayit" className="mt-5 inline-flex min-h-11 items-center font-semibold text-stamp">
                Üye ol →
              </Link>
            </article>
          </div>
        </div>
        <SiteFooter />
      </section>
    </div>
  );
}
