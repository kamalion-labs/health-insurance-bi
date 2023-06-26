"use client";

import { Money } from "@/components/Money";
import { usePage } from "@/hooks";
import { Competencia } from "@prisma/client";
import { useEffect, useState } from "react";
import { TabelaFaturamentoSinistro } from "./TabelaFaturamentoSinistro";
import { GraficoSinistralidadeTempo } from "./GraficoSinistralidadeTempo";
import { GraficoFaturamentoSinistro } from "./GraficoFaturamentoSinistro";

export default function GeralPage() {
  usePage({ id: "dashboardGeral", title: "Dashboard Geral" });
  const [Competencias, setCompetencias] = useState<Competencia[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/competencias", {
        next: { tags: ["competencias"], revalidate: 60 },
      });

      const data = await res.json();

      setCompetencias(data.data);
    })();
  }, []);

  if (Competencias.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-5 p-5">
      {/* Header */}
      <div className="grid grid-cols-3 gap-3 text-white">
        <div className="flex flex-col justify-center rounded bg-alt bg-cyan-400 px-4 py-3">
          <div className="text-3xl font-bold">
            <Money
              value={Competencias.reduce(
                (sum, current) => sum + +current.faturamento,
                0
              )}
            />
          </div>
          <div className="font-light">Faturamento acumulado</div>
        </div>

        <div className="flex flex-col justify-center rounded bg-alt bg-red-400 px-4 py-3">
          <div className="text-3xl font-bold">
            <Money
              value={Competencias.reduce(
                (sum, current) => sum + +current.sinistro,
                0
              )}
            />
          </div>
          <div className="font-light">Sinistro Acumulado</div>
        </div>

        <div className="flex flex-col justify-center rounded bg-alt bg-purple-400 px-4 py-3">
          <div className="text-3xl font-bold">
            <Money
              value={Competencias.reduce(
                (sum, current) => sum + +current.coparticipacao,
                0
              )}
            />
          </div>
          <div className="font-light">Coparticipação Acumulada</div>
        </div>
      </div>

      <div className="flex flex-col space-y-5 rounded bg-alt p-4">
        <div className="text-lg font-medium">Faturamento x Sinistro</div>

        <div className="flex h-[300px]">
          <GraficoFaturamentoSinistro data={Competencias} />
        </div>
      </div>

      <div className="flex flex-col space-y-5 rounded bg-alt p-4">
        <div className="text-lg font-medium">Sinistralidade por Tempo</div>

        <div className="flex h-[300px]">
          <GraficoSinistralidadeTempo data={Competencias} />
        </div>
      </div>

      {/* Tabela de faturamento e sinistro */}
      <div className="flex flex-col space-y-5 rounded bg-alt p-4">
        <div className="text-lg font-medium">
          Tabela de Faturamento e Sinistro
        </div>

        <TabelaFaturamentoSinistro data={Competencias} />
      </div>
    </div>
  );
}
