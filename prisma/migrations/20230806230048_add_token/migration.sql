-- CreateTable
CREATE TABLE "ResetToken" (
    "token" TEXT NOT NULL,
    "dataExpiracao" DATE NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "ResetToken" ADD CONSTRAINT "ResetToken_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
