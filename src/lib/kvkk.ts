import type { DocumentStatus } from "@/lib/constants";
import { STATUS_HINTS, STATUS_LABELS } from "@/lib/constants";

export function maskTcLast4(last4: string): string {
  const digits = last4.replace(/\D/g, "").slice(-4);
  if (digits.length !== 4) return "•••••••••••";
  return `•••••••${digits}`;
}

export function maskName(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => {
      const first = part[0] ?? "";
      return `${first}${"•".repeat(Math.max(part.length - 1, 2))}`;
    })
    .join(" ");
}

export type PublicOfficeInfo = {
  slug: string;
  name: string;
  neighborhood: string;
  district: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  muhtarName: string;
};

export type PublicLookupResult = {
  trackingCode: string;
  status: DocumentStatus;
  statusLabel: string;
  statusHint: string;
  typeLabel: string;
  receivedAt: string;
  office: PublicOfficeInfo;
};

const PUBLIC_LOOKUP_KEYS = [
  "trackingCode",
  "status",
  "statusLabel",
  "statusHint",
  "typeLabel",
  "receivedAt",
  "office",
] as const;

export function assertNoPiiInPublicLookup(payload: PublicLookupResult): void {
  const extra = Object.keys(payload).filter(
    (key) => !PUBLIC_LOOKUP_KEYS.includes(key as (typeof PUBLIC_LOOKUP_KEYS)[number]),
  );
  if (extra.length > 0) {
    throw new Error(`Kamu sorgusu fazla alan içeriyor: ${extra.join(", ")}`);
  }
  const asText = JSON.stringify(payload);
  if (/\b\d{11}\b/.test(asText)) {
    throw new Error("Kamu sorgusu T.C. kimlik numarası sızdırıyor");
  }
}

export function toPublicLookup(input: {
  trackingCode: string;
  status: DocumentStatus;
  typeLabel: string;
  receivedAt: Date;
  office: PublicOfficeInfo;
}): PublicLookupResult {
  const payload: PublicLookupResult = {
    trackingCode: input.trackingCode,
    status: input.status,
    statusLabel: STATUS_LABELS[input.status],
    statusHint: STATUS_HINTS[input.status],
    typeLabel: input.typeLabel,
    receivedAt: input.receivedAt.toISOString(),
    office: input.office,
  };
  assertNoPiiInPublicLookup(payload);
  return payload;
}

export function mapsUrl(address: string, city: string): string {
  const q = encodeURIComponent(`${address}, ${city}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function telUrl(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

export function anonymizedRecipientName(): string {
  return "Anonim kayıt";
}
