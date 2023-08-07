import { prisma } from "@/lib/db/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import resetarSenha from "@/lib/usuario/dominio/resetarSenha";

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const hashedPassword = await hash("376!cgv6#$3g4b7$ç34", 12);

    const user = await prisma.usuario.update({
      where: {
        id: +id,
      },
      data: {
        senha: hashedPassword,
        ativo: false,
      },
    });

    await resetarSenha(user, req);

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
