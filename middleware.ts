import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./utils/auth.services";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/sheet")) {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyJWT(token);

    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (path.startsWith("/")) {
    return NextResponse.redirect(new URL("/sheet", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sheet/:path*", "/api/sheet/:path*", "/"],
};
