-- CreateTable
CREATE TABLE "Competencia" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "faturamento" DECIMAL(10,2) NOT NULL,
    "coparticipacao" DECIMAL(10,2) NOT NULL,
    "sinistro" DECIMAL(10,2) NOT NULL,
    "sinistroGeral" DECIMAL(10,2) NOT NULL,
    "sinistralidade" DECIMAL(10,2) NOT NULL,
    "defasagemSinistralidade" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Competencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sinistro" (
    "id" SERIAL NOT NULL,
    "competencia" TIMESTAMP(3) NOT NULL,
    "tipo" VARCHAR(100) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Sinistro_pkey" PRIMARY KEY ("id")
);
