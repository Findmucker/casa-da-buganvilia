import { describe, expect, it } from "vitest";
import { getConstructionPath, isSiteLive } from "./site-mode";

describe("isSiteLive", () => {
  it.each(["true", "TRUE", " true "])(
    "enables the storefront for %j",
    (value) => {
      expect(isSiteLive(value)).toBe(true);
    },
  );

  it.each([undefined, "", "false", "1", "yes"])(
    "keeps construction mode enabled for %j",
    (value) => {
      expect(isSiteLive(value)).toBe(false);
    },
  );
});

describe("getConstructionPath", () => {
  it.each([
    ["/", "/"],
    ["/shop", "/"],
    ["/pt/shop", "/"],
    ["/en/shop/item", "/en"],
    ["/fr/gallery", "/fr"],
    ["/ja/contact", "/ja"],
  ])("maps %s to %s", (pathname, expectedPath) => {
    expect(getConstructionPath(pathname)).toBe(expectedPath);
  });
});
