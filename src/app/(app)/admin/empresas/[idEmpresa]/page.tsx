import { prisma } from "@/lib/db/prisma";
import { PageInitializer } from "@/components";
import { Empresa } from "@prisma/client";
import { FormEmpresas } from "./FormEmpresas";

export default async function Page({
  params: { idEmpresa },
}: {
  params: { idEmpresa: string };
}) {
  const empresa: Empresa | undefined =
    idEmpresa !== "add"
      ? await prisma.empresa.findUniqueOrThrow({
          where: {
            id: +idEmpresa,
          },
        })
      : undefined;

  return (
    <div className="space-y-5 p-4">
      <PageInitializer id="empresa" title="Usuário" />

      <FormEmpresas empresa={empresa} />
    </div>
  );
}
