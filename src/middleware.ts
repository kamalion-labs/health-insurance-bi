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
    if (req.nextUrl.pathname.startsWith("/api/usuario")) {
      const data = await req.json();

      if (data.key === key) {
        return response;
      }
    }

    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (req as AuthenticatedRequest).user = { id: sub };
    } else {
      throw new Error();
    }
  } catch (error) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

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
