"use client";

import { Table } from "@/components";
import { ArquivoOperadora, ColunaArquivo, Operadora } from "@prisma/client";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { OperadorasWithArquivos } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { ArquivosForm } from "./ArquivosForm";
import { ColunasForm } from "./ColunasForm";
import { Box, Form, Input } from "@kamalion/ui";

const columns = [
  {
    key: "nome",
    label: "Nome",
  },
];

const arquivoColumns = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "tipo",
    label: "Tipo",
  },
  {
    key: "separador",
    label: "Separador",
  },
  {
    key: "tabela",
    label: "Tabela",
  },
];

const colunasTableColumns = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "coluna",
    label: "Coluna",
  },
  {
    key: "tipo",
    label: "Tipo",
  },
  {
    key: "tipo",
    label: "Tipo",
  },
  {
    key: "posicao",
    label: "Posição",
  },
  {
    key: "inicio",
    label: "Início",
  },
  {
    key: "fim",
    label: "Fim",
  },
  {
    key: "referenciaTabela",
    label: "Tabela Referência",
  },
  {
    key: "referenciaColuna",
    label: "Coluna Referência",
  },
];

const formSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

export function OperadoraForm({ data }: { data: OperadorasWithArquivos }) {
  const formArquivosRef = useRef<HTMLButtonElement>(null);

  const [IdOperadora, setIdOperadora] = useState<number | undefined>();
  const [IdArquivo, setIdArquivo] = useState<number | undefined>();
  const [IdColuna, setIdColuna] = useState<number | undefined>();

  const operadora = data.find((x) => x.id === IdOperadora);
  const arquivo = operadora?.arquivos.find((x) => x.id === IdArquivo);
  const coluna = arquivo?.colunas.find((x) => x.id === IdColuna);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: {
      nome: operadora?.nome ?? "",
    },
  });

  async function handleSelectOperadora(item: Operadora) {
    setIdOperadora(item.id);
  }

  async function handleSelectArquivo(item: ArquivoOperadora) {
    setIdArquivo(item.id);
  }

  async function handleEditArquivo(item: ArquivoOperadora) {
    setIdArquivo(item.id);
    formArquivosRef.current?.click();
  }

  async function handleSelectColuna(item: ColunaArquivo) {
    setIdColuna(item.id);
  }

  return (
    <div className="space-y-5">
      <Box.Root className="space-y-5">
        <Box.Header>Operadoras</Box.Header>

        <Box.Content>
          <Table.Root
            columns={columns}
            data={data}
            onSelect={handleSelectOperadora}
            selected={operadora}
          />
        </Box.Content>
      </Box.Root>

      {operadora && (
        <>
          <Box.Root>
            <Box.Header>Dados da Operadora</Box.Header>

            <Box.Content>
              <FormProvider {...form}>
                <Form.Root>
                  <Input.Root>
                    <Input.Label htmlFor="nome">Nome:</Input.Label>
                    <Input.Text {...form.register("nome")} />
                  </Input.Root>
                </Form.Root>
              </FormProvider>
            </Box.Content>
          </Box.Root>

          {operadora && (
            <>
              <Box.Root>
                <Box.Header>Arquivos</Box.Header>

                <Box.Content>
                  <ArquivosForm
                    ref={formArquivosRef}
                    operadora={operadora}
                    arquivo={arquivo}
                    setIdArquivo={setIdArquivo}
                  />

                  <Table.Root
                    columns={arquivoColumns}
                    data={operadora.arquivos}
                    onSelect={handleSelectArquivo}
                    onEdit={handleEditArquivo}
                    selected={arquivo}
                  />
                </Box.Content>
              </Box.Root>

              {arquivo && (
                <Box.Root>
                  <Box.Header>Colunas</Box.Header>

                  <Box.Content>
                    <ColunasForm
                      operadora={operadora}
                      arquivo={arquivo}
                      coluna={coluna}
                    />

                    <Table.Root
                      columns={colunasTableColumns}
                      data={arquivo?.colunas}
                      onSelect={handleSelectColuna}
                      selected={coluna}
                    />
                  </Box.Content>
                </Box.Root>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
