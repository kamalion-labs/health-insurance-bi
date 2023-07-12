import { prisma } from "@/lib/db/prisma";
import { ArquivosRepositorio } from "../repositorio/ArquivosRepositorio";
import { format, parse } from "date-fns";
import { Prisma } from "@prisma/client";

export async function importar(idArquivo: number, conteudo: string) {
  const lines = conteudo.split("\n");

  const arquivoOperadora = await ArquivosRepositorio.buscarPorId(idArquivo);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") {
      continue;
    }

    const cols = line.split(arquivoOperadora.separador);

    if (cols.length !== arquivoOperadora.colunas.length) {
      throw new Error("Layout inválido");
    }

    const items: { coluna: any; valor: any }[] = [];

    for (let i = 0; i < arquivoOperadora.colunas.length; i++) {
      const col = arquivoOperadora.colunas[i];

      let valor = cols[col.posicao!];

      if (col.tipo === "date") {
        valor = format(parse(valor, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");
      }

      items.push({ coluna: col.coluna, valor });
    }

    const finalSql = `
      INSERT INTO "${arquivoOperadora.tabela}" 
      (${items.map((item) => `"${item.coluna}"`).join(",")})
      VALUES (${items.map((item) => `'${item.valor}'`).join(",")})`
      .split("\n")
      .join(" ");

    await prisma.$executeRaw(Prisma.raw(finalSql));
  }
}
