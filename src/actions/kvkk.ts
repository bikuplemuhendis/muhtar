"use server";

import { redirect } from "next/navigation";
import { writeAudit } from "@/lib/audit";
import { getRequestIp, requireCitizen } from "@/lib/auth";
import { KVKK_POLICY_VERSION } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { citizenDocuments } from "@/lib/lookup";
import { clearSessionCookie } from "@/lib/session";

export async function exportMyDataAction() {
  const ctx = await requireCitizen();
  const docs = await citizenDocuments(ctx.user.tcHash!);
  await writeAudit({
    action: "kvkk.export",
    entity: "user",
    entityId: ctx.user.id,
    actorId: ctx.user.id,
    ip: await getRequestIp(),
    meta: { policy: KVKK_POLICY_VERSION, documents: docs.length },
  });

  return {
    exportedAt: new Date().toISOString(),
    policyVersion: KVKK_POLICY_VERSION,
    person: {
      fullName: ctx.user.fullName,
      email: ctx.user.email,
      phone: ctx.user.phone,
      tcLast4: ctx.user.tcLast4,
    },
    documents: docs.map((doc) => ({
      trackingCode: doc.trackingCode,
      typeLabel: doc.typeLabel,
      status: doc.status,
      receivedAt: doc.receivedAt,
      deliveredAt: doc.deliveredAt,
      office: doc.office,
    })),
  };
}

export async function deleteMyAccountAction() {
  const ctx = await requireCitizen();
  const now = new Date();

  await prisma.$transaction([
    prisma.document.updateMany({
      where: { recipientTcHash: ctx.user.tcHash ?? undefined },
      data: {
        recipientName: "Anonim kayıt",
        notes: null,
        sourceOrg: null,
        anonymizedAt: now,
      },
    }),
    prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        fullName: "Anonim kullanıcı",
        email: `silindi-${ctx.user.id}@anonymized.local`,
        phone: null,
        passwordHash: "!",
        tcHash: null,
        anonymizedAt: now,
      },
    }),
    prisma.consent.create({
      data: {
        userId: ctx.user.id,
        purpose: "Hesap silme / unutulma talebi",
        version: KVKK_POLICY_VERSION,
        granted: false,
        ip: await getRequestIp(),
      },
    }),
  ]);

  await writeAudit({
    action: "kvkk.anonymize_account",
    entity: "user",
    entityId: ctx.user.id,
    actorId: ctx.user.id,
    ip: await getRequestIp(),
  });
  await clearSessionCookie();
  redirect("/?silindi=1");
}
