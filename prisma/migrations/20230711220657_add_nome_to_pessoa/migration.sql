/*
  Warnings:

  - Added the required column `Nome` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "Nome" TEXT NOT NULL;
