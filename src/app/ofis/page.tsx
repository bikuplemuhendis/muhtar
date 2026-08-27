import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { EmptyState } from "@/components/empty-state";
import { StatusBadge } from "@/components/status-badge";
import { requireOffice } from "@/lib/auth";
import { STATUSES, STATUS_LABELS, type DocumentStatus } from "@/lib/constants";
import { officeDocumentView } from "@/lib/documents";
import { formatRelativeTr, startOfDay } from "@/lib/format";
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

  const [docs, counts, deliveredToday] = await Promise.all([
    prisma.document.findMany({
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
    }),
    prisma.document.groupBy({
      by: ["status"],
      where: { tenantId: ctx.tenant.id },
      _count: true,
    }),
    prisma.document.count({
      where: {
        tenantId: ctx.tenant.id,
        status: STATUSES.DELIVERED,
        deliveredAt: { gte: startOfDay() },
      },
    }),
  ]);

  const countMap = Object.fromEntries(counts.map((row) => [row.status, row._count]));

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="display text-3xl font-semibold">Evraklar</h1>
          <p className="text-sm text-ink-soft">Bugün {deliveredToday} teslim</p>
        </div>
        <Link
          href="/ofis/yeni"
          className="inline-flex min-h-11 items-center rounded-2xl bg-stamp px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(226,59,43,0.25)]"
        >
          Yeni
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat label="Bekleyen" value={countMap[STATUSES.RECEIVED] ?? 0} />
        <Stat label="Hazır" value={countMap[STATUSES.READY] ?? 0} accent />
        <Stat label="Teslim" value={countMap[STATUSES.DELIVERED] ?? 0} />
      </div>

      <form className="flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Ad, kod veya son 4 hane"
          className="min-h-12 flex-1 rounded-2xl border border-line bg-white px-4 text-base outline-none focus:ring-4 focus:ring-stamp/20"
        />
        <button className="min-h-12 rounded-2xl bg-night px-4 font-semibold text-cream" type="submit">
          Ara
        </button>
      </form>

      <div className="scroll-thin flex gap-2 overflow-x-auto pb-1">
        <FilterChip href="/ofis" active={!statusFilter} label="Tümü" />
        {Object.values(STATUSES).map((status) => (
          <FilterChip
            key={status}
            href={`/ofis?durum=${status}`}
            active={statusFilter === status}
            label={`${STATUS_LABELS[status]} ${countMap[status] ?? 0}`}
          />
        ))}
      </div>

      {docs.length === 0 ? (
        <EmptyState
          title="Kuyruk boş"
          body="Bu filtrede evrak yok. Yeni kayıt için alıcı adı ve T.C. no yeter."
          href="/ofis/yeni"
          action="Evrak kaydet"
        />
      ) : (
        <ul className="space-y-2">
          {docs.map((raw) => {
            const doc = officeDocumentView(raw);
            return (
              <li key={doc.id}>
                <Link
                  href={`/ofis/evrak/${doc.id}`}
                  className="paper-card lift flex min-h-[4.5rem] items-center gap-3 rounded-[24px] px-3 py-3"
                >
                  <Avatar name={doc.recipientName} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{doc.recipientName}</p>
                    <p className="truncate text-sm text-ink-soft">
                      {maskTcLast4(doc.recipientTcLast4)} · {doc.trackingCode}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={doc.status} />
                    <span className="text-[11px] text-ink-soft">{formatRelativeTr(doc.receivedAt)}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-[22px] px-3 py-3 ${accent ? "bg-stamp text-white" : "bg-night text-cream"}`}>
      <p className="display text-2xl font-semibold">{value}</p>
      <p className="text-[11px] uppercase tracking-wider opacity-70">{label}</p>
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
        active ? "bg-night text-cream" : "bg-white text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
