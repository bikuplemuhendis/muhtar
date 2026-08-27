import { EmptyState } from "@/components/empty-state";
import { OfficeCard } from "@/components/office-card";
import { StatusTimeline } from "@/components/status-timeline";
import { TrackingSlip } from "@/components/tracking-slip";
import { requireCitizen } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { getRequestIp } from "@/lib/auth";
import { STATUSES } from "@/lib/constants";
import { citizenDocuments } from "@/lib/lookup";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Evraklarım" };
export const dynamic = "force-dynamic";

export default async function CitizenHomePage() {
  const ctx = await requireCitizen();
  const docs = await citizenDocuments(ctx.user.tcHash!);
  const notices = await prisma.inboxNotice.findMany({
    where: { userId: ctx.user.id },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  await prisma.inboxNotice.updateMany({
    where: { userId: ctx.user.id, readAt: null },
    data: { readAt: new Date() },
  });
  await writeAudit({
    action: "citizen.list_documents",
    entity: "document",
    actorId: ctx.user.id,
    ip: await getRequestIp(),
    meta: { count: docs.length, notices: notices.length },
  });

  if (docs.length === 0 && notices.length === 0) {
    return (
      <EmptyState
        title="Evrak yok"
        body="Size kayıtlı bekleyen evrak bulunamadı. Takip kodunuz varsa sorgulama sayfasını kullanın."
        href="/sorgula"
        action="Evrak sorgula"
      />
    );
  }

  const ready = docs.filter((doc) => doc.status === STATUSES.READY);
  const rest = docs.filter((doc) => doc.status !== STATUSES.READY);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="display text-3xl font-semibold">Evraklarım</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Yalnızca sizin kimlik özetinize eşlenen kayıtlar. Evrak içeriği gösterilmez.
        </p>
      </div>
      {notices.length > 0 ? (
        <section className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Bildirimler</p>
          {notices.map((notice) => (
            <article
              key={notice.id}
              className="rounded-[22px] bg-night px-4 py-3 text-sm text-cream"
            >
              <p className="font-semibold">{notice.title}</p>
              <p className="mt-1 text-cream/75">{notice.body}</p>
            </article>
          ))}
        </section>
      ) : null}
      {ready.map((doc) => (
        <article key={doc.id} className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stamp">
            {doc.notifiedAt ? "Muhtarlık sizi bekliyor" : "Şimdi teslim alınabilir"}
          </p>
          <TrackingSlip
            trackingCode={doc.trackingCode}
            status={doc.status}
            typeLabel={doc.typeLabel}
            office={doc.office}
            rotate={false}
          />
          <OfficeCard office={doc.office} highlight />
        </article>
      ))}
      {rest.map((doc) => (
        <article key={doc.id} className="space-y-3">
          <TrackingSlip
            trackingCode={doc.trackingCode}
            status={doc.status}
            typeLabel={doc.typeLabel}
            office={doc.office}
            rotate={false}
          />
          <section className="paper-card rounded-[28px] p-4">
            <StatusTimeline status={doc.status} returned={doc.status === STATUSES.RETURNED} />
          </section>
          <OfficeCard office={doc.office} />
        </article>
      ))}
    </div>
  );
}
