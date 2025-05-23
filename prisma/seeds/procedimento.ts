import { PrismaClient } from "@prisma/client";
import { hrtime } from "process";

export async function insertProcedimentos(prisma: PrismaClient) {
  const start = hrtime.bigint();

  await prisma.procedimento.createMany({
    data: [
      {
        id: 1,
        nome: "Pesquisa por método molecular",
        tuss: "40314618",
        idCategoria: 1,
        idEspecialidade: 1,
      },
      {
        id: 2,
        nome: "Acompanhamento clínico de transplante renal no período de internação do receptor e do doador (pós-operatório até 15 dias)",
        tuss: "20201010",
        idCategoria: 1,
        idEspecialidade: 1,
      },
      {
        id: 3,
        nome: "Dímero D - pesquisa e/ou dosagem",
        tuss: "40304906",
        idCategoria: 2,
        idEspecialidade: 2,
      },
      {
        id: 4,
        nome: "Gasometria (pH, pCO2, SA, O2, excesso base)",
        tuss: "40302016",
        idCategoria: 2,
        idEspecialidade: 2,
      },
      {
        id: 5,
        nome: "PCR em tempo real para vírus respiratório sincicial",
        tuss: "40404161",
        idCategoria: 3,
        idEspecialidade: 3,
      },
      {
        id: 6,
        nome: "Leucócitos, contagem",
        tuss: "40304418",
        idCategoria: 3,
        idEspecialidade: 3,
      },
      {
        id: 7,
        nome: "Reticulócitos, contagem",
        tuss: "40304558",
        idCategoria: 4,
        idEspecialidade: 4,
      },
      {
        id: 8,
        nome: "Estreptozima - pesquisa e/ou dosagem",
        tuss: "40304868",
        idCategoria: 4,
        idEspecialidade: 4,
      },
      {
        id: 9,
        nome: "Enzima conversora da angiotensina (ECA) - pesquisa e/ou dosagem",
        tuss: "40305287",
        idCategoria: 5,
        idEspecialidade: 5,
      },
      {
        id: 10,
        nome: "Glucagon, dosagem",
        tuss: "40305368",
        idCategoria: 5,
        idEspecialidade: 5,
      },
      {
        id: 11,
        nome: "Adenovírus, IgM - pesquisa e/ou dosagem",
        tuss: "40306020",
        idCategoria: 6,
        idEspecialidade: 6,
      },
      {
        id: 12,
        nome: "Corticosterona",
        tuss: "40316688",
        idCategoria: 6,
        idEspecialidade: 6,
      },
      {
        id: 13,
        nome: "Hormônio estimulador do alfa melanócito",
        tuss: "40316904",
        idCategoria: 1,
        idEspecialidade: 7,
      },
      {
        id: 14,
        nome: "Pró-insulina",
        tuss: "40317064",
        idCategoria: 2,
        idEspecialidade: 7,
      },
      {
        id: 15,
        nome: "Tetrahidroaldosterona",
        tuss: "40317234",
        idCategoria: 3,
        idEspecialidade: 8,
      },
      {
        id: 16,
        nome: "Coenzima Q10",
        tuss: "40319067",
        idCategoria: 4,
        idEspecialidade: 8,
      },
      {
        id: 17,
        nome: "Procedimento diagnóstico em citopatologia cérvico-vaginal oncótica",
        tuss: "40601137",
        idCategoria: 2,
        idEspecialidade: 2,
      },
      {
        id: 18,
        nome: "Mamografia digital bilateral",
        tuss: "40808041",
        idCategoria: 2,
        idEspecialidade: 2,
      },
      {
        id: 19,
        nome: "Antígeno específico prostático total (psa) - pesquisa e/ou dosagem",
        tuss: "40316149",
        idCategoria: 2,
        idEspecialidade: 8,
      },
      {
        id: 20,
        nome: "Sangue oculto nas fezes, pesquisa imunológica",
        tuss: "40303250",
        idCategoria: 2,
        idEspecialidade: 8,
      },
      {
        id: 21,
        nome: "RX - Abdome simples",
        tuss: "40808017",
        idCategoria: 2,
        idEspecialidade: 2,
      },
      {
        id: 22,
        nome: "Planigrafia de osso",
        tuss: "40808165",
        idCategoria: 2,
        idEspecialidade: 8,
      },
      {
        id: 23,
        nome: "Densitometria óssea - corpo inteiro (avaliação de massa óssea ou de composição corporal)",
        tuss: "40808149",
        idCategoria: 2,
        idEspecialidade: 2,
      },
      {
        id: 24,
        nome: "Xeromamografia",
        tuss: "40808173",
        idCategoria: 2,
        idEspecialidade: 2,
      },
      {
        id: 25,
        nome: "Fraturas e/ou luxações e/ou avulsões – redução incruenta",
        tuss: "30717094",
        idCategoria: 2,
        idEspecialidade: 9,
      },
      {
        id: 26,
        nome: "Sessão de psicoterapia de casal",
        tuss: "20104197",
        idCategoria: 3,
        idEspecialidade: 10,
      },
      {
        id: 27,
        nome: "Consulta em psicologia",
        tuss: "50000462",
        idCategoria: 3,
        idEspecialidade: 10,
      },
      {
        id: 28,
        nome: "Acompanhamento e reabilitação profissional por psicólogo",
        tuss: "50000519",
        idCategoria: 3,
        idEspecialidade: 10,
      },
    ],
  });

  const end = hrtime.bigint();
  console.info(
    `Procedimentos importados em: ${(end - start) / BigInt(10 ** 6)}ms`
  );
}
