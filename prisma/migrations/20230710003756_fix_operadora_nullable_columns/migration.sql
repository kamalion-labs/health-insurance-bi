/*
  Warnings:

  - You are about to drop the column `codigo` on the `Operadora` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "TipoColuna" ADD VALUE 'mesAno';

-- AlterTable
ALTER TABLE "ColunaArquivo" ALTER COLUMN "referenciaTabela" DROP NOT NULL,
ALTER COLUMN "referenciaColuna" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Operadora" DROP COLUMN "codigo";
