import { Competencia, Prisma, PrismaClient } from "@prisma/client";
import { parse } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const fileContent = await file.text();

  const lines = fileContent.split("\n");

  const prisma = new PrismaClient();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") {
      continue;
    }

    const cols = line.split("|");

    const data = parse(`01/${cols[0]}`, "dd/MM/yyyy", new Date());

    const competencia: Omit<Competencia, "id"> = {
      data,
      faturamento: new Prisma.Decimal(+cols[1]),
      coparticipacao: new Prisma.Decimal(+cols[2]),
      sinistro: new Prisma.Decimal(+cols[3]),
      sinistroGeral: new Prisma.Decimal(+cols[4]),
      sinistralidade: new Prisma.Decimal(+cols[5]),
      defasagemSinistralidade: new Prisma.Decimal(+cols[6]),
    };

    const count = await prisma.competencia.count({
      where: {
        data,
      },
    });

    if (count > 0) {
      await prisma.competencia.deleteMany({
        where: {
          data,
        },
      });
    }

    await prisma.competencia.create({ data: competencia });
  }

  return NextResponse.json({ success: true });
}
