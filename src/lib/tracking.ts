import { randomInt } from "node:crypto";

const ALPHABET = "ABCDEFGHJKMNPQRSTVWXYZ23456789";

export function generateTrackingCode(now = new Date()): string {
  let body = "";
  for (let i = 0; i < 6; i += 1) {
    body += ALPHABET[randomInt(ALPHABET.length)];
  }
  const year = String(now.getFullYear()).slice(-2);
  return `EVK-${year}${body}`;
}

export function normalizeTrackingCode(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}
