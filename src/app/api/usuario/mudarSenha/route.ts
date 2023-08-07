import { prisma } from "@/lib/db/prisma";
import { hash } from "bcryptjs";
import { differenceInMinutes } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();

    const hashedPassword = await hash(data.senha, 12);

    const token = await prisma.resetToken.findUniqueOrThrow({
      where: {
        token: data.token,
      },
    });

    if (differenceInMinutes(token.dataExpiracao, new Date()) < 0) {
      throw new Error("Link expirado. Por favor, envie uma nova solicitação.");
    }

    const user = await prisma.usuario.update({
      where: {
        id: token.idUsuario,
      },
      data: {
        senha: hashedPassword,
        ativo: true,
      },
    });

    await prisma.resetToken.delete({
      where: {
        idUsuario: user.id,
        token: data.token,
      },
    });

    return NextResponse.json(
      {
        success: true,
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
