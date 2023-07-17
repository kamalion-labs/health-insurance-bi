-- DropForeignKey
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_idCargo_fkey";

-- AlterTable
ALTER TABLE "Pessoa" ALTER COLUMN "idCargo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_idCargo_fkey" FOREIGN KEY ("idCargo") REFERENCES "Cargo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
