/*
  Warnings:

  - You are about to drop the column `DataAdmissao` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `DataAdmissaoPlano` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `DataNascimento` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `Sexo` on the `Pessoa` table. All the data in the column will be lost.
  - Added the required column `CNPJ` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fimContrato` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indiceReajuste` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicioContrato` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limitadorTecnico` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroContrato` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataAdmissao` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataAdmissaoPlano` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funcionario` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCargo` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEmpresa` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPlano` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idTipoTitularidade` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Situacao" AS ENUM ('PENDENTE', 'LIBERADA', 'NEGADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "Risco" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- CreateEnum
CREATE TYPE "TipoInternacao" AS ENUM ('CLINICA', 'CIRURGICA', 'OBSTETRICA', 'PSIQUIATRICA', 'PEDIATRICA');

-- CreateEnum
CREATE TYPE "TipoParto" AS ENUM ('CESAREO', 'VAGINAL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'INATIVO', 'EXCLUIDO');

-- CreateEnum
CREATE TYPE "Titularidade" AS ENUM ('TITULAR', 'DEPENDENTE');

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "CNPJ" TEXT NOT NULL,
ADD COLUMN     "fimContrato" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "indiceReajuste" INTEGER NOT NULL,
ADD COLUMN     "inicioContrato" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "limitadorTecnico" INTEGER NOT NULL,
ADD COLUMN     "numeroContrato" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "DataAdmissao",
DROP COLUMN "DataAdmissaoPlano",
DROP COLUMN "DataNascimento",
DROP COLUMN "Nome",
DROP COLUMN "Sexo",
ADD COLUMN     "dataAdmissao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataAdmissaoPlano" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "funcionario" BOOLEAN NOT NULL,
ADD COLUMN     "idCargo" INTEGER NOT NULL,
ADD COLUMN     "idEmpresa" INTEGER NOT NULL,
ADD COLUMN     "idPlano" INTEGER NOT NULL,
ADD COLUMN     "idTipoTitularidade" INTEGER NOT NULL,
ADD COLUMN     "idTitular" INTEGER,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "scoreDiabetes" DOUBLE PRECISION,
ADD COLUMN     "scoreHipertensao" DOUBLE PRECISION,
ADD COLUMN     "sexo" "Sexo",
ADD COLUMN     "status" "Status" NOT NULL;

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "descricao" INTEGER NOT NULL,
    "dataRealizacao" TIMESTAMP(3) NOT NULL,
    "dataPagamento" DOUBLE PRECISION NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "custoTotal" DOUBLE PRECISION NOT NULL,
    "sinistro" DOUBLE PRECISION NOT NULL,
    "teveInternacao" BOOLEAN NOT NULL,
    "prontoSocorro" BOOLEAN NOT NULL,
    "UTI" BOOLEAN NOT NULL,
    "situacao" "Situacao",
    "risco" "Risco",
    "tipoInternacao" "TipoInternacao",
    "tipoParto" "TipoParto",
    "idPrestador" INTEGER NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "UF" TEXT,
    "hospital" BOOLEAN NOT NULL,

    CONSTRAINT "Prestador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coparticipacao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "idEmpresa" INTEGER NOT NULL,

    CONSTRAINT "Coparticipacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmpresaOperadora" (
    "idEmpresa" INTEGER NOT NULL,
    "idOperadora" INTEGER NOT NULL,

    CONSTRAINT "EmpresaOperadora_pkey" PRIMARY KEY ("idEmpresa","idOperadora")
);

-- CreateTable
CREATE TABLE "Plano" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idOperadora" INTEGER NOT NULL,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idSetor" INTEGER NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoTitularidade" (
    "id" SERIAL NOT NULL,
    "nome" "Titularidade" NOT NULL,
    "grauParentesco" TEXT,

    CONSTRAINT "TipoTitularidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atestado" (
    "id" SERIAL NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "duracao" INTEGER NOT NULL,
    "idPessoa" INTEGER NOT NULL,

    CONSTRAINT "Atestado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_idPrestador_fkey" FOREIGN KEY ("idPrestador") REFERENCES "Prestador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coparticipacao" ADD CONSTRAINT "Coparticipacao_idEmpresa_fkey" FOREIGN KEY ("idEmpresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresaOperadora" ADD CONSTRAINT "EmpresaOperadora_idEmpresa_fkey" FOREIGN KEY ("idEmpresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresaOperadora" ADD CONSTRAINT "EmpresaOperadora_idOperadora_fkey" FOREIGN KEY ("idOperadora") REFERENCES "Operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plano" ADD CONSTRAINT "Plano_idOperadora_fkey" FOREIGN KEY ("idOperadora") REFERENCES "Operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_idCargo_fkey" FOREIGN KEY ("idCargo") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_idTipoTitularidade_fkey" FOREIGN KEY ("idTipoTitularidade") REFERENCES "TipoTitularidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_idEmpresa_fkey" FOREIGN KEY ("idEmpresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_idPlano_fkey" FOREIGN KEY ("idPlano") REFERENCES "Plano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_idTitular_fkey" FOREIGN KEY ("idTitular") REFERENCES "Pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_idSetor_fkey" FOREIGN KEY ("idSetor") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atestado" ADD CONSTRAINT "Atestado_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
