import { describe, expect, it } from "vitest";
import { getLocalizedRecord } from "./translations";

const records = [
  { locale: "pt", name: "Cerâmica" },
  { locale: "en", name: "Ceramics" },
];

describe("getLocalizedRecord", () => {
  it("returns the requested locale when available", () => {
    expect(getLocalizedRecord(records, "pt")?.name).toBe("Cerâmica");
  });

  it("falls back to English for untranslated visitor locales", () => {
    expect(getLocalizedRecord(records, "fr")?.name).toBe("Ceramics");
  });

  it("falls back to Portuguese when English is unavailable", () => {
    expect(
      getLocalizedRecord([{ locale: "pt", name: "Vinhos" }], "de")?.name,
    ).toBe("Vinhos");
  });
});
