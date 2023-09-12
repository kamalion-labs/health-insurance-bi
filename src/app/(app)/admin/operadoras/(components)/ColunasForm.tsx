"use client";

import { Button, Form, Input } from "@kamalion/ui";
import { Dialog } from "@/components/Dialog";
import { ArquivoWithColunas } from "@/lib/operadora/repositorio/ArquivosRepositorio";
import { OperadoraWithArquivos } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColunaArquivo, TipoColuna } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
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
  const form = useForm<FormData>({
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
        <Button.Root variant="success">
          <Button.Icon>
            <FaPlus />
          </Button.Icon>

          <Button.Content>Adicionar</Button.Content>
        </Button.Root>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Incluir Coluna</Dialog.Title>

        <FormProvider {...form}>
          <Form.Root
            className="flex flex-col space-y-5"
            onSubmit={form.handleSubmit(handleSave)}
          >
            <Input.Root>
              <Input.Label htmlFor="nome">Nome:</Input.Label>
              <Input.Text {...form.register("nome")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="coluna">Coluna:</Input.Label>
              <Input.Text {...form.register("coluna")} />
            </Input.Root>

            <div className="flex">
              <Input.Root>
                <Input.Label htmlFor="tipo">Tipo:</Input.Label>

                <Input.Select {...form.register("tipo")}>
                  {listaTipoColuna.map((tipo, idx) => (<Input.SelectItem key={idx} value={tipo}>{tipo}</Input.SelectItem>))}
                </Input.Select>
              </Input.Root>
            </div>

            <Input.Root>
              <Input.Label htmlFor="posicao">Posição:</Input.Label>
              <Input.Text {...form.register("posicao")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="inicio">Início:</Input.Label>
              <Input.Text {...form.register("inicio")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="fim">Fim:</Input.Label>
              <Input.Text {...form.register("fim")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="referenciaTabela">Tabela Referência:</Input.Label>
              <Input.Text {...form.register("referenciaTabela")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="referenciaColuna">Coluna Referência:</Input.Label>
              <Input.Text {...form.register("referenciaColuna")} />
            </Input.Root>

            <div>
              <Button.Root type="submit" variant="accent">
                <Button.Content>Salvar</Button.Content>
                <Button.Icon>
                  <FaFloppyDisk />
                </Button.Icon>
              </Button.Root>
            </div>
          </Form.Root>
        </FormProvider>
      </Dialog.Content>
    </Dialog.Root>
  );
}
