import { prisma } from "@/lib/db/prisma";
import { FiltersForm } from "./FiltersForm";

export async function Filters() {
  let categorias = await prisma.categoria.findMany();
  const cids = await prisma.cid.findMany();

  categorias = [{ id: 0, nome: "Todas", codigo: "todas" }, ...categorias];

  return (
    <div>
      <FiltersForm categorias={categorias} cids={cids} />
    </div>
  );
}
