import { prisma } from "@/lib/db/prisma";

export async function insertOperadora() {
  await prisma.operadora.createMany({
    data: [
      {
        id: 1,
        nome: "Amil",
      },
      {
        id: 2,
        nome: "Unimed",
      },
    ],
  });

  await prisma.arquivoOperadora.create({
    data: {
      id: 1,
      nome: "Pessoa",
      separador: "|",
      tabela: "Pessoa",
      idOperadora: 1,
    },
  });

  await prisma.colunaArquivo.createMany({
    data: [
      {
        nome: "nome",
        coluna: "Nome",
        tipo: "string",
        posicao: 0,
        idArquivoOperadora: 1,
      },
      {
        nome: "CPF",
        coluna: "CPF",
        tipo: "string",
        posicao: 1,
        idArquivoOperadora: 1,
      },
      {
        nome: "Sexo",
        coluna: "sexo",
        tipo: "string",
        posicao: 2,
        idArquivoOperadora: 1,
      },
      {
        nome: "Data Nascimento",
        coluna: "dataNascimento",
        tipo: "date",
        posicao: 3,
        idArquivoOperadora: 1,
      },
      {
        nome: "Data Admissao",
        coluna: "dataAdmissao",
        tipo: "date",
        posicao: 4,
        idArquivoOperadora: 1,
      },
      {
        nome: "Data Admissao no Plano",
        coluna: "dataAdmissaoPlano",
        tipo: "date",
        posicao: 5,
        idArquivoOperadora: 1,
      },
    ],
  });
}
