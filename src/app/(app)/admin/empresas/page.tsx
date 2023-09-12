import { PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { Lista } from "./Lista";

export const revalidate = 0;

export default async function Page() {
  const empresas = await prisma.empresa.findMany();

  return (
    <div className="space-y-5 p-4">
      <PageInitializer id="empresas" title="Empresas" />

      <Lista empresas={empresas} />
    </div>
  );
}
