/*
  Warnings:

  - You are about to alter the column `custoTotal` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `sinistro` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `coparticipacao` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Evento" ALTER COLUMN "custoTotal" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "sinistro" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "coparticipacao" SET DATA TYPE DOUBLE PRECISION;
