import { describe, expect, it } from "vitest";
import { assertNoPiiInPublicLookup, maskName, maskTcLast4, toPublicLookup } from "./kvkk";

describe("KVKK maskeleme", () => {
  it("T.C. son 4 haneyi maskeler", () => {
    expect(maskTcLast4("0146")).toBe("•••• •••• ••01 46");
    expect(maskTcLast4("0146")).not.toContain("10000000146");
  });

  it("ad soyadı kısmen gizler", () => {
    const masked = maskName("Ahmet Yılmaz");
    expect(masked.startsWith("A")).toBe(true);
    expect(masked).not.toContain("hmet");
  });

  it("kamu sorgusu ad, tam T.C. ve not alanı taşımaz", () => {
    const payload = toPublicLookup({
      trackingCode: "EVK-26DEMO1",
      status: "READY",
      typeLabel: "Resmi tebligat",
      receivedAt: new Date("2026-01-02T10:00:00Z"),
      office: {
        slug: "caddebostan",
        name: "Caddebostan Mahallesi Muhtarlığı",
        neighborhood: "Caddebostan",
        district: "Kadıköy",
        city: "İstanbul",
        address: "Bağdat Cad. No: 12",
        phone: "0216 356 00 11",
        hours: "09:00–17:00",
        muhtarName: "Ayşe Demir",
      },
    });

    expect(payload.office.phone).toBe("0216 356 00 11");
    expect(payload.office.address).toContain("Bağdat");
    expect(JSON.stringify(payload)).not.toMatch(/Ahmet|Yılmaz|10000000146/);
    expect(() => assertNoPiiInPublicLookup(payload)).not.toThrow();
  });
});
