"use client";

import { Button, Input, Select } from "@/components";
import { OperadoraWithArquivos } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArquivoOperadora, TipoArquivoOperadora } from "@prisma/client";
import { useForm } from "react-hook-form";
import { FaFloppyDisk, FaPlus } from "react-icons/fa6";
import { z } from "zod";
import { Dialog } from "@/components/Dialog";
import { Dispatch, SetStateAction, forwardRef } from "react";

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
    const { control, handleSubmit } = useForm<FormData>({
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
          <Button.Root type="success" ref={ref}>
            <Button.Icon>
              <FaPlus />
            </Button.Icon>

            <Button.Content>Adicionar</Button.Content>
          </Button.Root>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Incluir Arquivo</Dialog.Title>

          <form
            className="flex flex-col space-y-5"
            onSubmit={handleSubmit(handleSave)}
          >
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
          </form>
        </Dialog.Content>
      </Dialog.Root>
    );
  }
);

ArquivosForm.displayName = "ArquivosForm";
