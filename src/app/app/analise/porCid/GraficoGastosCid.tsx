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

export function GraficoGastosCid({ data }: { data: EventoWithCids[] }) {
  const chartData: DataType[] = [];

  const somaPorTipoCid: { [tipoCid: string]: number } = [];

  for (const evento of data) {
    const tipoCid = evento.CID.codigo;

    if (somaPorTipoCid.hasOwnProperty(tipoCid)) {
      somaPorTipoCid[tipoCid] += evento.custoTotal;
    } else {
      somaPorTipoCid[tipoCid] = evento.custoTotal;
    }
  }

  // console.log(somaPorTipoCid);

  return <></>;
}
