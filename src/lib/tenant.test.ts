import { describe, expect, it } from "vitest";
import { canTransition, STATUSES } from "./constants";
import { assertTenantScope } from "./tenant";

describe("teslim durum makinesi", () => {
  it("alınan evrakı teslime hazır ve iadeye izin verir", () => {
    expect(canTransition(STATUSES.RECEIVED, STATUSES.READY)).toBe(true);
    expect(canTransition(STATUSES.READY, STATUSES.DELIVERED)).toBe(true);
    expect(canTransition(STATUSES.DELIVERED, STATUSES.READY)).toBe(false);
  });
});

describe("kiracı izolasyonu", () => {
  it("başka muhtarlığın kaydına erişimi keser", () => {
    expect(() => assertTenantScope("tenant-a", "tenant-b")).toThrow(/yetkiniz yok/);
    expect(() => assertTenantScope("tenant-a", "tenant-a")).not.toThrow();
  });
});
