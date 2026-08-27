import { describe, expect, it } from "vitest";
import { hashTc, isValidTc, tcLast4 } from "./tc";

process.env.KVKK_PEPPER = "test-kvkk-pepper-at-least-16";

describe("T.C. kimlik", () => {
  it("geçerli örnek numarayı kabul eder", () => {
    expect(isValidTc("10000000146")).toBe(true);
    expect(isValidTc("12345678950")).toBe(true);
  });

  it("checksum hatasını reddeder", () => {
    expect(isValidTc("10000000147")).toBe(false);
    expect(isValidTc("00000000000")).toBe(false);
    expect(isValidTc("123")).toBe(false);
  });

  it("aynı numara için kararlı HMAC üretir ve son 4 haneyi ayırır", () => {
    const a = hashTc("10000000146");
    const b = hashTc("10000000146");
    expect(a).toBe(b);
    expect(a).toHaveLength(64);
    expect(a).not.toContain("10000000146");
    expect(tcLast4("10000000146")).toBe("0146");
  });
});
