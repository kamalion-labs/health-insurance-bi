"use client";

import { Box, Table, Input } from "@/components";
import { Operadora } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { OperadorasWithArquivos } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { ArquivosForm } from "./ArquivosForm";

const columns = [
  {
    key: "nome",
    label: "Nome",
  },
];

// const colunaFormSchema = z.object({
//   nome: z.string().nonempty("Campo obrigatório"),
//   coluna: z.string().nonempty("Campo obrigatório"),
//   tipo: z.string().nonempty("Campo obrigatório"),
//   inicio: z.string().nonempty("Campo obrigatório"),
//   fim: z.string().nonempty("Campo obrigatório"),
//   referenciaTabela: z.string().optional(),
//   referenciaColuna: z.string().optional(),
// });

const formSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
});

type FormData = z.infer<typeof formSchema>;
// type ColunaFormData = z.infer<typeof colunaFormSchema>;

export function OperadoraForm({ data }: { data: OperadorasWithArquivos }) {
  const [IdOperadora, setIdOperadora] = useState<number | undefined>();

  const operadora = data.find((x) => x.id === IdOperadora);

  const { control } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: {
      nome: operadora?.nome ?? "",
    },
  });

  // const { control: colunaControl } = useForm<ColunaFormData>({
  //   resolver: zodResolver(colunaFormSchema),
  // });

  async function handleSelect(item: Operadora) {
    setIdOperadora(item.id);
  }

  return (
    <div className="space-y-5">
      <Box.Root>
        <Box.Title>Operadoras</Box.Title>
        <Box.Content>
          <Table.Root
            columns={columns}
            data={data}
            onSelect={handleSelect}
            selected={operadora}
          />
        </Box.Content>
      </Box.Root>

      {operadora && (
        <>
          <Box.Root>
            <Box.Title>Dados</Box.Title>
            <Box.Content className="space-y-3">
              <form className="flex flex-col space-y-3">
                <Input.Root>
                  <Input.Label htmlFor="nome" text="Nome:" />
                  <Input.Control control={control} name="nome" />
                </Input.Root>
              </form>
            </Box.Content>
          </Box.Root>

          <ArquivosForm operadora={operadora} />
        </>
      )}
    </div>
  );
}
