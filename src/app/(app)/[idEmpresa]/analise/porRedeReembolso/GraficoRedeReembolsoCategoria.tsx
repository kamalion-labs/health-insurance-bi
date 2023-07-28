"use client";

import { Chart } from "@/components";
import { BarSvgProps } from "@nivo/bar";
import { EventosWithCategoria } from "./page";

type DataType = {
  Categoria: string;
  Rede: number;
  Reembolso: number;
  RedeColor: string;
  ReembolsoColor: string;
};

export function GraficoRedeReembolsoCategoria({
  data,
}: {
  data: EventosWithCategoria[];
}) {
  const categorias = [
    ...new Set(data.map((evento) => evento.procedimento.categoria.nome)),
  ];

  const chartData: DataType[] = categorias.map((categ) => {
    const eventosCategoria = data.filter(
      (x) => x.procedimento.categoria.nome === categ
    );

    const item: DataType = {
      Categoria: categ,
      Rede: eventosCategoria.reduce(
        (sum, current) => (!current.reembolso ? sum + current.sinistro : sum),
        0
      ),
      Reembolso: eventosCategoria.reduce(
        (sum, current) => (current.reembolso ? sum + current.sinistro : sum),
        0
      ),

      RedeColor: "#52CD9F",
      ReembolsoColor: "#5B93FF",
    };

    return item;
  });

  const options: Omit<BarSvgProps<DataType>, "width" | "height"> = {
    indexBy: "Categoria",
    groupMode: "grouped",
    keys: ["Rede", "Reembolso"],
    data: chartData,
    margin: { top: 10, right: 150, bottom: 170, left: 120 },
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

  return <Chart.Bar {...options} />;
}
