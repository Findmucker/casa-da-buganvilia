import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveDatasourceUrl } from "./prisma";

describe("resolveDatasourceUrl", () => {
  it("uses an explicit database URL first", () => {
    expect(
      resolveDatasourceUrl({
        databaseUrl: "postgresql://user:pass@example.com:5432/app",
        isVercel: "1",
        cwd: "C:\\project",
      }),
    ).toBe("postgresql://user:pass@example.com:5432/app");
  });

  it("uses the bundled SQLite database on Vercel when no database URL is set", () => {
    const cwd = path.join("C:", "project", "site");

    expect(resolveDatasourceUrl({ databaseUrl: "", isVercel: "1", cwd })).toBe(
      `file:${path.join(cwd, "prisma", "dev.db")}`,
    );
  });

  it("lets Prisma use the schema datasource outside Vercel", () => {
    expect(
      resolveDatasourceUrl({ databaseUrl: "", cwd: "C:\\project" }),
    ).toBeUndefined();
  });
});
