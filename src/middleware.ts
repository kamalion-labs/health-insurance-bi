import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";

const key = "2e895b2f-127b-4057-bf4d-1a846968cf63";

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

  const response = NextResponse.next();

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/1", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/api/auth/login")
  ) {
    return response;
  }

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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
