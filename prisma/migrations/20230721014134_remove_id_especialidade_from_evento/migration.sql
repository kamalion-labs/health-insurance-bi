/*
  Warnings:

  - You are about to drop the column `idEspecialidade` on the `Evento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_idEspecialidade_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "idEspecialidade";
