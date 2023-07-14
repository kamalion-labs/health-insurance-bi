import { ArquivosRepositorio } from "@/lib/operadora/repositorio/ArquivosRepositorio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { idArquivo: number } }
) {
  const arquivo = await ArquivosRepositorio.buscarPorId(params.idArquivo);

  return NextResponse.json({ success: true, data: arquivo });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { idArquivo: number } }
) {
  await ArquivosRepositorio.deletar(params.idArquivo);

  return NextResponse.json({ success: true });
}
