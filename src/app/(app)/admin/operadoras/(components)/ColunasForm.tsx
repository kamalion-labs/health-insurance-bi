"use client";

import { Button, Input, Select } from "@/components";
import { Dialog } from "@/components/Dialog";
import { ArquivoWithColunas } from "@/lib/operadora/repositorio/ArquivosRepositorio";
import { OperadoraWithArquivos } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColunaArquivo, TipoColuna } from "@prisma/client";
import { useForm } from "react-hook-form";
import { FaFloppyDisk, FaPlus } from "react-icons/fa6";
import { z } from "zod";

const formSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
  coluna: z.string().nonempty("Campo obrigatório"),
  tipo: z.string().nonempty("Campo obrigatório"),
  posicao: z.string().optional(),
  inicio: z.string().optional(),
  fim: z.string().optional(),
  referenciaTabela: z.string().optional(),
  referenciaColuna: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const listaTipoColuna: string[] = Object.keys(TipoColuna);

export function ColunasForm({
  operadora,
  arquivo,
  coluna,
}: {
  operadora: OperadoraWithArquivos;
  arquivo?: ArquivoWithColunas;
  coluna?: ColunaArquivo;
}) {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: {
      nome: coluna?.nome ?? "",
      coluna: coluna?.coluna ?? "",
      tipo: coluna?.tipo ?? "",
      posicao: coluna?.posicao?.toString() ?? undefined,
      inicio: coluna?.inicio?.toString() ?? undefined,
      fim: coluna?.fim?.toString() ?? undefined,
      referenciaTabela: coluna?.referenciaTabela ?? undefined,
      referenciaColuna: coluna?.referenciaColuna ?? undefined,
    },
  });

  async function handleSave(data: FormData) {
    await fetch(
      `/api/operadoras/${operadora?.id}/arquivos/${arquivo?.id}/colunas`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button.Root type="success">
          <Button.Icon>
            <FaPlus />
          </Button.Icon>

          <Button.Content>Adicionar</Button.Content>
        </Button.Root>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Incluir Coluna</Dialog.Title>

        <form
          className="flex flex-col space-y-5"
          onSubmit={handleSubmit(handleSave)}
        >
          <Input.Root>
            <Input.Label htmlFor="nome" text="Nome:" />
            <Input.Control control={control} name="nome" />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="coluna" text="Coluna:" />
            <Input.Control control={control} name="coluna" />
          </Input.Root>

          <div className="flex">
            <Select.Root className="">
              <Select.Label htmlFor="tipo" text="Tipo:" />

              <Select.Control
                data={listaTipoColuna.map((tipo) => ({
                  key: tipo,
                  label: tipo,
                }))}
                name="tipo"
                control={control}
              />
            </Select.Root>
          </div>

          <Input.Root>
            <Input.Label htmlFor="posicao" text="Posição:" />
            <Input.Control control={control} name="posicao" />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="inicio" text="Início:" />
            <Input.Control control={control} name="inicio" />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="fim" text="Fim:" />
            <Input.Control control={control} name="fim" />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="referenciaTabela" text="Tabela Referência:" />
            <Input.Control control={control} name="referenciaTabela" />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="referenciaColuna" text="Coluna Referência:" />
            <Input.Control control={control} name="referenciaColuna" />
          </Input.Root>

          <div>
            <Button.Root submit>
              <Button.Content>Salvar</Button.Content>
              <Button.Icon>
                <FaFloppyDisk />
              </Button.Icon>
            </Button.Root>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
