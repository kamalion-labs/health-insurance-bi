import { OperadoraRepositorio } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { Operadora } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const operadora: Operadora = await request.json();

  await OperadoraRepositorio.criarAtualizar(operadora);

  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const operadora: Operadora = await request.json();

  await OperadoraRepositorio.criarAtualizar(operadora);

  return NextResponse.json({ success: true });
}
