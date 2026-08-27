import Link from "next/link";
import { StatusActions } from "@/components/status-actions";
import { StatusBadge } from "@/components/status-badge";
import { requireOffice } from "@/lib/auth";
import { STATUSES, type DocumentStatus } from "@/lib/constants";
import { officeDocumentView } from "@/lib/documents";
import { maskTcLast4 } from "@/lib/kvkk";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Hızlı teslim" };
export const dynamic = "force-dynamic";

export default async function QuickDeliverPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const ctx = await requireOffice();
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const last4 = q.replace(/\D/g, "").slice(-4);

  const docs = await prisma.document.findMany({
    where: {
      tenantId: ctx.tenant.id,
      status: { in: [STATUSES.READY, STATUSES.RECEIVED] },
      anonymizedAt: null,
      ...(q
        ? {
            OR: [
              { trackingCode: { contains: q.toUpperCase() } },
              { recipientName: { contains: q } },
              last4.length === 4 ? { recipientTcLast4: last4 } : undefined,
            ].filter(Boolean) as object[],
          }
        : {}),
    },
    orderBy: { receivedAt: "asc" },
    take: 30,
  });

  return (
    <div className="space-y-4">
      <h1 className="display text-3xl font-semibold">Hızlı teslim</h1>
      <p className="text-sm text-ink-soft">
        Sıradaki kişiyi ad, kod veya son 4 hane ile bulun. Kimlik kutusunu işaretleyip teslim
        edin.
      </p>
      <form className="flex gap-2">
        <input
          name="q"
          defaultValue={q}
          autoFocus
          placeholder="Ad / kod / son 4"
          className="min-h-12 flex-1 rounded-2xl border border-line bg-white px-4 text-base outline-none focus:ring-2 focus:ring-stamp/30"
        />
        <button className="min-h-12 rounded-2xl bg-ink px-4 font-semibold text-paper" type="submit">
          Bul
        </button>
      </form>
      <ul className="space-y-3">
        {docs.map((raw) => {
          const doc = officeDocumentView(raw);
          return (
            <li key={doc.id} className="paper-card space-y-3 rounded-3xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{doc.recipientName}</p>
                  <p className="text-sm text-ink-soft">
                    {maskTcLast4(doc.recipientTcLast4)} · {doc.trackingCode}
                  </p>
                </div>
                <StatusBadge status={doc.status as DocumentStatus} />
              </div>
              <StatusActions documentId={doc.id} status={doc.status} />
              <Link href={`/ofis/evrak/${doc.id}`} className="block text-sm font-semibold text-stamp">
                Ayrıntı
              </Link>
            </li>
          );
        })}
      </ul>
      {docs.length === 0 ? (
        <p className="rounded-3xl bg-sand px-4 py-6 text-center text-sm">Bekleyen evrak yok.</p>
      ) : null}
    </div>
  );
}
