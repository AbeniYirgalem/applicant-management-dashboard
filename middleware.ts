import { NextRequest, NextResponse } from "next/server";
const cookie = "infnova_access_token";
export function middleware(request: NextRequest) { const token = request.cookies.get(cookie)?.value; const { pathname } = request.nextUrl; if (pathname.startsWith("/dashboard") && !token) return NextResponse.redirect(new URL("/login", request.url)); if (pathname === "/login" && token) return NextResponse.redirect(new URL("/dashboard", request.url)); return NextResponse.next(); }
export const config = { matcher: ["/dashboard/:path*", "/login"] };