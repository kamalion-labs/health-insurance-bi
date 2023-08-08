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

export function GraficoExamesPorFaixaValor({ data }: { data: Evento[] }) {
  const chartData: DataType[] = [];

  const menorQue20 = data.filter((x) => x.custoTotal < 20);
  chartData.push(getData("Menor que R$ 20,00", menorQue20));

  const menorQue50 = data.filter(
    (x) => x.custoTotal >= 20 && x.custoTotal < 50
  );
  chartData.push(getData("Entre R$ 20,00 e R$ 50,00", menorQue50));

  const menorQue100 = data.filter(
    (x) => x.custoTotal >= 50 && x.custoTotal < 100
  );
  chartData.push(getData("Entre R$ 50,00 e R$ 100,00", menorQue100));

  const menorQue200 = data.filter(
    (x) => x.custoTotal >= 100 && x.custoTotal < 200
  );
  chartData.push(getData("Entre R$ 100,00 e R$ 200,00", menorQue200));

  const menorQue500 = data.filter(
    (x) => x.custoTotal >= 200 && x.custoTotal < 500
  );
  chartData.push(getData("Entre R$ 200,00 e R$ 500,00", menorQue500));

  const maiorQue500 = data.filter((x) => x.custoTotal > 500);
  chartData.push(getData("Maior que R$ 500,00", maiorQue500));

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    indexBy: "Faixa",
    groupMode: "grouped",
    data: chartData,
    margin: { top: 10, right: 150, bottom: 130, left: 120 },
    axisBottom: {
      tickRotation: -45,
    },
    label: "",
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
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="h-[350px]">
        <Chart.Bar {...options} keys={["Valor Acumulado"]} />
      </div>

      <div className="h-[350px]">
        <Chart.Bar {...options2} keys={["Quantidade"]} />
      </div>
    </div>
  );
}
