import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./errors";

describe("getErrorMessage", () => {
  it("returns the message from Error instances", () => {
    expect(getErrorMessage(new Error("Request failed"))).toBe("Request failed");
  });

  it("returns string errors directly", () => {
    expect(getErrorMessage("Plain failure")).toBe("Plain failure");
  });

  it("uses a stable fallback for non-error values", () => {
    expect(getErrorMessage({ reason: "missing" })).toBe("Unknown error");
  });
});
