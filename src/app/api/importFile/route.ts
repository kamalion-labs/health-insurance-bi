import { importar } from "@/lib/operadora/dominio/importacaoArquivos";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const idArquivo: number = Number(data.get("idArquivo"));
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const fileContent = await file.text();

    await importar(idArquivo, fileContent);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.log({ e });
    return NextResponse.json({ success: false, message: e }, { status: 500 });
  }
}
