import { requireOffice } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Denetim kaydı" };
export const dynamic = "force-dynamic";

export default async function AuditPage() {
  const ctx = await requireOffice();
  const logs = await prisma.auditLog.findMany({
    where: { tenantId: ctx.tenant.id },
    orderBy: { createdAt: "desc" },
    take: 80,
  });

  return (
    <div className="space-y-4">
      <h1 className="display text-3xl font-semibold">Denetim</h1>
      <p className="text-sm text-ink-soft">
        Kim, hangi işlemi yaptı. Tam T.C. kimlik numarası bu listede yoktur.
      </p>
      <ol className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="paper-card rounded-2xl px-4 py-3 text-sm">
            <p className="font-semibold">{log.action}</p>
            <p className="text-ink-soft">
              {log.createdAt.toLocaleString("tr-TR")}
              {log.meta ? ` · ${log.meta}` : ""}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
