import { describe, expect, it } from "vitest";
import { resolveDatasourceUrl } from "./prisma";

describe("resolveDatasourceUrl", () => {
  it("uses an explicit database URL first", () => {
    expect(
      resolveDatasourceUrl({
        databaseUrl: "postgresql://user:pass@example.com:5432/app",
      }),
    ).toBe("postgresql://user:pass@example.com:5432/app");
  });

  it("lets Prisma use the schema datasource when no database URL is set", () => {
    expect(resolveDatasourceUrl({ databaseUrl: "" })).toBeUndefined();
  });
});
