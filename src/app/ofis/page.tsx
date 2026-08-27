import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { requireOffice } from "@/lib/auth";
import { STATUSES, STATUS_LABELS, type DocumentStatus } from "@/lib/constants";
import { officeDocumentView } from "@/lib/documents";
import { maskTcLast4 } from "@/lib/kvkk";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Evraklar" };
export const dynamic = "force-dynamic";

export default async function OfficeInboxPage({
  searchParams,
}: {
  searchParams: Promise<{ durum?: string; q?: string }>;
}) {
  const ctx = await requireOffice();
  const params = await searchParams;
  const durum = typeof params.durum === "string" ? params.durum : "";
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const statusFilter = Object.values(STATUSES).includes(durum as DocumentStatus)
    ? (durum as DocumentStatus)
    : undefined;
  const last4 = q.replace(/\D/g, "").slice(-4);

  const docs = await prisma.document.findMany({
    where: {
      tenantId: ctx.tenant.id,
      ...(statusFilter ? { status: statusFilter } : {}),
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
    orderBy: { receivedAt: "desc" },
    take: 80,
  });

  const counts = await prisma.document.groupBy({
    by: ["status"],
    where: { tenantId: ctx.tenant.id },
    _count: true,
  });
  const countMap = Object.fromEntries(counts.map((row) => [row.status, row._count]));

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="display text-3xl font-semibold">Evraklar</h1>
          <p className="text-sm text-ink-soft">{docs.length} kayıt</p>
        </div>
        <Link
          href="/ofis/yeni"
          className="inline-flex min-h-11 items-center rounded-2xl bg-stamp px-4 text-sm font-semibold text-white"
        >
          Yeni
        </Link>
      </div>

      <form className="flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Ad, takip kodu veya son 4 hane"
          className="min-h-12 flex-1 rounded-2xl border border-line bg-white px-4 text-base outline-none focus:ring-2 focus:ring-stamp/30"
        />
        <button className="min-h-12 rounded-2xl bg-ink px-4 font-semibold text-paper" type="submit">
          Ara
        </button>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <FilterChip href="/ofis" active={!statusFilter} label={`Tümü`} />
        {Object.values(STATUSES).map((status) => (
          <FilterChip
            key={status}
            href={`/ofis?durum=${status}`}
            active={statusFilter === status}
            label={`${STATUS_LABELS[status]} ${countMap[status] ?? 0}`}
          />
        ))}
      </div>

      <ul className="space-y-2">
        {docs.map((raw) => {
          const doc = officeDocumentView(raw);
          return (
            <li key={doc.id}>
              <Link
                href={`/ofis/evrak/${doc.id}`}
                className="paper-card flex min-h-20 items-center justify-between gap-3 rounded-3xl px-4 py-3"
              >
                <div>
                  <p className="font-semibold">{doc.recipientName}</p>
                  <p className="text-sm text-ink-soft">
                    {maskTcLast4(doc.recipientTcLast4)} · {doc.trackingCode}
                  </p>
                </div>
                <StatusBadge status={doc.status} />
              </Link>
            </li>
          );
        })}
      </ul>
      {docs.length === 0 ? (
        <p className="rounded-3xl bg-sand px-4 py-6 text-center text-sm text-ink-soft">
          Bu filtrede evrak yok. Yeni kayıt için alıcı adı ve T.C. no yeter.
        </p>
      ) : null}
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-10 shrink-0 items-center rounded-full px-3 text-sm font-semibold ${
        active ? "bg-ink text-paper" : "bg-sand text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
