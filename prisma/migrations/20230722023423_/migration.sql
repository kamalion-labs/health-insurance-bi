/*
  Warnings:

  - You are about to drop the column `codigo` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `idExame` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the `Exame` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idProcedimento` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_idExame_fkey";

-- DropForeignKey
ALTER TABLE "Exame" DROP CONSTRAINT "Exame_idCategoria_fkey";

-- DropForeignKey
ALTER TABLE "Exame" DROP CONSTRAINT "Exame_idEspecialidade_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "codigo",
DROP COLUMN "idExame",
ADD COLUMN     "idProcedimento" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Exame";

-- CreateTable
CREATE TABLE "Procedimento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tuss" TEXT NOT NULL,
    "idEspecialidade" INTEGER NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "Procedimento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_idProcedimento_fkey" FOREIGN KEY ("idProcedimento") REFERENCES "Procedimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procedimento" ADD CONSTRAINT "Procedimento_idEspecialidade_fkey" FOREIGN KEY ("idEspecialidade") REFERENCES "Especialidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procedimento" ADD CONSTRAINT "Procedimento_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
