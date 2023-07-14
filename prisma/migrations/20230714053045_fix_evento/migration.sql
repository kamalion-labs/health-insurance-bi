/*
  Warnings:

  - The `dataPagamento` column on the `Evento` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `custoTotal` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `sinistro` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the `Competencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sinistro` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Cargo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CNPJ]` on the table `Coparticipacao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CNPJ]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CPF]` on the table `Pessoa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coparticipacao` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCid` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEspecialidade` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idExame` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPessoa` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idTipoProcedimento` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SituacaoSenha" AS ENUM ('LIBERADA', 'NEGADA');

-- CreateEnum
CREATE TYPE "RegimeInternacao" AS ENUM ('HOSPITALAR', 'HOSPITAL_DIA');

-- AlterTable
ALTER TABLE "Coparticipacao" ALTER COLUMN "CNPJ" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "fimContrato" DROP NOT NULL,
ALTER COLUMN "indiceReajuste" DROP NOT NULL,
ALTER COLUMN "inicioContrato" DROP NOT NULL,
ALTER COLUMN "limitadorTecnico" DROP NOT NULL,
ALTER COLUMN "numeroContrato" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "coparticipacao" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "idCid" INTEGER NOT NULL,
ADD COLUMN     "idEspecialidade" INTEGER NOT NULL,
ADD COLUMN     "idExame" INTEGER NOT NULL,
ADD COLUMN     "idPessoa" INTEGER NOT NULL,
ADD COLUMN     "idTipoProcedimento" INTEGER NOT NULL,
ALTER COLUMN "descricao" SET DATA TYPE TEXT,
DROP COLUMN "dataPagamento",
ADD COLUMN     "dataPagamento" TIMESTAMP(3),
ALTER COLUMN "custoTotal" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "sinistro" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "teveInternacao" DROP NOT NULL,
ALTER COLUMN "prontoSocorro" DROP NOT NULL,
ALTER COLUMN "UTI" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pessoa" ALTER COLUMN "dataAdmissao" DROP NOT NULL,
ALTER COLUMN "dataAdmissaoPlano" DROP NOT NULL,
ALTER COLUMN "dataNascimento" DROP NOT NULL,
ALTER COLUMN "funcionario" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- DropTable
DROP TABLE "Competencia";

-- DropTable
DROP TABLE "Sinistro";

-- CreateTable
CREATE TABLE "Cid" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "descricaoAbreviada" TEXT,

    CONSTRAINT "Cid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especialidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Especialidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exame" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idEspecialidade" INTEGER NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "Exame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoProcedimento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "TipoProcedimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "SubCategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liberacao" (
    "id" SERIAL NOT NULL,
    "certificado" INTEGER NOT NULL,
    "dependencia" INTEGER,
    "contrato" INTEGER,
    "subfatura" INTEGER,
    "senha" TEXT,
    "diasSolicitacaoSenha" INTEGER,
    "diasLiberacaoSenha" INTEGER,
    "situacaoSenha" "SituacaoSenha",
    "possuiLiminar" BOOLEAN,
    "regimeInternacao" "RegimeInternacao",
    "dataSolicitacao" TIMESTAMP(3),
    "dataInternacao" TIMESTAMP(3),
    "idPlano" INTEGER NOT NULL,
    "idPrestador" INTEGER NOT NULL,

    CONSTRAINT "Liberacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cid_codigo_key" ON "Cid"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_nome_key" ON "Cargo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Coparticipacao_CNPJ_key" ON "Coparticipacao"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_CNPJ_key" ON "Empresa"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_CPF_key" ON "Pessoa"("CPF");

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_idCid_fkey" FOREIGN KEY ("idCid") REFERENCES "Cid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_idEspecialidade_fkey" FOREIGN KEY ("idEspecialidade") REFERENCES "Especialidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_idTipoProcedimento_fkey" FOREIGN KEY ("idTipoProcedimento") REFERENCES "TipoProcedimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_idExame_fkey" FOREIGN KEY ("idExame") REFERENCES "Exame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_idEspecialidade_fkey" FOREIGN KEY ("idEspecialidade") REFERENCES "Especialidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoProcedimento" ADD CONSTRAINT "TipoProcedimento_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategoria" ADD CONSTRAINT "SubCategoria_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liberacao" ADD CONSTRAINT "Liberacao_idPlano_fkey" FOREIGN KEY ("idPlano") REFERENCES "Plano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liberacao" ADD CONSTRAINT "Liberacao_idPrestador_fkey" FOREIGN KEY ("idPrestador") REFERENCES "Prestador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
