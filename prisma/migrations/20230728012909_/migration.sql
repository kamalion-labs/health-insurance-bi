-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_codigoCID_fkey";

-- AlterTable
ALTER TABLE "Evento" ALTER COLUMN "codigoCID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_codigoCID_fkey" FOREIGN KEY ("codigoCID") REFERENCES "Cid"("codigo") ON DELETE SET NULL ON UPDATE CASCADE;
