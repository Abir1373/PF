import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js 16 Proxy (formerly Middleware)
 * Lightweight auth check: reads the Better Auth session cookie.
 * Heavy JWT verification (JWKS fetch) is intentionally avoided here
 * because it causes "res.setHeader is not a function" errors in the
 * Next.js edge-compatible runtime. Full token verification happens
 * inside the Express server (server.ts) for protected API routes.
 */

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Better Auth session cookie (set by Better Auth on login)
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isLoggedIn = !!sessionToken;

  // Protected routes — redirect to /login if no session cookie
  const protectedRoutes = ["/dashboard", "/admin"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which paths this proxy applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth (Better Auth route handler)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     * - public svg/images
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
