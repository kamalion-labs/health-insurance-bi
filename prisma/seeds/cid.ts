import { prisma } from "@/lib/db/prisma";

export async function insertCids() {
  await prisma.cid.createMany({
    data: [
      {
        id: 1,
        codigo: "J80",
        descricao: "Síndrome do desconforto respirat�rio do adulto",
      },
      {
        id: 2,
        codigo: "B34",
        descricao: "DoenÇas por vÍrus",
      },
      {
        id: 3,
        codigo: "U04",
        descricao: "Síndrome Resp. Ag. Grave",
      },
      {
        id: 4,
        codigo: "A00",
        descricao: "Cólera",
      },
      {
        id: 5,
        codigo: "A01",
        descricao: "Febre tifóide",
      },
      {
        id: 6,
        codigo: "A02",
        descricao: "Infecções por Salmonella",
      },
    ],
  });
}
