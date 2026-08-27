import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ROLES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { readSession, type SessionPayload } from "@/lib/session";

export { assertTenantScope } from "@/lib/tenant";

export class AuthError extends Error {
  constructor(message = "Oturum gerekli") {
    super(message);
    this.name = "AuthError";
  }
}

export async function getRequestIp(): Promise<string | undefined> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || undefined;
}

export async function getSessionUser() {
  const session = await readSession();
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    include: { memberships: { include: { tenant: true } } },
  });
  if (!user || user.anonymizedAt) return null;
  return { session, user };
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await readSession();
  if (!session) throw new AuthError();
  return session;
}

export async function requireCitizen() {
  const ctx = await getSessionUser();
  if (!ctx || ctx.user.role !== ROLES.CITIZEN) {
    redirect("/giris?next=/hesabim");
  }
  if (!ctx.user.kvkkConsentAt || !ctx.user.tcHash) {
    redirect("/kayit?eksik=1");
  }
  return ctx;
}

export async function requireOffice() {
  const ctx = await getSessionUser();
  if (!ctx) redirect("/giris?next=/ofis");
  const officeRole =
    ctx.user.role === ROLES.MUHTAR || ctx.user.role === ROLES.STAFF;
  if (!officeRole || !ctx.session.tenantId) {
    redirect("/giris?next=/ofis");
  }
  const membership = ctx.user.memberships.find(
    (m) => m.tenantId === ctx.session.tenantId && m.tenant.active,
  );
  if (!membership) redirect("/giris?next=/ofis");
  return { ...ctx, tenant: membership.tenant, membership };
}
