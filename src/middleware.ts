import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

export async function middleware(req: NextRequest) {
  let token: string | undefined;

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/api/auth/login")
  ) {
    return;
  }

  const response = NextResponse.next();

  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (req as AuthenticatedRequest).user = { id: sub };
    } else {
      throw new Error();
    }
  } catch (error) {
    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({ redirect: req.nextUrl.pathname })}`,
        req.url
      )
    );
  }

  return response;
}

export const config = {
  matcher: ["/app/:path*", "/admin/:path*", "/api/:path*", "/login", "/logout"],
};
