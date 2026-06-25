import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import {
  resolveAuthSecret,
  verifyPreviewAdminCredentials,
} from "./admin-credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: resolveAuthSecret(),
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email);
        const password = String(credentials.password);

        try {
          const { default: prisma } = await import("./prisma");
          const user = await prisma.adminUser.findUnique({
            where: { email },
          });

          if (!user) return null;

          const isValid = await compare(password, user.passwordHash);

          if (!isValid) return null;

          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error("Admin credential database lookup failed", error);
          return verifyPreviewAdminCredentials(email, password);
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/admin/login";

      if (isAdmin && !isLoginPage && !isLoggedIn) {
        return Response.redirect(new URL("/admin/login", nextUrl));
      }
      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },
});
