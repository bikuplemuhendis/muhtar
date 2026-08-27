"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { writeAudit } from "@/lib/audit";
import { getRequestIp, getSessionUser } from "@/lib/auth";
import { KVKK_POLICY_VERSION, KVKK_PURPOSE, ROLES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { clearSessionCookie, setSessionCookie, signSession } from "@/lib/session";
import { hashTc, isValidTc, normalizeTc, tcLast4 } from "@/lib/tc";

export type ActionState = { error?: string; ok?: boolean } | null;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const next = str(formData, "next") || "";
  if (!email || !password) return { error: "E-posta ve parola gerekli." };

  const user = await prisma.user.findUnique({
    where: { email },
    include: { memberships: true },
  });
  if (!user || user.anonymizedAt) {
    return { error: "E-posta veya parola hatalı." };
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) return { error: "E-posta veya parola hatalı." };

  const tenantId = user.memberships[0]?.tenantId;
  const token = await signSession({
    sub: user.id,
    role: user.role as typeof ROLES.CITIZEN,
    tenantId,
    name: user.fullName,
    email: user.email,
  });
  await setSessionCookie(token);
  await writeAudit({
    action: "auth.login",
    entity: "user",
    entityId: user.id,
    actorId: user.id,
    tenantId,
    ip: await getRequestIp(),
  });

  if (next.startsWith("/")) redirect(next);
  if (user.role === ROLES.CITIZEN) redirect("/hesabim");
  redirect("/ofis");
}

export async function logoutAction() {
  const ctx = await getSessionUser();
  await clearSessionCookie();
  if (ctx) {
    await writeAudit({
      action: "auth.logout",
      entity: "user",
      entityId: ctx.user.id,
      actorId: ctx.user.id,
      tenantId: ctx.session.tenantId,
      ip: await getRequestIp(),
    });
  }
  redirect("/");
}

export async function registerCitizenAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const fullName = str(formData, "fullName");
  const email = str(formData, "email").toLowerCase();
  const phone = str(formData, "phone");
  const password = str(formData, "password");
  const tc = normalizeTc(str(formData, "tc"));
  const consent = str(formData, "consent") === "on";

  if (!fullName || !email || !password || !tc) {
    return { error: "Ad soyad, e-posta, T.C. kimlik no ve parola gerekli." };
  }
  if (password.length < 8) return { error: "Parola en az 8 karakter olmalı." };
  if (!isValidTc(tc)) return { error: "T.C. kimlik numarası doğrulanamadı." };
  if (!consent) {
    return { error: "Devam etmek için KVKK aydınlatma metnini onaylamanız gerekir." };
  }

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) return { error: "Bu e-posta ile kayıt zaten var." };

  const tcHash = hashTc(tc);
  const existingTc = await prisma.user.findUnique({ where: { tcHash } });
  if (existingTc) return { error: "Bu kimlik bilgisi ile kayıt zaten var." };

  const ip = await getRequestIp();
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 12),
      fullName,
      phone: phone || null,
      role: ROLES.CITIZEN,
      tcHash,
      tcLast4: tcLast4(tc),
      kvkkConsentAt: new Date(),
      kvkkPurpose: KVKK_PURPOSE,
      consents: {
        create: {
          purpose: KVKK_PURPOSE,
          version: KVKK_POLICY_VERSION,
          granted: true,
          ip,
        },
      },
    },
  });

  const token = await signSession({
    sub: user.id,
    role: ROLES.CITIZEN,
    name: user.fullName,
    email: user.email,
  });
  await setSessionCookie(token);
  await writeAudit({
    action: "auth.register_citizen",
    entity: "user",
    entityId: user.id,
    actorId: user.id,
    ip,
    meta: { policy: KVKK_POLICY_VERSION },
  });
  redirect("/hesabim");
}

export async function registerTenantAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = str(formData, "name");
  const neighborhood = str(formData, "neighborhood");
  const district = str(formData, "district");
  const city = str(formData, "city");
  const address = str(formData, "address");
  const phone = str(formData, "phone");
  const hours = str(formData, "hours") || "Hafta içi 09:00–17:00";
  const muhtarName = str(formData, "muhtarName");
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const slug = str(formData, "slug")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!name || !neighborhood || !district || !city || !address || !phone || !muhtarName || !email || !password || !slug) {
    return { error: "Muhtarlık ve yönetici bilgilerinin tamamını doldurun." };
  }
  if (password.length < 8) return { error: "Parola en az 8 karakter olmalı." };
  if (slug.length < 3) return { error: "Kısa ad en az 3 karakter olmalı." };

  const [slugTaken, emailTaken] = await Promise.all([
    prisma.tenant.findUnique({ where: { slug } }),
    prisma.user.findUnique({ where: { email } }),
  ]);
  if (slugTaken) return { error: "Bu kısa ad kullanımda. Başka bir kısa ad deneyin." };
  if (emailTaken) return { error: "Bu e-posta ile kayıt zaten var." };

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 12),
      fullName: muhtarName,
      phone,
      role: ROLES.MUHTAR,
    },
  });

  const tenant = await prisma.tenant.create({
    data: {
      slug,
      name,
      neighborhood,
      district,
      city,
      address,
      phone,
      hours,
      muhtarName,
      kvkkContact: email,
      members: {
        create: { userId: user.id, role: "OWNER" },
      },
    },
  });

  const token = await signSession({
    sub: user.id,
    role: ROLES.MUHTAR,
    tenantId: tenant.id,
    name: user.fullName,
    email: user.email,
  });
  await setSessionCookie(token);
  await writeAudit({
    action: "tenant.create",
    entity: "tenant",
    entityId: tenant.id,
    actorId: user.id,
    tenantId: tenant.id,
    ip: await getRequestIp(),
    meta: { slug: tenant.slug },
  });
  redirect("/ofis");
}
