import { prisma } from "@/lib/db/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const hashedPassword = await hash(data.senha, 12);

    const user = await prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: { user: { ...user, senha: undefined } },
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
