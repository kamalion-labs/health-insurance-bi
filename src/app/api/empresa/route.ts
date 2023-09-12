import { prisma } from "@/lib/db/prisma";
import { Empresa } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = Number(req.headers.get("X-USER-ID"));

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "You are not logged in, please provide token to gain access",
      },
      {
        status: 401,
        statusText: "Unauthorized",
      }
    );
  }

  const empresa = await prisma.empresa.findUnique({ where: { id } });

  return NextResponse.json({
    status: "success",
    data: { empresa },
  });
}

export async function POST(req: NextRequest) {
  try {
    const data: Empresa = await req.json();

    const empresa = await prisma.empresa.create({
      data,
    });

    return NextResponse.json(
      {
        success: true,
        data: empresa,
      },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
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
