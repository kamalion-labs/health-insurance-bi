// CIDs de COVID-19, segundo a Biblioteca Virtual em Saúde (https://bvsms.saude.gov.br/bvs/publicacoes/orientacoes_codigos_emergencia_morte_covid-19_1ed_rev.pdf) e ao antigo sistema da Interliga
export const cidsCovid = [
  "B94",
  "B34",
  "M30",
  "U07",
  "U09",
  "U10",
  "U92",
  "J12",
  "M35",
  "Z86",
  "Z20",
];

// CIDs de SRAG (Síndrome Respiratória Aguda Grave), segundo o antigo sistema da interliga
export const cidsSRAG = ["B34", "U04", "J80", "U07"];

// Algumas doenças infecciosas e parasitárias	(A00-B99)
export const cidsDoencasInfecciosas: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `A${i.toString().padStart(2, "0")}`),
  ...Array.from({ length: 100 }, (_, i) => `B${i.toString().padStart(2, "0")}`),
];

// Neoplasias [tumores]	(C00-D48)
export const cidsNeoplasias: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `C${i.toString().padStart(2, "0")}`),
  ...Array.from({ length: 49 }, (_, i) => `D${i.toString().padStart(2, "0")}`),
];

// Doenças do sangue e dos órgãos hematopoéticos e alguns transtornos imunitários	(CID D50-D89)
export const cidsDoencasSanguineas: string[] = [
  ...Array.from({ length: 40 }, (_, i) => `D${(i + 50).toString()}`),
];

// Doenças endócrinas, nutricionais e metabólicas (CID E00-E90)
export const cidsDoencasEndocrinas: string[] = [
  ...Array.from({ length: 91 }, (_, i) => `E${i.toString().padStart(2, "0")}`),
];

// Transtornos mentais e comportamentais (CID F00-F99)
export const cidsTranstornosMentais: string[] = [
  ...Array.from(
    { length: 100 },
    (_, i) => `F${i.toString().padStart(2, "0")}`
  ).slice(0, 100),
];

// 	Doenças do sistema nervoso	(G00-G99)
export const cidsSistemaNervoso: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `G${i.toString().padStart(2, "0")}`),
];

// Doenças do olho e anexos	(H00-H59)
export const cidsDoencasOlhos: string[] = [
  ...Array.from({ length: 60 }, (_, i) => `H${i.toString().padStart(2, "0")}`),
];

// Doenças do ouvido e da apófise mastóide	(H60-H95)
export const cidsDoencasOuvido: string[] = [
  ...Array.from({ length: 36 }, (_, i) => `H${(i + 60).toString()}`),
];

// Doenças do aparelho circulatório	(I00-I99)
export const cidsAparelhoCirculatorio: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `I${i.toString().padStart(2, "0")}`),
];

// Doenças do aparelho respiratório	(J00-J99)
export const cidsAparelhoRespiratorio: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `J${i.toString().padStart(2, "0")}`),
];

// Doenças do aparelho digestivo(K00-K93)
export const cidsAparelhoDigestivo: string[] = [
  ...Array.from({ length: 94 }, (_, i) => `K${i.toString().padStart(2, "0")}`),
];

// Doenças da pele e do tecido subcutâneo	(L00-L99)
export const cidsDoencaPele: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `L${i.toString().padStart(2, "0")}`),
];

// Doenças do sistema osteomuscular e do tecido conjuntivo (M00-M99)
export const cidsDoencasOesteomuscular: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `M${i.toString().padStart(2, "0")}`),
];

// Doenças do aparelho geniturinário (N00-N99)
export const cidsAparelhoGeniturinario: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `N${i.toString().padStart(2, "0")}`),
];

// Gravidez, parto e puerpério (O00-O99)
export const cidsGravidez: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `O${i.toString().padStart(2, "0")}`),
];

// Algumas afecções originadas no período perinatal	(P00-P96)
export const cidsPerinatal: string[] = [
  ...Array.from({ length: 97 }, (_, i) => `P${i.toString().padStart(2, "0")}`),
];

// 	Malformações congênitas, deformidades e anomalias cromossômicas	(Q00-Q99)
export const cidsMalformacoes: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `Q${i.toString().padStart(2, "0")}`),
];

// Sintomas, sinais e achados anormais de exames clínicos e de laboratório, não classificados em outra parte (R00-R99)
export const cidsAnormais: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `R${i.toString().padStart(2, "0")}`),
];

// Lesões, envenenamentos e algumas outras conseqüências de causas externas	(S00-T98)
export const cidsLesoesCausasExternas: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `S${i.toString().padStart(2, "0")}`),
  ...Array.from({ length: 99 }, (_, i) => `T${i.toString().padStart(2, "0")}`),
];

// Causas externas de morbidade e de mortalidade (V01-Y98)
export const cidsCausasExternasMorbidade: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `V${i.toString().padStart(2, "0")}`),
  ...Array.from({ length: 100 }, (_, i) => `W${i.toString().padStart(2, "0")}`),
  ...Array.from({ length: 100 }, (_, i) => `X${i.toString().padStart(2, "0")}`),
  ...Array.from({ length: 99 }, (_, i) => `Y${i.toString().padStart(2, "0")}`),
];

// Fatores que exercem influência sobre o estado de saúde e o contato com serviços de saúde	(Z00-Z99)
export const cidsServicoSaude: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `Z${i.toString().padStart(2, "0")}`),
];

// Códigos para propósitos especiais (U00-U99)
export const cidsEspeciais: string[] = [
  ...Array.from({ length: 100 }, (_, i) => `U${i.toString().padStart(2, "0")}`),
];
