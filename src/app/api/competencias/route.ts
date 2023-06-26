import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const competencias = await prisma.competencia.findMany();

  return NextResponse.json({ success: true, data: competencias });
}
