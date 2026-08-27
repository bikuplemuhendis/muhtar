"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { writeAudit } from "@/lib/audit";
import { getRequestIp, requireOffice } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export type ActionState = { error?: string; ok?: boolean } | null;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateOfficeAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ctx = await requireOffice();
  if (ctx.membership.role !== "OWNER") {
    return { error: "Sadece muhtar (hesap sahibi) ofis bilgilerini değiştirebilir." };
  }

  const address = str(formData, "address");
  const phone = str(formData, "phone");
  const hours = str(formData, "hours");
  const muhtarName = str(formData, "muhtarName");
  const email = str(formData, "email");
  if (!address || !phone || !hours || !muhtarName) {
    return { error: "Adres, telefon, saat ve muhtar adı gerekli." };
  }

  await prisma.tenant.update({
    where: { id: ctx.tenant.id },
    data: { address, phone, hours, muhtarName, email: email || null },
  });

  await writeAudit({
    action: "tenant.update",
    entity: "tenant",
    entityId: ctx.tenant.id,
    actorId: ctx.user.id,
    tenantId: ctx.tenant.id,
    ip: await getRequestIp(),
  });
  revalidatePath("/ofis/ayarlar");
  revalidatePath(`/m/${ctx.tenant.slug}`);
  return { ok: true };
}

export async function addStaffAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ctx = await requireOffice();
  if (ctx.membership.role !== "OWNER") {
    return { error: "Sadece muhtar personel ekleyebilir." };
  }

  const fullName = str(formData, "fullName");
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  if (!fullName || !email || !password) return { error: "Ad, e-posta ve parola gerekli." };
  if (password.length < 8) return { error: "Parola en az 8 karakter olmalı." };

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { error: "Bu e-posta zaten kayıtlı." };

  const user = await prisma.user.create({
    data: {
      email,
      fullName,
      passwordHash: await bcrypt.hash(password, 12),
      role: ROLES.STAFF,
      memberships: {
        create: { tenantId: ctx.tenant.id, role: "STAFF" },
      },
    },
  });

  await writeAudit({
    action: "staff.create",
    entity: "user",
    entityId: user.id,
    actorId: ctx.user.id,
    tenantId: ctx.tenant.id,
    ip: await getRequestIp(),
  });
  revalidatePath("/ofis/ayarlar");
  return { ok: true };
}
