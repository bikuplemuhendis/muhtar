import { OfficeCard } from "@/components/office-card";
import { StatusBadge } from "@/components/status-badge";
import { requireCitizen } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { getRequestIp } from "@/lib/auth";
import { citizenDocuments } from "@/lib/lookup";
import Link from "next/link";

export const metadata = { title: "Evraklarım" };
export const dynamic = "force-dynamic";

export default async function CitizenHomePage() {
  const ctx = await requireCitizen();
  const docs = await citizenDocuments(ctx.user.tcHash!);
  await writeAudit({
    action: "citizen.list_documents",
    entity: "document",
    actorId: ctx.user.id,
    ip: await getRequestIp(),
    meta: { count: docs.length },
  });

  if (docs.length === 0) {
    return (
      <div className="paper-card rounded-3xl p-5">
        <h1 className="display text-2xl font-semibold">Evrak bulunamadı</h1>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Size kayıtlı bekleyen evrak yok. Takip kodunuz varsa{" "}
          <Link href="/sorgula" className="font-semibold text-stamp">
            sorgulama
          </Link>{" "}
          sayfasını kullanın.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="display text-2xl font-semibold">Evraklarım</h1>
      <p className="text-sm text-ink-soft">
        Yalnızca sizin kimlik özetinize eşlenen kayıtlar. Evrak içeriği gösterilmez.
      </p>
      {docs.map((doc) => (
        <article key={doc.id} className="space-y-3">
          <section className="paper-card rounded-3xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="display text-xl font-semibold">{doc.trackingCode}</p>
                <p className="text-sm text-ink-soft">{doc.typeLabel}</p>
              </div>
              <StatusBadge status={doc.status} />
            </div>
          </section>
          <OfficeCard office={doc.office} />
        </article>
      ))}
    </div>
  );
}
