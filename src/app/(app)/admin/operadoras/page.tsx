import { PageInitializer } from "@/components";
import { OperadoraForm } from "./(components)/OperadoraForm";
import { prisma } from "@/lib/db/prisma";

export const revalidate = 0;

export default async function AdminPage() {
  const operadoras = await prisma.operadora.findMany({
    include: {
      arquivos: {
        include: {
          colunas: true,
        },
      },
    },
  });

  return (
    <div className="p-4">
      <PageInitializer id="operadoras" title="Operadoras" />

      <OperadoraForm data={operadoras} />
    </div>
  );
}
