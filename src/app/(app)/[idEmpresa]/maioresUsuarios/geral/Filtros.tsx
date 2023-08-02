"use client";

import { Button, Select } from "@/components";
import { useFiltro, usePessoa } from "@/stores";
import { Categoria, Cid } from "@prisma/client";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export function Filtros({
  categorias,
  cids,
}: {
  categorias: Categoria[];
  cids: Cid[];
}) {
  const { idCategoria, setIdCategoria } = useFiltro();
  const { setId } = usePessoa();

  const [FilterIdCategoria, setFilterIdCategoria] = useState(idCategoria);

  categorias = [{ id: 0, nome: "Todas" }, ...categorias];

  function handleFilter(e: any) {
    e.preventDefault();
    setIdCategoria(FilterIdCategoria ? +FilterIdCategoria : undefined);
  }

  function handleLimpar() {
    setIdCategoria(0);
    setId(undefined);
    // setCid(null);
  }

  function handleChangeCategoria(e: any) {
    setFilterIdCategoria(e);
  }

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleFilter}>
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
              defaultValue={"0"}
              value={FilterIdCategoria}
              onChange={handleChangeCategoria}
            />
          </Select.Root>
        </div>

        <div className="flex">
          <Select.Root className="flex">
            <Select.Label htmlFor="cid" text="CID:" />

            {/* <Select.Control data={[]} name="cid" control={control} /> */}
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
