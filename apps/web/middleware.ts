import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "localxplore.local";
const RESERVED = new Set(["www", "app", "admin", "localhost"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/portal")
  ) {
    return NextResponse.next();
  }

  const host = req.headers.get("host") ?? "";
  const hostname = host.split(":")[0] ?? "";

  if (hostname.endsWith(ROOT_DOMAIN)) {
    const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, "");
    if (subdomain && !RESERVED.has(subdomain)) {
      const url = req.nextUrl.clone();
      url.pathname = `/t/${subdomain}${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  if (hostname && !hostname.includes("localhost") && !hostname.endsWith(ROOT_DOMAIN)) {
    const url = req.nextUrl.clone();
    url.pathname = `/t/${hostname}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
