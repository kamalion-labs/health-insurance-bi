"use client";

import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { Evento } from "@prisma/client";

type DataType = {
  Faixa: string;
  Quantidade: number;
  "Valor Acumulado": number;
  QuantidadeColor: string;
  "Valor AcumuladoColor": string;
};

function getData(faixa: string, items: Evento[]): DataType {
  return {
    Faixa: faixa,
    "Valor Acumulado": items.reduce(
      (sum, evento) => sum + evento.custoTotal,
      0
    ),
    Quantidade: items.length,

    QuantidadeColor: "#52CD9F",
    "Valor AcumuladoColor": "#5B93FF",
  };
}

export function GraficoEventosPorFaixaValor({ data }: { data: Evento[] }) {
  const chartData: DataType[] = [];

  const menorQue5mil = data.filter((x) => x.custoTotal < 5000);
  chartData.push(getData("Menor que R$ 5 mil", menorQue5mil));

  const menorQue10mil = data.filter(
    (x) => x.custoTotal >= 5000 && x.custoTotal < 10000
  );
  chartData.push(getData("Entre R$ 5 mil e R$ 10 mil", menorQue10mil));

  const menorQue20mil = data.filter(
    (x) => x.custoTotal >= 10000 && x.custoTotal < 20000
  );
  chartData.push(getData("Entre R$ 10 mil e R$ 20 mil", menorQue20mil));

  const menorQue30mil = data.filter(
    (x) => x.custoTotal >= 20000 && x.custoTotal < 30000
  );
  chartData.push(getData("Entre R$ 20 mil e R$ 30 mil", menorQue30mil));

  const menorQue50mil = data.filter(
    (x) => x.custoTotal >= 30000 && x.custoTotal < 50000
  );
  chartData.push(getData("Entre R$ 30 mil e R$ 50 mil", menorQue50mil));

  const maiorQue50mil = data.filter((x) => x.custoTotal > 50000);
  chartData.push(getData("Maior que R$ 50 mil", maiorQue50mil));

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    indexBy: "Faixa",
    groupMode: "grouped",
    data: chartData,
    margin: { top: 10, right: 150, bottom: 30, left: 120 },
    axisLeft: {
      tickValues: 4,
      format: (value: number) =>
        `R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`,
    },
    valueFormat: (value: any) =>
      `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,
  };

  const options2: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    ...options,
    axisLeft: {
      tickValues: 4,
      format: (value: number) => value,
    },
    valueFormat: (value: any) => value,
  };

  return (
    <>
      <div className="h-[300px]">
        <Chart.Bar {...options} keys={["Valor Acumulado"]} />
      </div>

      <div className="h-[300px]">
        <Chart.Bar {...options2} keys={["Quantidade"]} />
      </div>
    </>
  );
}
