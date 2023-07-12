import { prisma } from "@/lib/db/prisma";
import { signJWT } from "@/lib/token";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const user = await prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await compare(data.senha, user.senha))) {
      return NextResponse.json(
        { success: false, message: "E-mail ou senha inválidos" },
        {
          status: 401,
          statusText: "E-mail ou senha inválidos",
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const JWT_EXPIRES_IN = process.env.NEXT_PUBLIC_JWT_EXPIRES_IN!;

    const token = await signJWT(
      { sub: user.id.toString() },
      { exp: `${JWT_EXPIRES_IN}m` }
    );

    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    const response = NextResponse.json(
      {
        success: true,
        redirect: req.nextUrl.searchParams.get("redirect"),
        token,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      {
        status: 500,
        statusText: error.message,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
