-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- AlterTable
ALTER TABLE "ColunaArquivo" ADD COLUMN     "idArquivoOperadora" INTEGER;

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "CPF" TEXT NOT NULL,
    "Sexo" "Sexo",
    "DataNascimento" TIMESTAMP(3) NOT NULL,
    "DataAdmissao" TIMESTAMP(3) NOT NULL,
    "DataAdmissaoPlano" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ColunaArquivo" ADD CONSTRAINT "ColunaArquivo_idArquivoOperadora_fkey" FOREIGN KEY ("idArquivoOperadora") REFERENCES "ArquivoOperadora"("id") ON DELETE SET NULL ON UPDATE CASCADE;
