import { createHmac, timingSafeEqual } from "node:crypto";

const TC_REGEX = /^\d{11}$/;

export function normalizeTc(value: string): string {
  return value.replace(/\s+/g, "").trim();
}

export function isValidTc(value: string): boolean {
  const tc = normalizeTc(value);
  if (!TC_REGEX.test(tc)) return false;
  if (tc[0] === "0") return false;

  const d = tc.split("").map(Number);
  const odd = d[0] + d[2] + d[4] + d[6] + d[8];
  const even = d[1] + d[3] + d[5] + d[7];
  const tenth = ((odd * 7 - even) % 10 + 10) % 10;
  if (tenth !== d[9]) return false;
  const eleventh = (d.slice(0, 10).reduce((sum, n) => sum + n, 0) % 10);
  return eleventh === d[10];
}

export function tcLast4(value: string): string {
  const tc = normalizeTc(value);
  return tc.slice(-4);
}

export function getKvkkPepper(): string {
  const pepper = process.env.KVKK_PEPPER || process.env.AUTH_SECRET;
  if (!pepper || pepper.length < 16) {
    throw new Error("KVKK_PEPPER veya AUTH_SECRET tanımlı olmalıdır.");
  }
  return pepper;
}

export function hashTc(value: string): string {
  if (!isValidTc(value)) {
    throw new Error("Geçersiz T.C. kimlik numarası");
  }
  return createHmac("sha256", getKvkkPepper())
    .update(normalizeTc(value), "utf8")
    .digest("hex");
}

export function hashesEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
