import { Prisma, PrismaClient, Sinistro } from "@prisma/client";
import { parse } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ sucess: false });
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

    const competencia = parse(`01/${cols[0]}`, "dd/MM/yyyy", new Date());

    const sinistro: Omit<Sinistro, "id"> = {
      competencia,
      tipo: cols[1],
      valor: new Prisma.Decimal(+cols[2]),
    };

    const count = await prisma.sinistro.count({
      where: {
        competencia,
      },
    });

    if (count > 0) {
      await prisma.sinistro.deleteMany({
        where: {
          competencia,
        },
      });
    }

    await prisma.sinistro.create({ data: sinistro });
  }

  return NextResponse.json({ sucess: true });
}
