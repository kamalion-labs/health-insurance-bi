"use client";

import { Cids } from "@/lib/consts";
import { Prisma } from "@prisma/client";

type EventoWithCids = Prisma.EventoGetPayload<{
  include: { CID: true };
}>;

interface DataType {
  id: string;
  value: number;
}

export function GraficoGastosGrupoCid({ data }: { data: EventoWithCids[] }) {
  const chartData: DataType[] = [];

  const gruposCid: { [codigoCid: string]: string } = {
    ...Object.fromEntries(
      Object.entries(Cids).flatMap(([grupo, cidsDoGrupo]) =>
        cidsDoGrupo.map((codigoCid) => [codigoCid, grupo])
      )
    ),
  };

  for (const grupo in Cids) {
    Cids[grupo].forEach((codigoCid) => {
      gruposCid[codigoCid] = grupo;
    });
  }

  const somaPorGrupoCid: { [grupo: string]: number } = {};

  for (const evento of data) {
    const codigoCid = evento.CID.codigo;

    const grupoCid = gruposCid[codigoCid];

    if (somaPorGrupoCid.hasOwnProperty(grupoCid)) {
      somaPorGrupoCid[grupoCid] += evento.custoTotal;
    } else {
      somaPorGrupoCid[grupoCid] = evento.custoTotal;
    }
  }

  console.log(somaPorGrupoCid); // Funcionou perfeitamente, agr só falta colocar no gráfico

  return <></>;
}
