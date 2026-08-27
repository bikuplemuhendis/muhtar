import {
  DOCUMENT_TYPE_LABELS,
  RETENTION_MONTHS_AFTER_DELIVERY,
  type DocumentStatus,
  type DocumentType,
} from "@/lib/constants";
import { anonymizedRecipientName } from "@/lib/kvkk";
import { prisma } from "@/lib/prisma";

export function addMonths(date: Date, months: number): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

export function retainUntilFrom(deliveredAt: Date): Date {
  return addMonths(deliveredAt, RETENTION_MONTHS_AFTER_DELIVERY);
}

export async function getTenantDocument(tenantId: string, documentId: string) {
  return prisma.document.findFirst({
    where: { id: documentId, tenantId },
    include: { tenant: true, events: { orderBy: { createdAt: "desc" } } },
  });
}

export function officeDocumentView(doc: {
  id: string;
  trackingCode: string;
  type: string;
  title: string;
  sourceOrg: string | null;
  notes: string | null;
  recipientName: string;
  recipientTcLast4: string;
  status: string;
  receivedAt: Date;
  readyAt: Date | null;
  notifiedAt: Date | null;
  deliveredAt: Date | null;
  identityChecked: boolean;
  anonymizedAt: Date | null;
}) {
  return {
    id: doc.id,
    trackingCode: doc.trackingCode,
    type: doc.type as DocumentType,
    typeLabel: DOCUMENT_TYPE_LABELS[doc.type as DocumentType] ?? doc.title,
    title: doc.title,
    sourceOrg: doc.sourceOrg,
    notes: doc.anonymizedAt ? null : doc.notes,
    recipientName: doc.anonymizedAt ? anonymizedRecipientName() : doc.recipientName,
    recipientTcLast4: doc.recipientTcLast4,
    status: doc.status as DocumentStatus,
    receivedAt: doc.receivedAt,
    readyAt: doc.readyAt,
    notifiedAt: doc.notifiedAt,
    deliveredAt: doc.deliveredAt,
    identityChecked: doc.identityChecked,
    anonymized: Boolean(doc.anonymizedAt),
  };
}

export const STATUS_EVENT: Record<DocumentStatus, string> = {
  RECEIVED: "status.received",
  READY: "status.ready",
  DELIVERED: "status.delivered",
  RETURNED: "status.returned",
};
