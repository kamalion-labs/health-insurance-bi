"use client";

import { OperadoraWithArquivos } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArquivoOperadora, TipoArquivoOperadora } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { FaFloppyDisk, FaPlus } from "react-icons/fa6";
import { z } from "zod";
import { Dialog } from "@/components/Dialog";
import { Dispatch, SetStateAction, forwardRef } from "react";
import { Button, Form, Input } from "@kamalion/ui";

const formSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
  tipo: z.string().nonempty("Campo obrigatório"),
  separador: z.string().nonempty("Campo obrigatório"),
  tabela: z.string().nonempty("Campo obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

const listaTipoArquivoOperadora: string[] = Object.keys(TipoArquivoOperadora);

interface Props {
  operadora: OperadoraWithArquivos;
  setIdArquivo: Dispatch<SetStateAction<number | undefined>>;
  arquivo?: ArquivoOperadora;
}

export const ArquivosForm = forwardRef<HTMLButtonElement, Props>(
  ({ operadora, arquivo, setIdArquivo }, ref) => {
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      values: {
        nome: arquivo?.nome ?? "",
        tipo: arquivo?.tipo ?? "",
        separador: arquivo?.separador ?? "",
        tabela: arquivo?.tabela ?? "",
      },
    });

    async function handleSave(data: FormData) {
      await fetch(`/api/operadoras/${operadora?.id}/arquivos`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button.Root variant="success" ref={ref}>
            <Button.Icon>
              <FaPlus />
            </Button.Icon>

            <Button.Content>Adicionar</Button.Content>
          </Button.Root>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Incluir Arquivo</Dialog.Title>

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
                <Input.Label htmlFor="tipo">Tipo de Arquivo:</Input.Label>

                <Input.Select {...form.register("tipo")}>
                  {listaTipoArquivoOperadora.map((tipo, idx) => (
                    <Input.SelectItem key={idx} value={tipo}>{tipo}</Input.SelectItem>
                  ))}
                </Input.Select>
              </Input.Root>

              <Input.Root>
                <Input.Label htmlFor="separador">Separador:</Input.Label>
                <Input.Text {...form.register("separador")} />
              </Input.Root>

              <Input.Root>
                <Input.Label htmlFor="tabela">Tabela:</Input.Label>
                <Input.Text {...form.register("tabela")} />
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
);

ArquivosForm.displayName = "ArquivosForm";
