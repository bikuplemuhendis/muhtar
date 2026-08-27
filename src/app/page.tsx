import Link from "next/link";
import { SiteFooter } from "@/components/brand";
import { TopBar } from "@/components/top-bar";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ silindi?: string }>;
}) {
  const params = await searchParams;
  const deleted = params.silindi === "1";
  return (
    <>
      <TopBar />
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8">
        {deleted ? (
          <p className="mb-6 rounded-2xl bg-sage/15 px-4 py-3 text-sm text-sage-dark">
            Hesabınız anonimleştirildi. Teslim kayıtları kişiye bağlanamaz.
          </p>
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stamp">
          Muhtarlıklar için SaaS
        </p>
        <h1 className="display mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Gelen evrak kapıda kalsın, kimlik deftere yazılmasın.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-ink-soft">
          Teslim, muhtarlıkta biriken tebligat ve yazıların kişilere dağıtımını hızlandırır.
          Evrak görüntüsü yüklenmez; vatandaş yalnızca durum, adres ve telefon görür.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/sorgula"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-stamp px-5 font-semibold text-white"
          >
            Evrakımı sorgula
          </Link>
          <Link
            href="/muhtarlik-olustur"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-line bg-card px-5 font-semibold"
          >
            Muhtarlık olarak başla
          </Link>
        </div>

        <section className="mt-12 grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Hızlı ofis",
              body: "Alıcı adı, T.C. no, tür. Kaydet. Takip kodu çıksın. Teslime hazır / teslim edildi tek dokunuş.",
            },
            {
              title: "Çok muhtarlık",
              body: "Her muhtarlık kendi ofisi, personeli ve evrak defteri ile çalışır. Kayıtlar birbirine karışmaz.",
            },
            {
              title: "KVKK’ya yakın",
              body: "Kimlik HMAC ile saklanır, tam numara gösterilmez, kamu sorgusu ad soyad ve içerik sızdırmaz, işlemler denetlenir.",
            },
          ].map((item) => (
            <article key={item.title} className="paper-card rounded-3xl p-5">
              <h2 className="display text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 paper-card rounded-3xl p-5">
          <h2 className="display text-2xl font-semibold">Vatandaş ne görür?</h2>
          <ul className="mt-3 space-y-2 text-base leading-7">
            <li>Evrakın hangi muhtarlıkta olduğu</li>
            <li>Muhtar adı, telefon, adres, çalışma saati</li>
            <li>Teslim durumu: alındı, teslime hazır, teslim edildi</li>
            <li>Üyelikle kendi T.C. eşleşen tüm evraklar — birden fazla muhtarlıkta olsa bile</li>
          </ul>
          <Link href="/kayit" className="mt-4 inline-flex min-h-11 items-center font-semibold text-stamp">
            Üye ol →
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
