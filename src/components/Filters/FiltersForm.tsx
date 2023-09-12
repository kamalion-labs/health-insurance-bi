"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Categoria, Cid } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Input } from "@kamalion/ui";
import { useEffect } from "react";
import { useFiltro } from "@/stores";
import { subMonths } from "date-fns";

const formSchema = z.object({
  categoria: z.coerce.number(),
  dataInicio: z.coerce.date(),
  dataFim: z.coerce.date(),
});

type FormData = z.infer<typeof formSchema>;

export function FiltersForm({
  categorias,
  cids,
}: {
  categorias: Categoria[];
  cids: Cid[];
}) {
  const { setIdCategoria, setDataInicio, setDataFim } = useFiltro();

  const form = useForm<FormData>({ resolver: zodResolver(formSchema), defaultValues: {
    dataFim: new Date(),
    dataInicio: subMonths(new Date(), 6),
  } });
  const categoria = form.watch("categoria");
  const dataInicio = form.watch("dataInicio");
  const dataFim = form.watch("dataFim");

  useEffect(() => {
    setIdCategoria(categoria ? +categoria : undefined);
  }, [categoria]);

  useEffect(() => {
    setDataInicio(dataInicio);
  }, [dataInicio]);

  useEffect(() => {
    setDataFim(dataFim);
  }, [dataFim]);

  return (
    <FormProvider {...form}>
      <Form.Root className="flex flex-col space-y-5">
        <div className="flex space-x-5">
          <div className="flex space-x-3">
            <Input.Root>
              <Input.Label>Categoria:</Input.Label>
              <Input.Select {...form.register("categoria")}>
                {categorias.map((categoria) => (
                  <Input.SelectItem
                    key={categoria.id}
                    value={categoria.id.toString()}
                  >
                    {categoria.nome}
                  </Input.SelectItem>
                ))}
              </Input.Select>
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="dataInicio">Data Início:</Input.Label>
              <Input.DatePicker defaultMonth={dataInicio} toDate={dataFim} {...form.register("dataInicio")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="dataFim">Data Fim:</Input.Label>
              <Input.DatePicker defaultMonth={dataFim} fromDate={dataInicio} toDate={new Date()} {...form.register("dataFim")} />
            </Input.Root>
          </div>
        </div>
      </Form.Root>
    </FormProvider>
  );
}
