import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

process.env.AUTH_SECRET ??= "local-dev-auth-secret-do-not-use-in-prod-32";
process.env.KVKK_PEPPER ??= "local-dev-kvkk-pepper-do-not-use-in-prod-32";
process.env.DATABASE_URL ??= `file:${path.join(process.cwd(), "prisma", "dev.db")}`;

const dbFile = path.join(process.cwd(), "prisma", "dev.db");

describe.skipIf(!existsSync(dbFile))("kamu ve vatandaş sorgusu", () => {
  it("takip kodu + son 4 ile ofis telefonunu döndürür, ad döndürmez", async () => {
    const { lookupByTracking } = await import("./lookup");
    const outcome = await lookupByTracking("EVK-26DEMO1", "0146");
    expect("result" in outcome && outcome.result).toBeTruthy();
    if (!("result" in outcome) || !outcome.result) return;
    expect(outcome.result.office.phone).toContain("0216");
    expect(outcome.result.office.address.toLowerCase()).toContain("bağdat");
    expect(JSON.stringify(outcome.result)).not.toMatch(/Ahmet|Yılmaz|10000000146/);
  });

  it("yanlış son 4 hanede aynı hatayı verir (kullanıcı enumerasyonu yok)", async () => {
    const { lookupByTracking } = await import("./lookup");
    const miss = await lookupByTracking("EVK-26DEMO1", "9999");
    const missing = await lookupByTracking("EVK-00NONE", "0146");
    expect("error" in miss && miss.error).toBe("Eşleşen evrak bulunamadı. Bilgileri kontrol edin.");
    expect("error" in missing && missing.error).toBe(miss.error);
  });
});
