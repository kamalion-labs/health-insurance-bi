import { prisma } from "@/lib/db/prisma";
import { Empresa } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const data: Empresa = await req.json();

    await prisma.empresa.update({
      where: {
        id: +id,
      },
      data,
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      {
        status: 500,
        statusText: error.message,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await prisma.empresa.delete({
      where: {
        id: +id,
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      {
        status: 500,
        statusText: error.message,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
