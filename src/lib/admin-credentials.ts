import { compare } from "bcryptjs";

const PREVIEW_ADMIN_EMAIL = "admin@casadabuganvilia.pt";
const PREVIEW_ADMIN_PASSWORD_HASH =
  "$2b$12$UYSwAVhEV1in7GL6FuNt8.LYL909Z5lIL.W7Jxvp1gltaiZB53psK";

interface AdminCredentialOptions {
  databaseUrl?: string;
  isVercel?: string;
  previewAdminFallback?: string;
}

export interface AdminUserSession {
  id: string;
  email: string;
  name: string;
}

export function canUsePreviewAdminFallback({
  databaseUrl = process.env.DATABASE_URL,
  isVercel = process.env.VERCEL,
  previewAdminFallback = process.env.AUTH_PREVIEW_ADMIN_FALLBACK,
}: AdminCredentialOptions = {}) {
  if (previewAdminFallback === "true") return true;
  if (previewAdminFallback === "false") return false;

  return Boolean(isVercel) && (!databaseUrl || databaseUrl.startsWith("file:"));
}

export async function verifyPreviewAdminCredentials(
  email: string,
  password: string,
  options: AdminCredentialOptions = {},
): Promise<AdminUserSession | null> {
  if (!canUsePreviewAdminFallback(options)) return null;
  if (email.toLowerCase() !== PREVIEW_ADMIN_EMAIL) return null;

  const isValid = await compare(password, PREVIEW_ADMIN_PASSWORD_HASH);
  if (!isValid) return null;

  return {
    id: "preview-admin",
    email: PREVIEW_ADMIN_EMAIL,
    name: "Admin",
  };
}
