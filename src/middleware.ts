import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("token")?.value;

  if (!authToken) {
    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/registrasi"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const { exp, role } = jwtDecode<{
      exp?: number;
      role: string;
    }>(authToken);

    if (exp) {
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp >= exp) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("token");
        return response;
      }
    }

    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/registrasi"
    ) {
      return NextResponse.redirect(new URL("/overview", request.url));
    }

    const restrictedPaths: Record<string, ((path: string) => boolean)[]> = {
      donor: [
        (path: string) => path === "/donor",
        (path: string) => path.startsWith("/donor-schedule/create-schedule"),
        (path: string) => /^\/donor-schedule\/[^/]+\/participant$/.test(path),
      ],
    };

    const isRestricted = (restrictedPaths[role] || []).some((checkPath) =>
      checkPath(request.nextUrl.pathname)
    );

    if (isRestricted) {
      return NextResponse.redirect(new URL("/overview", request.url));
    }
  } catch {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("token");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");
  return response;
}

export const config = {
  matcher: [
    "/",
    "/registrasi",
    "/overview",
    "/profile",
    "/donor-schedule",
    "/donor-schedule/create-schedule",
    "/donor-schedule/:path*",
    "/history",
    "/history/:path",
    "/donor"
  ],
};
