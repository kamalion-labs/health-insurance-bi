"use client";

import { Box, Button, Input, Select, Table } from "@/components";
import { OperadoraWithArquivos } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArquivoOperadora, TipoArquivoOperadora } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFloppyDisk, FaPlus } from "react-icons/fa6";
import { z } from "zod";

const columns = [
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

const formSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
  tipo: z.string().nonempty("Campo obrigatório"),
  separador: z.string().nonempty("Campo obrigatório"),
  tabela: z.string().nonempty("Campo obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

const listaTipoArquivoOperadora: string[] = Object.keys(TipoArquivoOperadora);

export function ArquivosForm({
  operadora,
}: {
  operadora: OperadoraWithArquivos;
}) {
  const [IdArquivo, setIdArquivo] = useState<number | undefined>();

  const arquivo = operadora?.arquivos.find((x) => x.id === IdArquivo);

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: {
      nome: arquivo?.nome ?? "",
      tipo: arquivo?.tipo ?? "",
      separador: arquivo?.separador ?? "",
      tabela: arquivo?.tabela ?? "",
    },
  });

  if (!operadora) return null;

  async function handleSelect(item: ArquivoOperadora) {
    setIdArquivo(item.id);
  }

  function handleSave(data: FormData) {
    console.log({ data });
  }

  return (
    <>
      <Box.Root>
        <Box.Title>Arquivos</Box.Title>
        <Box.Content>
          <div>
            <Button.Root type="success">
              <Button.Content>Adicionar</Button.Content>
              <Button.Icon>
                <FaPlus />
              </Button.Icon>
            </Button.Root>
          </div>

          <Table.Root
            columns={columns}
            data={operadora.arquivos}
            onSelect={handleSelect}
            selected={arquivo}
          />
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Title>Dados do Arquivo</Box.Title>
        <Box.Content className="">
          <form className="flex" onSubmit={handleSubmit(handleSave)}>
            <div className="flex w-[300px] flex-col space-y-5">
              <Input.Root>
                <Input.Label htmlFor="nome" text="Nome:" />
                <Input.Control control={control} name="nome" />
              </Input.Root>

              <Select.Root className="">
                <Select.Label htmlFor="tipo" text="Tipo de Arquivo:" />

                <Select.Control
                  data={listaTipoArquivoOperadora.map((tipo) => ({
                    key: tipo,
                    label: tipo,
                  }))}
                  name="tipo"
                  control={control}
                />
              </Select.Root>

              <Input.Root>
                <Input.Label htmlFor="separador" text="Separador:" />
                <Input.Control control={control} name="separador" />
              </Input.Root>

              <Input.Root>
                <Input.Label htmlFor="tabela" text="Tabela:" />
                <Input.Control control={control} name="tabela" />
              </Input.Root>

              <div>
                <Button.Root submit>
                  <Button.Content>Salvar</Button.Content>
                  <Button.Icon>
                    <FaFloppyDisk />
                  </Button.Icon>
                </Button.Root>
              </div>
            </div>

            <div className="flex-1"></div>
          </form>
        </Box.Content>
      </Box.Root>
    </>
  );
}
