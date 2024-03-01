import { prisma } from "@/lib/db/prisma";
import { FiltersForm } from "./FiltersForm";

export async function Filters({ hideCategorias = false }: { hideCategorias?: boolean; }) {
  let categorias = await prisma.categoria.findMany();
  const cids = await prisma.cid.findMany();

  categorias = [{ id: 0, nome: "Todas", codigo: "todas" }, ...categorias];

  return (
    <div>
      <FiltersForm categorias={!hideCategorias && categorias} cids={cids} />
    </div>
  );
}
