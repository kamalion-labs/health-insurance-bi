/*
  Warnings:

  - Made the column `idArquivoOperadora` on table `ColunaArquivo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ColunaArquivo" DROP CONSTRAINT "ColunaArquivo_idArquivoOperadora_fkey";

-- AlterTable
ALTER TABLE "ColunaArquivo" ALTER COLUMN "idArquivoOperadora" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ColunaArquivo" ADD CONSTRAINT "ColunaArquivo_idArquivoOperadora_fkey" FOREIGN KEY ("idArquivoOperadora") REFERENCES "ArquivoOperadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
