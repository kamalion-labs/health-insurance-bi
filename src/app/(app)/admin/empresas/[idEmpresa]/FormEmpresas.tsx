"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Form, Input } from "@kamalion/ui";
import { Empresa } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { FaFloppyDisk, FaTrash } from "react-icons/fa6";
import { z } from "zod";

const formSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
  CNPJ: z.string().nonempty("Campo obrigatório"),
  numeroContrato: z.string().optional(),
  inicioContrato: z.coerce.date({
    invalid_type_error: "Campo inválido",
  }),
  fimContrato: z.coerce.date({
    invalid_type_error: "Campo inválido",
  }),
  indiceReajuste: z.coerce.number({
    invalid_type_error: "Campo inválido",
  }),
  limitadorTecnico: z.coerce.number({
    invalid_type_error: "Campo inválido",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function FormEmpresas({ empresa }: { empresa: Empresa | undefined }) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: empresa?.nome ?? "",
      CNPJ: empresa?.CNPJ ?? "",
      inicioContrato: empresa?.inicioContrato ?? new Date(),
      fimContrato: empresa?.fimContrato ?? new Date(),
      indiceReajuste: empresa?.indiceReajuste ?? 0,
      limitadorTecnico: empresa?.limitadorTecnico ?? 70,
      numeroContrato: empresa?.numeroContrato ?? "",
    },
  });

  async function handleSave(formData: FormData) {
    const url = empresa ? `/api/empresa/${empresa.id}` : "/api/empresa";
    const method = empresa ? "PUT" : "POST";

    await fetch(url, {
      body: JSON.stringify(formData),
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function handleDelete() {
    if (empresa) {
      await fetch(`/api/empresa/${empresa.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return (
    <Box.Root>
      <Box.Header>Dados da Empresa</Box.Header>

      <Box.Content>
        <FormProvider {...form}>
          <Form.Root
            onSubmit={form.handleSubmit(handleSave)}
            className="flex flex-col space-y-3"
          >
            <Input.Root>
              <Input.Label htmlFor="nome">Nome:</Input.Label>
              <Input.Text {...form.register("nome")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="CNPJ">CNPJ:</Input.Label>
              <Input.Text {...form.register("CNPJ")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="numeroContrato">
                Numero Contrato:
              </Input.Label>
              <Input.Text {...form.register("numeroContrato")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="inicioContrato">
                Início Contrato:
              </Input.Label>
              <Input.DatePicker {...form.register("inicioContrato")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="fimContrato">Fim Contrato:</Input.Label>
              <Input.DatePicker {...form.register("fimContrato")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="indiceReajuste">
                Índice Reajuste:
              </Input.Label>
              <Input.Text {...form.register("indiceReajuste")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="limitadorTecnico">
                Limitador Técnico:
              </Input.Label>
              <Input.Text {...form.register("limitadorTecnico")} />
            </Input.Root>

            <Form.Error />

            <div className="flex space-x-3">
              <Button.Root variant="success" type="submit">
                <Button.Icon>
                  <FaFloppyDisk />
                </Button.Icon>

                <Button.Content>Salvar</Button.Content>
              </Button.Root>

              {empresa && (
                <>
                  <Button.Root variant="danger" onClick={handleDelete}>
                    <Button.Icon>
                      <FaTrash />
                    </Button.Icon>

                    <Button.Content>Deletar</Button.Content>
                  </Button.Root>
                </>
              )}
            </div>
          </Form.Root>
        </FormProvider>
      </Box.Content>
    </Box.Root>
  );
}
