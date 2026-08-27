import { prisma } from "@/lib/prisma";

type AuditInput = {
  action: string;
  entity: string;
  entityId?: string;
  tenantId?: string;
  actorId?: string;
  ip?: string;
  meta?: Record<string, string | number | boolean | null | undefined>;
};

export async function writeAudit(input: AuditInput) {
  const meta = input.meta
    ? JSON.stringify(
        Object.fromEntries(
          Object.entries(input.meta).filter(([, value]) => value !== undefined),
        ),
      )
    : null;

  await prisma.auditLog.create({
    data: {
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      tenantId: input.tenantId,
      actorId: input.actorId,
      ip: input.ip,
      meta,
    },
  });
}
