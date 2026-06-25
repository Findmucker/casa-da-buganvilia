import { compare } from "bcryptjs";

const PREVIEW_ADMIN_EMAIL = "admin@casadabuganvilia.pt";
const PREVIEW_ADMIN_PASSWORD_HASH =
  "$2b$12$UYSwAVhEV1in7GL6FuNt8.LYL909Z5lIL.W7Jxvp1gltaiZB53psK";
const PREVIEW_AUTH_SECRET =
  "preview-admin-auth-fallback-5a944a20b7a3412e9a33d6bb16f4e2fd";

interface AdminCredentialOptions {
  authSecret?: string;
  nextAuthSecret?: string;
  previewAdminFallback?: string;
}

export interface AdminUserSession {
  id: string;
  email: string;
  name: string;
}

export function canUsePreviewAdminFallback({
  previewAdminFallback = process.env.AUTH_PREVIEW_ADMIN_FALLBACK,
}: AdminCredentialOptions = {}) {
  if (previewAdminFallback === "true") return true;
  return false;
}

export function resolveAuthSecret({
  authSecret = process.env.AUTH_SECRET,
  nextAuthSecret = process.env.NEXTAUTH_SECRET,
  previewAdminFallback = process.env.AUTH_PREVIEW_ADMIN_FALLBACK,
}: AdminCredentialOptions = {}) {
  if (authSecret) return authSecret;
  if (nextAuthSecret) return nextAuthSecret;
  if (
    canUsePreviewAdminFallback({
      previewAdminFallback,
    })
  ) {
    return PREVIEW_AUTH_SECRET;
  }
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
