import { OperadoraRepositorio } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { idOperadora: number } }
) {
  const operadora = await OperadoraRepositorio.buscarPorId(params.idOperadora);

  return NextResponse.json({ success: true, data: operadora });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { idOperadora: number } }
) {
  await OperadoraRepositorio.deletar(params.idOperadora);

  return NextResponse.json({ success: true });
}
