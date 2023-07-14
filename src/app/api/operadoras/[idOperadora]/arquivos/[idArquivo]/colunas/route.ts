import { ColunaArquivoRepositorio } from "@/lib/operadora/repositorio/ColunaArquivoRepositorio";
import { ColunaArquivo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { idOperadora: number; idArquivo: number } }
) {
  const coluna: ColunaArquivo = await request.json();

  coluna.idArquivoOperadora = params.idArquivo;

  await ColunaArquivoRepositorio.criar(coluna);

  return NextResponse.json({ success: true });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { idOperadora: number; idArquivo: number } }
) {
  const coluna: ColunaArquivo = await request.json();

  coluna.idArquivoOperadora = params.idArquivo;

  await ColunaArquivoRepositorio.atualizar(coluna);

  return NextResponse.json({ success: true });
}
