import { prisma } from "@/lib/db/prisma";
import { FormUsuarios } from "./FormUsuarios";
import { PageInitializer } from "@/components";
import { Usuario } from "@prisma/client";

export default async function Page({
  params: { idUsuario },
}: {
  params: { idUsuario: string };
}) {
  const usuario: Omit<Usuario, "senha"> | undefined =
    idUsuario !== "add"
      ? await prisma.usuario.findUniqueOrThrow({
          where: {
            id: +idUsuario,
          },
          select: {
            id: true,
            nome: true,
            email: true,
            admin: true,
            ativo: true,
            criadoEm: true,
            atualizadoEm: true,
          },
        })
      : undefined;

  return (
    <div className="space-y-5 p-4">
      <PageInitializer id="usuario" title="Usuário" />

      <FormUsuarios usuario={usuario} />
    </div>
  );
}
