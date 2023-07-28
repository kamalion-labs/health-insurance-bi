"use client";

import { Box, Money } from "@/components";
import { usePessoa } from "@/stores/pessoa.store";
import { PessoaWithEventosCategoriaPlanoTipoTitularidade } from "./page";
import { GraficoCategorias } from "./GraficoCategorias";
import { GraficoCID } from "./GraficoCID";
import { TabelaCustosFamiliares } from "./TabelaCustosFamiliares";
import { GraficoCustosFamiliares } from "./GraficoCustosFamiliares";
import { differenceInYears, format } from "date-fns";
import { GraficoGastos } from "./GraficoGastos";
import { ProcedimentoTabela, TabelaProcedimentos } from "./TabelaProcedimentos";

export function DetalhesPessoa({
  data,
}: {
  data: PessoaWithEventosCategoriaPlanoTipoTitularidade[];
}) {
  const { id } = usePessoa();

  const pessoa = data.find((x) => x.id === id);

  if (!pessoa) return null;

  const tabelaEventos = pessoa.eventos.map<ProcedimentoTabela>((evento) => {
    return {
      nome: evento.procedimento.nome,
      tuss: evento.procedimento.tuss,
      categoria: evento.procedimento.categoria.nome,
      sinistro: evento.sinistro,
    };
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-3 drop-shadow md:grid-cols-2">
        <Box.Root>
          <Box.Content className="space-y-5 p-5">
            <div className="mb-10 text-4xl font-extralight">{pessoa.nome}</div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <div className="text-sm">Sexo:</div>
                <div className="text-3xl font-extralight text-primary">
                  {pessoa.sexo === "M" ? "Masculino" : "Feminino"}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-sm">Idade:</div>
                <div className="text-3xl font-extralight text-primary">
                  {differenceInYears(new Date(), pessoa.dataNascimento!)} anos
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <div className="text-sm">Operadora:</div>
                <div className="text-3xl font-extralight text-primary">
                  {pessoa.plano.operadora.nome}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm">Plano:</div>
                <div className="text-3xl font-extralight text-primary">
                  {pessoa.plano.nome}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <div className="text-sm">Data Admissão:</div>
                <div className="text-3xl font-extralight text-primary">
                  {format(new Date(pessoa.dataAdmissao!), "dd/MM/yyyy")}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm">Data Inscrição no Plano:</div>
                <div className="text-3xl font-extralight text-primary">
                  {format(new Date(pessoa.dataAdmissaoPlano!), "dd/MM/yyyy")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <div className="text-sm">Sinistro Total</div>
                <div className="text-3xl font-extralight text-primary">
                  <Money
                    value={pessoa.eventos.reduce(
                      (sum, current) => sum + +current.sinistro,
                      0
                    )}
                  />
                </div>
              </div>

              <div>
                <div className="text-sm">Média</div>
                <div className="text-3xl font-extralight text-primary">
                  <Money
                    value={
                      pessoa.eventos.reduce(
                        (sum, current) => sum + +current.sinistro,
                        0
                      ) / pessoa.eventos.length
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-sm">Total de Eventos:</div>
              <div className="text-3xl font-extralight text-primary">
                {pessoa.eventos.length}
              </div>
            </div>
          </Box.Content>
        </Box.Root>

        <div className="space-y-3">
          <Box.Root>
            <Box.Title>Eventos por Categoria de Procedimento</Box.Title>
            <Box.Content className="h-[250px]">
              <GraficoCategorias data={pessoa} />
            </Box.Content>
          </Box.Root>

          <Box.Root>
            <Box.Title>Eventos por CID</Box.Title>
            <Box.Content className="h-[250px]">
              <GraficoCID data={pessoa} />
            </Box.Content>
          </Box.Root>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Box.Root>
          <Box.Title>Gastos Mês a Mês</Box.Title>
          <Box.Content className="h-[250px]">
            <GraficoGastos data={pessoa.eventos} />
          </Box.Content>
        </Box.Root>
      </div>

      {pessoa.dependentes.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Box.Root>
            <Box.Title>Custos Familiares (R$)</Box.Title>
            <Box.Content className="h-[250px]">
              <TabelaCustosFamiliares data={pessoa} />
            </Box.Content>
          </Box.Root>

          <Box.Root>
            <Box.Title>Custos Familiares (R$)</Box.Title>
            <Box.Content className="h-[250px]">
              <GraficoCustosFamiliares data={pessoa} />
            </Box.Content>
          </Box.Root>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        <Box.Root>
          <Box.Title>Lista de Procedimentos</Box.Title>
          <Box.Content>
            <TabelaProcedimentos data={tabelaEventos} />
          </Box.Content>
        </Box.Root>
      </div>
    </>
  );
}
