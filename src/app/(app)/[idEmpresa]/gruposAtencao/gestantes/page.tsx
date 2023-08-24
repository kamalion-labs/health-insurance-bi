import { PageInitializer } from "@/components";
import { Tuss } from "@/lib/consts";
import { prisma } from "@/lib/db/prisma";

type Props = {
  params: {
    idEmpresa: string;
  };
};

export async function generateStatiParams() {
  const empresas = await prisma.empresa.findMany();

  return empresas.map((empresa) => ({ idEmpresa: empresa.id.toString() }));
}

export default async function Page({ params: { idEmpresa } }: Props) {
  const pessoas = await prisma.pessoa.findMany({
    where: {
      idEmpresa: +idEmpresa,
    },
  });

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Prováveis Gestantes"
        id="screening"
        parentId="gruposAtencao"
      />
    </div>
  );
}
