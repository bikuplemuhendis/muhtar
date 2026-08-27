"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAudit } from "@/lib/audit";
import { getRequestIp, requireOffice } from "@/lib/auth";
import {
  canTransition,
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPES,
  STATUSES,
  type DocumentStatus,
  type DocumentType,
} from "@/lib/constants";
import { assertTenantScope } from "@/lib/tenant";
import { getTenantDocument, retainUntilFrom, STATUS_EVENT } from "@/lib/documents";
import { prisma } from "@/lib/prisma";
import { hashTc, isValidTc, normalizeTc, tcLast4 } from "@/lib/tc";
import { generateTrackingCode } from "@/lib/tracking";

export type ActionState = { error?: string; ok?: boolean } | null;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

async function uniqueTrackingCode() {
  for (let i = 0; i < 8; i += 1) {
    const code = generateTrackingCode();
    const exists = await prisma.document.findUnique({ where: { trackingCode: code } });
    if (!exists) return code;
  }
  throw new Error("Takip kodu üretilemedi");
}

export async function createDocumentAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ctx = await requireOffice();
  const recipientName = str(formData, "recipientName");
  const tc = normalizeTc(str(formData, "tc"));
  const type = str(formData, "type") as DocumentType;
  const sourceOrg = str(formData, "sourceOrg");
  const notes = str(formData, "notes");

  if (!recipientName) return { error: "Alıcı adı gerekli." };
  if (!isValidTc(tc)) return { error: "T.C. kimlik numarası doğrulanamadı." };
  if (!Object.values(DOCUMENT_TYPES).includes(type)) {
    return { error: "Evrak türü seçin." };
  }

  const trackingCode = await uniqueTrackingCode();
  const doc = await prisma.document.create({
    data: {
      tenantId: ctx.tenant.id,
      trackingCode,
      type,
      title: DOCUMENT_TYPE_LABELS[type],
      sourceOrg: sourceOrg || null,
      notes: notes || null,
      recipientName,
      recipientTcHash: hashTc(tc),
      recipientTcLast4: tcLast4(tc),
      status: STATUSES.RECEIVED,
      createdById: ctx.user.id,
      events: {
        create: {
          actorId: ctx.user.id,
          action: STATUS_EVENT.RECEIVED,
          note: "Evrak kayda alındı",
        },
      },
    },
  });

  await writeAudit({
    action: "document.create",
    entity: "document",
    entityId: doc.id,
    actorId: ctx.user.id,
    tenantId: ctx.tenant.id,
    ip: await getRequestIp(),
    meta: { trackingCode, type, tcLast4: doc.recipientTcLast4 },
  });

  revalidatePath("/ofis");
  redirect(`/ofis/evrak/${doc.id}?yeni=1`);
}

export async function changeStatusAction(formData: FormData): Promise<void> {
  const ctx = await requireOffice();
  const documentId = str(formData, "documentId");
  const nextStatus = str(formData, "status") as DocumentStatus;
  const identityChecked = str(formData, "identityChecked") === "on";
  const notify = str(formData, "notify") === "on";

  const doc = await getTenantDocument(ctx.tenant.id, documentId);
  if (!doc) throw new Error("Evrak bulunamadı");
  assertTenantScope(ctx.tenant.id, doc.tenantId);

  if (!canTransition(doc.status as DocumentStatus, nextStatus)) {
    throw new Error("Bu durum geçişi yapılamaz");
  }

  if (nextStatus === STATUSES.DELIVERED && !identityChecked && !doc.identityChecked) {
    throw new Error("Teslim için kimlik kontrolü işaretlenmelidir");
  }

  const now = new Date();
  await prisma.document.update({
    where: { id: doc.id },
    data: {
      status: nextStatus,
      readyAt: nextStatus === STATUSES.READY ? now : doc.readyAt,
      notifiedAt: nextStatus === STATUSES.READY && notify ? now : doc.notifiedAt,
      deliveredAt: nextStatus === STATUSES.DELIVERED ? now : doc.deliveredAt,
      deliveredById: nextStatus === STATUSES.DELIVERED ? ctx.user.id : doc.deliveredById,
      identityChecked: nextStatus === STATUSES.DELIVERED ? true : doc.identityChecked,
      retainUntil:
        nextStatus === STATUSES.DELIVERED ? retainUntilFrom(now) : doc.retainUntil,
      events: {
        create: {
          actorId: ctx.user.id,
          action: STATUS_EVENT[nextStatus],
          note:
            nextStatus === STATUSES.DELIVERED
              ? "Kimlik kontrolü ile teslim"
              : nextStatus === STATUSES.READY && notify
                ? "Teslime hazır; bildirim kuyruğa alındı (içerik paylaşılmadan)"
                : null,
        },
      },
    },
  });

  await writeAudit({
    action: `document.${nextStatus.toLowerCase()}`,
    entity: "document",
    entityId: doc.id,
    actorId: ctx.user.id,
    tenantId: ctx.tenant.id,
    ip: await getRequestIp(),
    meta: { trackingCode: doc.trackingCode, from: doc.status, to: nextStatus },
  });

  revalidatePath("/ofis");
  revalidatePath(`/ofis/evrak/${doc.id}`);
  revalidatePath("/ofis/teslim");
}
