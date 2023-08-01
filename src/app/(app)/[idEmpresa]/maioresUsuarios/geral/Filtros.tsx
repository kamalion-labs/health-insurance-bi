"use client";

import { Button, Select } from "@/components";
import { useFiltro, usePessoa } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categoria, Cid } from "@prisma/client";
import { useForm } from "react-hook-form";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { z } from "zod";

const formSchema = z.object({
  idCategoria: z.coerce.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function Filtros({
  categorias,
  cids,
}: {
  categorias: Categoria[];
  cids: Cid[];
}) {
  const { idCategoria, setIdCategoria } = useFiltro();
  const { setId } = usePessoa();

  categorias = [{ id: 0, nome: "Todas" }, ...categorias];

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idCategoria,
    },
  });

  function handleFilter(formData: FormData) {
    setIdCategoria(formData.idCategoria ? +formData.idCategoria : undefined);
  }

  function handleLimpar() {
    setIdCategoria(0);
    setId(undefined);
    // setCid(null);
  }

  return (
    <form
      className="flex flex-col space-y-5"
      onSubmit={handleSubmit(handleFilter)}
    >
      <div className="flex space-x-5">
        <div className="flex">
          <Select.Root className="flex">
            <Select.Label htmlFor="categoria" text="Categoria:" />

            <Select.Control
              data={categorias.map((categoria) => ({
                key: categoria.id.toString(),
                label: categoria.nome,
              }))}
              name="categoria"
              control={control}
              defaultValue={"0"}
            />
          </Select.Root>
        </div>

        <div className="flex">
          <Select.Root className="flex">
            <Select.Label htmlFor="cid" text="CID:" />

            <Select.Control data={[]} name="cid" control={control} />
          </Select.Root>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button.Root submit>
          <Button.Icon>
            <FaMagnifyingGlass />
          </Button.Icon>
          <Button.Content>Aplicar</Button.Content>
        </Button.Root>

        <Button.Root type="secondary" onClick={handleLimpar}>
          <Button.Content>Limpar</Button.Content>
        </Button.Root>
      </div>
    </form>
  );
}
