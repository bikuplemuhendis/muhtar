import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusActions } from "@/components/status-actions";
import { StatusBadge } from "@/components/status-badge";
import { requireOffice } from "@/lib/auth";
import { officeDocumentView } from "@/lib/documents";
import { maskTcLast4 } from "@/lib/kvkk";
import { prisma } from "@/lib/prisma";

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

  return (
    <div className="space-y-4">
      {created ? (
        <p className="rounded-2xl bg-sage/15 px-3 py-2 text-sm font-semibold text-sage-dark">
          Kayıt alındı. Takip kodunu vatandaşa verin.
        </p>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Takip kodu</p>
          <h1 className="display text-3xl font-semibold">{doc.trackingCode}</h1>
        </div>
        <StatusBadge status={doc.status} />
      </div>

      <section className="paper-card rounded-3xl p-4">
        <p className="text-lg font-semibold">{doc.recipientName}</p>
        <p className="text-sm text-ink-soft">{maskTcLast4(doc.recipientTcLast4)}</p>
        <p className="mt-3 text-sm">
          {doc.typeLabel}
          {doc.sourceOrg ? ` · ${doc.sourceOrg}` : ""}
        </p>
        {doc.notes ? <p className="mt-2 text-sm text-ink-soft">{doc.notes}</p> : null}
      </section>

      <section className="paper-card rounded-3xl p-4 print:block">
        <p className="text-xs font-semibold uppercase tracking-wider">Vatandaşa fiş</p>
        <p className="display mt-1 text-2xl font-semibold">{doc.trackingCode}</p>
        <p className="mt-2 text-sm leading-6">
          {ctx.tenant.name}
          <br />
          {ctx.tenant.address}
          <br />
          Tel: {ctx.tenant.phone}
          <br />
          teslim.app/sorgula
        </p>
      </section>

      <StatusActions documentId={doc.id} status={doc.status} />

      <section>
        <h2 className="text-sm font-semibold">Hareketler</h2>
        <ol className="mt-2 space-y-2 text-sm">
          {raw.events.map((event) => (
            <li key={event.id} className="rounded-2xl bg-sand px-3 py-2">
              <span className="font-semibold">{event.action}</span>
              <span className="text-ink-soft">
                {" "}
                · {event.createdAt.toLocaleString("tr-TR")}
              </span>
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
