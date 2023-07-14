import { ColunaArquivoRepositorio } from "@/lib/operadora/repositorio/ColunaArquivoRepositorio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { idColuna: number } }
) {
  const coluna = await ColunaArquivoRepositorio.buscarPorId(params.idColuna);

  return NextResponse.json({ success: true, data: coluna });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { idColuna: number } }
) {
  await ColunaArquivoRepositorio.deletar(params.idColuna);

  return NextResponse.json({ success: true });
}
