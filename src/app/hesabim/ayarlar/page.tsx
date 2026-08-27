import { KvkkAccountTools } from "@/components/kvkk-tools";
import { requireCitizen } from "@/lib/auth";
import { maskTcLast4 } from "@/lib/kvkk";

export const metadata = { title: "Hesap ve KVKK" };

export default async function CitizenSettingsPage() {
  const ctx = await requireCitizen();
  return (
    <div className="space-y-4">
      <h1 className="display text-3xl font-semibold">Hesap</h1>
      <section className="paper-card space-y-1 rounded-[28px] p-5 text-sm leading-6">
        <p>
          <span className="text-ink-soft">Ad:</span> {ctx.user.fullName}
        </p>
        <p>
          <span className="text-ink-soft">E-posta:</span> {ctx.user.email}
        </p>
        <p>
          <span className="text-ink-soft">T.C.:</span> {maskTcLast4(ctx.user.tcLast4 ?? "")}
        </p>
        <p>
          <span className="text-ink-soft">KVKK onayı:</span>{" "}
          {ctx.user.kvkkConsentAt?.toLocaleString("tr-TR")}
        </p>
      </section>
      <div className="paper-card rounded-[28px] p-4">
        <KvkkAccountTools />
      </div>
    </div>
  );
}
