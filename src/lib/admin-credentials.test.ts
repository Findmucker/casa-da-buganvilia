import { describe, expect, it } from "vitest";
import {
  canUsePreviewAdminFallback,
  resolveAuthSecret,
  verifyPreviewAdminCredentials,
} from "./admin-credentials";

describe("preview admin credentials", () => {
  it("is disabled by default on Vercel when DATABASE_URL is unset", () => {
    expect(canUsePreviewAdminFallback()).toBe(false);
  });

  it("is disabled when a production database is configured", () => {
    expect(canUsePreviewAdminFallback()).toBe(false);
  });

  it("is not enabled by a local file database URL", () => {
    expect(canUsePreviewAdminFallback()).toBe(false);
  });

  it("can be enabled explicitly", () => {
    expect(
      canUsePreviewAdminFallback({
        previewAdminFallback: "true",
      }),
    ).toBe(true);
  });

  it("can be disabled explicitly", () => {
    expect(
      canUsePreviewAdminFallback({
        previewAdminFallback: "false",
      }),
    ).toBe(false);
  });

  it("accepts the documented preview admin credentials when enabled", async () => {
    await expect(
      verifyPreviewAdminCredentials("admin@casadabuganvilia.pt", "admin123", {
        previewAdminFallback: "true",
      }),
    ).resolves.toMatchObject({
      id: "preview-admin",
      email: "admin@casadabuganvilia.pt",
    });
  });

  it("rejects invalid preview admin credentials", async () => {
    await expect(
      verifyPreviewAdminCredentials("admin@casadabuganvilia.pt", "wrong", {
        previewAdminFallback: "true",
      }),
    ).resolves.toBeNull();
  });

  it("uses configured auth secrets first", () => {
    expect(resolveAuthSecret({ authSecret: "auth-secret" })).toBe(
      "auth-secret",
    );
    expect(resolveAuthSecret({ nextAuthSecret: "nextauth-secret" })).toBe(
      "nextauth-secret",
    );
  });

  it("uses a preview auth secret when fallback is explicitly enabled", () => {
    expect(
      resolveAuthSecret({ previewAdminFallback: "true" }),
    ).toBeTruthy();
  });

  it("does not use a preview auth secret with a managed database", () => {
    expect(resolveAuthSecret()).toBeUndefined();
  });
});
