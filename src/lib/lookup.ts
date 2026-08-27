import { DOCUMENT_TYPE_LABELS, type DocumentStatus, type DocumentType } from "@/lib/constants";
import { mapsUrl, telUrl, toPublicLookup, type PublicOfficeInfo } from "@/lib/kvkk";
import { prisma } from "@/lib/prisma";
import { hashesEqual } from "@/lib/tc";
import { normalizeTrackingCode } from "@/lib/tracking";

export function toOfficeInfo(tenant: {
  slug: string;
  name: string;
  neighborhood: string;
  district: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  muhtarName: string;
}): PublicOfficeInfo {
  return {
    slug: tenant.slug,
    name: tenant.name,
    neighborhood: tenant.neighborhood,
    district: tenant.district,
    city: tenant.city,
    address: tenant.address,
    phone: tenant.phone,
    hours: tenant.hours,
    muhtarName: tenant.muhtarName,
  };
}

export function officeLinks(office: PublicOfficeInfo) {
  return {
    call: telUrl(office.phone),
    maps: mapsUrl(office.address, office.city),
  };
}

export async function lookupByTracking(trackingCode: string, last4: string) {
  const code = normalizeTrackingCode(trackingCode);
  const digits = last4.replace(/\D/g, "").slice(-4);
  if (!code || digits.length !== 4) {
    return { error: "Takip kodu ve T.C. kimlik numarasının son 4 hanesi gerekli." as const };
  }

  const doc = await prisma.document.findUnique({
    where: { trackingCode: code },
    include: { tenant: true },
  });

  if (!doc || doc.anonymizedAt || !doc.tenant.active) {
    return { error: "Eşleşen evrak bulunamadı. Bilgileri kontrol edin." as const };
  }

  if (doc.recipientTcLast4 !== digits) {
    return { error: "Eşleşen evrak bulunamadı. Bilgileri kontrol edin." as const };
  }

  const payload = toPublicLookup({
    trackingCode: doc.trackingCode,
    status: doc.status as DocumentStatus,
    typeLabel: DOCUMENT_TYPE_LABELS[doc.type as DocumentType] ?? "Evrak",
    receivedAt: doc.receivedAt,
    office: toOfficeInfo(doc.tenant),
  });

  return { result: payload };
}

export async function citizenDocuments(tcHash: string) {
  const docs = await prisma.document.findMany({
    where: { recipientTcHash: tcHash, anonymizedAt: null, tenant: { active: true } },
    include: { tenant: true },
    orderBy: { receivedAt: "desc" },
  });

  return docs
    .filter((doc) => hashesEqual(doc.recipientTcHash, tcHash))
    .map((doc) => ({
      id: doc.id,
      trackingCode: doc.trackingCode,
      status: doc.status as DocumentStatus,
      typeLabel: DOCUMENT_TYPE_LABELS[doc.type as DocumentType] ?? doc.title,
      receivedAt: doc.receivedAt,
      deliveredAt: doc.deliveredAt,
      notifiedAt: doc.notifiedAt,
      office: toOfficeInfo(doc.tenant),
    }));
}
