-- CreateEnum
CREATE TYPE "TipoArquivoOperadora" AS ENUM ('txt', 'csv', 'xls', 'xlsx');

-- CreateEnum
CREATE TYPE "TipoColuna" AS ENUM ('string', 'number', 'date', 'referencia');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArquivoOperadora" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoArquivoOperadora" NOT NULL DEFAULT 'txt',
    "separador" TEXT NOT NULL,
    "tabela" TEXT NOT NULL,
    "idOperadora" INTEGER NOT NULL,

    CONSTRAINT "ArquivoOperadora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColunaArquivo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "coluna" TEXT NOT NULL,
    "tipo" "TipoColuna" NOT NULL,
    "inicio" INTEGER NOT NULL,
    "fim" INTEGER NOT NULL,
    "referenciaTabela" TEXT NOT NULL,
    "referenciaColuna" TEXT NOT NULL,

    CONSTRAINT "ColunaArquivo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArquivoOperadora" ADD CONSTRAINT "ArquivoOperadora_idOperadora_fkey" FOREIGN KEY ("idOperadora") REFERENCES "Operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
