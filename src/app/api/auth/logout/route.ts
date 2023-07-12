import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );

  await Promise.all([
    response.cookies.set({
      name: "token",
      value: "",
      maxAge: -1,
    }),
    response.cookies.set({
      name: "logged-in",
      value: "",
      maxAge: -1,
    }),
  ]);

  return response;
}
