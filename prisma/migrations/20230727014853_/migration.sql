/*
  Warnings:

  - The primary key for the `Cid` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Cid` table. All the data in the column will be lost.
  - You are about to drop the column `idCid` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `idTipoProcedimento` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the `TipoProcedimento` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `codigoGrupo` to the `Cid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoCID` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_idCid_fkey";

-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_idTipoProcedimento_fkey";

-- DropForeignKey
ALTER TABLE "TipoProcedimento" DROP CONSTRAINT "TipoProcedimento_idCategoria_fkey";

-- AlterTable
ALTER TABLE "Cid" DROP CONSTRAINT "Cid_pkey",
DROP COLUMN "id",
ADD COLUMN     "codigoGrupo" TEXT NOT NULL,
ADD CONSTRAINT "Cid_pkey" PRIMARY KEY ("codigo");

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "idCid",
DROP COLUMN "idTipoProcedimento",
ADD COLUMN     "codigoCID" TEXT NOT NULL,
ADD COLUMN     "reembolso" BOOLEAN;

-- DropTable
DROP TABLE "TipoProcedimento";

-- CreateTable
CREATE TABLE "GrupoCid" (
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "GrupoCid_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "GrupoCid_codigo_key" ON "GrupoCid"("codigo");

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_codigoCID_fkey" FOREIGN KEY ("codigoCID") REFERENCES "Cid"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cid" ADD CONSTRAINT "Cid_codigoGrupo_fkey" FOREIGN KEY ("codigoGrupo") REFERENCES "GrupoCid"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
