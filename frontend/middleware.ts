import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ?? "safnom_token";

const protectedPaths = ["/profile", "/workspace", "/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/workspace/:path*", "/dashboard/:path*"],
};
