import { Money } from "@/components";
import { Competencia } from "@prisma/client";
import { format } from "date-fns";

export function TabelaFaturamentoSinistro({ data }: { data: Competencia[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th className="text-start">Competência</th>
          <th className="text-end">Faturamento</th>
          <th className="text-end">Coparticipação</th>
          <th className="text-end">Sinistro</th>
          <th className="text-end">Sinistro Geral</th>
          <th className="text-end">Sinistralidade</th>
          <th className="text-end">Defasagem de sinistralidade</th>
        </tr>
      </thead>
      <tbody>
        {data.map((comp) => (
          <tr key={comp.id}>
            <td>{format(new Date(comp.data), "MM/yyyy")}</td>
            <td className="text-end">
              <Money value={comp.faturamento} />
            </td>
            <td className="text-end">
              <Money value={comp.coparticipacao} />
            </td>
            <td className="text-end">
              <Money value={comp.sinistro} />
            </td>
            <td className="text-end">
              <Money value={comp.sinistroGeral} />
            </td>
            <td className="text-end">
              <Money value={comp.sinistralidade} percent />
            </td>
            <td className="text-end">
              <Money value={comp.defasagemSinistralidade} percent />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
