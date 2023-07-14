"use client";

import { Table, Input } from "@/components";
import { ArquivoOperadora, ColunaArquivo, Operadora } from "@prisma/client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { OperadorasWithArquivos } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { ArquivosForm } from "./ArquivosForm";
import { ColunasForm } from "./ColunasForm";

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

  const { control } = useForm<FormData>({
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
      <h3 className="text-2xl">Operadoras</h3>

      <Table.Root
        columns={columns}
        data={data}
        onSelect={handleSelectOperadora}
        selected={operadora}
      />

      <hr />

      {operadora && (
        <>
          <h3 className="text-2xl">Dados da Operadora</h3>

          <form className="flex flex-col space-y-3">
            <Input.Root>
              <Input.Label htmlFor="nome" text="Nome:" />
              <Input.Control control={control} name="nome" />
            </Input.Root>
          </form>

          {operadora && (
            <>
              <hr />

              <h3 className="text-2xl">Arquivos</h3>

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

              {arquivo && (
                <>
                  <hr />

                  <h3 className="text-2xl">Colunas</h3>

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
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
