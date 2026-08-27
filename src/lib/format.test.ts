import { describe, expect, it } from "vitest";
import { formatRelativeTr, initials } from "./format";

describe("görünen yardımcılar", () => {
  it("Türkçe baş harf üretir", () => {
    expect(initials("Ahmet Yılmaz")).toBe("AY");
  });

  it("göreli zamanı Türkçe yazar", () => {
    const now = new Date("2026-08-27T12:00:00Z");
    expect(formatRelativeTr(new Date("2026-08-27T11:59:30Z"), now)).toBe("az önce");
    expect(formatRelativeTr(new Date("2026-08-27T11:10:00Z"), now)).toBe("50 dk önce");
  });
});
