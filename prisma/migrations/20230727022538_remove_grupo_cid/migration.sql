/*
  Warnings:

  - You are about to drop the column `codigoGrupo` on the `Cid` table. All the data in the column will be lost.
  - You are about to drop the `GrupoCid` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cid" DROP CONSTRAINT "Cid_codigoGrupo_fkey";

-- AlterTable
ALTER TABLE "ArquivoOperadora" ADD COLUMN     "pularPrimeiraLinha" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Cid" DROP COLUMN "codigoGrupo";

-- DropTable
DROP TABLE "GrupoCid";
