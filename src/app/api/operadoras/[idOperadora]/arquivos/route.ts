import { ArquivosRepositorio } from "@/lib/operadora/repositorio/ArquivosRepositorio";
import { ArquivoOperadora } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { idOperadora: number } }
) {
  const data: ArquivoOperadora = await request.json();

  data.idOperadora = params.idOperadora;

  console.log({ data });

  await ArquivosRepositorio.criar(data);

  return NextResponse.json({ success: true });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { idOperadora: number } }
) {
  const data: ArquivoOperadora = await request.json();

  data.idOperadora = params.idOperadora;

  await ArquivosRepositorio.atualizar(data);

  return NextResponse.json({ success: true });
}
