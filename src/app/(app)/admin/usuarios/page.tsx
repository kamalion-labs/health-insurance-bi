import { PageInitializer } from "@/components";
import { prisma } from "@/lib/db/prisma";
import { Lista } from "./Lista";

export const revalidate = 0;

export default async function Page() {
  const usuarios = await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      admin: true,
      ativo: true,
      criadoEm: true,
      atualizadoEm: true,
    },
  });

  return (
    <div className="space-y-5 p-4">
      <PageInitializer id="usuarios" title="Usuários" />

      <Lista usuarios={usuarios} />
    </div>
  );
}
