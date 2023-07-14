// import { NextRequest } from "next/server";
// import fs from "fs/promises";
// import { PathLike } from "fs";
// import { parse } from "date-fns";
// import { Prisma, PrismaClient } from "@prisma/client";

// // This is required to enable streaming
// export const dynamic = "force-dynamic";
// export const runtime = "nodejs";

// // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// let encoder: TextEncoder;
// let writer: any;

// function write(data: any) {
//   writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
// }

// export async function GET(request: NextRequest) {
//   const filePath = request.nextUrl.searchParams.get("path") as PathLike;

//   const responseStream = new TransformStream();
//   writer = responseStream.writable.getWriter();
//   encoder = new TextEncoder();

//   (async () => {
//     try {
//       write({ progress: 1, status: "Inicializando..." });
//       const fileHandle = await fs.open(filePath, "r");
//       const file = await fileHandle.readFile({
//         encoding: "utf-8",
//       });

//       const lines = file.split("\n");

//       const prisma = new PrismaClient();

//       for (let i = 0; i < lines.length; i++) {
//         const line = lines[i];
//         const cols = line.split("|");

//         write({
//           progress: (i / lines.length) * 100,
//           status: `Processando linha ${i + 1}...`,
//         });

//         const data = parse(`01/${cols[0]}`, "dd/MM/yyyy", new Date());

//         const competencia: Omit<Competencia, "id"> = {
//           data,
//           faturamento: new Prisma.Decimal(+cols[1]),
//           coparticipacao: new Prisma.Decimal(+cols[2]),
//           sinistro: new Prisma.Decimal(+cols[3]),
//           sinistroGeral: new Prisma.Decimal(+cols[4]),
//           sinistralidade: new Prisma.Decimal(+cols[5]),
//           defasagemSinistralidade: new Prisma.Decimal(+cols[6]),
//         };

//         const count = await prisma.competencia.count({
//           where: {
//             data,
//           },
//         });

//         if (count > 0) {
//           await prisma.competencia.deleteMany({
//             where: {
//               data,
//             },
//           });
//         }

//         await prisma.competencia.create({ data: competencia });
//       }

//       write({ progress: 100, status: "Finalizado" });
//       await writer.close();
//     } catch (error) {
//       console.error("a", error);
//       await writer.close();
//     }
//   })();

//   return new Response(responseStream.readable, {
//     headers: {
//       Connection: "keep-alive",
//       "Content-Encoding": "none",
//       "Cache-Control": "no-cache",
//       "Content-Type": "text/event-stream",
//     },
//   });
// }

export const a = {};
