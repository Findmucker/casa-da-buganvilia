import { describe, expect, it } from "vitest";
import {
  canUsePreviewAdminFallback,
  resolveAuthSecret,
  verifyPreviewAdminCredentials,
} from "./admin-credentials";

describe("preview admin credentials", () => {
  it("is enabled on Vercel when DATABASE_URL is unset", () => {
    expect(canUsePreviewAdminFallback({ isVercel: "1" })).toBe(true);
  });

  it("is disabled when a production database is configured", () => {
    expect(
      canUsePreviewAdminFallback({
        databaseUrl: "postgresql://user:pass@example.com:5432/app",
        isVercel: "1",
      }),
    ).toBe(false);
  });

  it("is enabled on Vercel when DATABASE_URL points at SQLite", () => {
    expect(
      canUsePreviewAdminFallback({
        databaseUrl: "file:./prisma/dev.db",
        isVercel: "1",
      }),
    ).toBe(true);
  });

  it("can be disabled explicitly", () => {
    expect(
      canUsePreviewAdminFallback({
        isVercel: "1",
        previewAdminFallback: "false",
      }),
    ).toBe(false);
  });

  it("accepts the documented preview admin credentials when enabled", async () => {
    await expect(
      verifyPreviewAdminCredentials("admin@casadabuganvilia.pt", "admin123", {
        isVercel: "1",
      }),
    ).resolves.toMatchObject({
      id: "preview-admin",
      email: "admin@casadabuganvilia.pt",
    });
  });

  it("rejects invalid preview admin credentials", async () => {
    await expect(
      verifyPreviewAdminCredentials("admin@casadabuganvilia.pt", "wrong", {
        isVercel: "1",
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

  it("uses a preview auth secret when Vercel preview mode has no configured secret", () => {
    expect(resolveAuthSecret({ isVercel: "1" })).toBeTruthy();
  });

  it("does not use a preview auth secret with a managed database", () => {
    expect(
      resolveAuthSecret({
        databaseUrl: "postgresql://user:pass@example.com:5432/app",
        isVercel: "1",
      }),
    ).toBeUndefined();
  });
});
