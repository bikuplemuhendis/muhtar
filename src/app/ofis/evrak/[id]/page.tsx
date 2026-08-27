import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/copy-button";
import { StatusActions } from "@/components/status-actions";
import { StatusTimeline } from "@/components/status-timeline";
import { TrackingSlip } from "@/components/tracking-slip";
import { requireOffice } from "@/lib/auth";
import { STATUSES } from "@/lib/constants";
import { officeDocumentView } from "@/lib/documents";
import { maskTcLast4 } from "@/lib/kvkk";
import { prisma } from "@/lib/prisma";
import { toOfficeInfo } from "@/lib/lookup";

export const dynamic = "force-dynamic";

export default async function DocumentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ yeni?: string }>;
}) {
  const ctx = await requireOffice();
  const { id } = await params;
  const query = await searchParams;
  const created = query.yeni === "1";

  const raw = await prisma.document.findFirst({
    where: { id, tenantId: ctx.tenant.id },
    include: { events: { orderBy: { createdAt: "desc" } } },
  });
  if (!raw) notFound();
  const doc = officeDocumentView(raw);
  const office = toOfficeInfo(ctx.tenant);

  return (
    <div className="space-y-4">
      {created ? (
        <p className="rounded-2xl bg-sage px-4 py-3 text-sm font-semibold text-white">
          Kayıt alındı. Takip kodunu vatandaşa verin.
        </p>
      ) : null}

      <TrackingSlip
        trackingCode={doc.trackingCode}
        status={doc.status}
        typeLabel={doc.typeLabel}
        office={office}
        rotate={false}
      />

      <div className="flex gap-2">
        <CopyButton value={doc.trackingCode} label="Kodu kopyala" />
        <CopyButton
          value={`${doc.trackingCode} — ${ctx.tenant.name} ${ctx.tenant.phone}`}
          label="Fiş metni"
        />
      </div>

      <section className="paper-card rounded-[28px] p-4">
        <p className="text-lg font-semibold">{doc.recipientName}</p>
        <p className="text-sm text-ink-soft">{maskTcLast4(doc.recipientTcLast4)}</p>
        <p className="mt-3 text-sm">
          {doc.typeLabel}
          {doc.sourceOrg ? ` · ${doc.sourceOrg}` : ""}
        </p>
        {doc.notes ? <p className="mt-2 text-sm text-ink-soft">{doc.notes}</p> : null}
      </section>

      <section className="paper-card rounded-[28px] p-4">
        <StatusTimeline status={doc.status} returned={doc.status === STATUSES.RETURNED} />
      </section>

      <StatusActions documentId={doc.id} status={doc.status} />

      <section>
        <h2 className="text-sm font-semibold">Hareketler</h2>
        <ol className="mt-2 space-y-2 text-sm">
          {raw.events.map((event) => (
            <li key={event.id} className="rounded-2xl bg-white px-3 py-2">
              <span className="font-semibold">{event.action}</span>
              <span className="text-ink-soft"> · {event.createdAt.toLocaleString("tr-TR")}</span>
              {event.note ? <p>{event.note}</p> : null}
            </li>
          ))}
        </ol>
      </section>

      <Link href="/ofis/yeni" className="inline-flex min-h-12 items-center font-semibold text-stamp">
        Bir evrak daha kaydet
      </Link>
    </div>
  );
}
