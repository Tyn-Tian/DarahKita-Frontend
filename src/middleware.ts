import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("token")?.value;

  if (!authToken) {
    return request.nextUrl.pathname !== "/"
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }

  try {
    const { exp } = jwtDecode<{
      exp?: number;
    }>(authToken);

    if (exp) {
      const expirationDate = new Date(exp * 1000);
      const currentDate = new Date();

      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      if (currentDate >= endOfDay || currentDate >= expirationDate) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("token");
        return response;
      }

      if (
        request.nextUrl.pathname === "/" ||
        request.nextUrl.pathname === "/registrasi"
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
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
    "/dashboard"
  ]
}