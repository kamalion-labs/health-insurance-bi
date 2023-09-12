"use client";

import { Card, Money } from "@/components";
import { useFiltro } from "@/stores";
import { EventoWithChilds } from "./page";

export function Header({ eventos }: { eventos: EventoWithChilds[] }) {
  const { idCategoria, dataInicio, dataFim } = useFiltro();

  if (idCategoria) {
    eventos = eventos.filter((x) => x.procedimento.idCategoria === idCategoria);
  }

  if (dataInicio) {
    eventos = eventos.filter((x) => x.dataRealizacao >= dataInicio);
  }

  if (dataFim) {
    eventos = eventos.filter((x) => x.dataRealizacao <= dataFim);
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <Card.Root className="bg-emerald-400 text-white">
        <Card.Title>Faturamento acumulado</Card.Title>
        <Card.Value className="flex flex-col">
          <Money
            value={eventos.reduce(
              (sum, current) => sum + +current.custoTotal,
              0
            )}
          />

          <div className="space-x-3 text-lg font-light">
            <span>Média:</span>

            <Money
              value={
                eventos.reduce((sum, current) => sum + +current.custoTotal, 0) /
                eventos.length
              }
            />
          </div>
        </Card.Value>
      </Card.Root>

      <Card.Root className="bg-red-400 text-white">
        <Card.Title>Sinistro Acumulado</Card.Title>
        <Card.Value>
          <Money
            value={eventos.reduce((sum, current) => sum + +current.sinistro, 0)}
          />

          <div className="space-x-3 text-lg font-light">
            <span>Média:</span>

            <Money
              value={
                eventos.reduce((sum, current) => sum + +current.sinistro, 0) /
                eventos.length
              }
            />
          </div>
        </Card.Value>
      </Card.Root>

      <Card.Root className="bg-indigo-400 text-white">
        <Card.Title>Coparticipação Acumulada</Card.Title>
        <Card.Value>
          <Money
            value={eventos.reduce(
              (sum, current) => sum + +current.coparticipacao,
              0
            )}
          />

          <div className="space-x-3 text-lg font-light">
            <span>Média:</span>

            <Money
              value={
                eventos.reduce(
                  (sum, current) => sum + +current.coparticipacao,
                  0
                ) / eventos.length
              }
            />
          </div>
        </Card.Value>
      </Card.Root>
    </div>
  );
}
