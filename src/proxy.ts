import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getConstructionPath, isSiteLive } from "./lib/site-mode";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (!isSiteLive()) {
    const constructionPath = getConstructionPath(request.nextUrl.pathname);

    if (request.nextUrl.pathname !== constructionPath) {
      return NextResponse.redirect(new URL(constructionPath, request.url));
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
