// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Allow access to /payment-pending itself
  if (url.pathname.startsWith("/payment-pending")) {
    return NextResponse.next();
  }
  // Redirect all other requests to /payment-pending
  url.pathname = "/payment-pending";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Apply to everything except static/image assets
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
