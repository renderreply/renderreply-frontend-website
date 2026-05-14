import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";
  const isPublicPage = req.nextUrl.pathname === "/privacy" || req.nextUrl.pathname === "/terms" || req.nextUrl.pathname === "/refund";
  
  // Check for NextAuth session token (handles both HTTP and HTTPS local/prod environments)
  const hasToken = req.cookies.has("next-auth.session-token") || req.cookies.has("__Secure-next-auth.session-token");

  // If the user has NO token and they are NOT on the login/signup page and NOT on a public legal page -> redirect to login
  if (!hasToken && !isAuthPage && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user HAS a token and they are trying to view login or signup -> redirect to home
  if (hasToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
};
