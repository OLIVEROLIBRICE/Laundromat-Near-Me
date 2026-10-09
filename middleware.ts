import { NextRequest, NextResponse } from "next/server";

const serviceDirectoryPaths = new Set([
  "/24-hour-laundromats-near-me",
  "/wash-and-fold-near-me",
  "/coin-laundry-near-me",
  "/self-service-laundromats-near-me",
  "/laundromats-with-large-washers-near-me",
  "/laundromats-that-take-cards-near-me",
  "/laundromats-with-mobile-payment-near-me",
]);

const cityServiceSlugs = new Set([
  "24-hour-laundromats",
  "wash-and-fold",
  "coin-laundry",
  "self-service-laundromats",
  "large-washers",
  "card-payment-laundromats",
  "mobile-payment-laundromats",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const lastPathSegment = pathname.split("/").filter(Boolean).at(-1);
  const isCityServiceWithoutSlash = Boolean(lastPathSegment && cityServiceSlugs.has(lastPathSegment) && !pathname.endsWith("/"));

  if (serviceDirectoryPaths.has(pathname) || isCityServiceWithoutSlash) {
    const location = new URL(`${pathname}/${request.nextUrl.search}`, request.url).toString();
    return new NextResponse(null, { status: 308, headers: { Location: location } });
  }

  const trailingSlashBase = pathname.slice(0, -1);
  const trailingSlashLastSegment = trailingSlashBase.split("/").filter(Boolean).at(-1);
  const isServiceDirectory = serviceDirectoryPaths.has(trailingSlashBase) || Boolean(trailingSlashLastSegment && cityServiceSlugs.has(trailingSlashLastSegment));
  if (pathname !== "/" && !isServiceDirectory && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) return NextResponse.next();

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return new NextResponse("Admin access is not configured.", { status: 503 });
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const [user, pass] = atob(auth.slice(6)).split(":");
    if (user === username && pass === password) return NextResponse.next();
  }
  return new NextResponse("Authentication required.", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Laundromat Directory Admin"' } });
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
