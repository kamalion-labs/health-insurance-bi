import { PageInitializer } from "@/components";
import { ImportForm } from "./(components)/ImportForm";
import { ArquivosRepositorio } from "@/lib/operadora/repositorio/ArquivosRepositorio";

export default async function StudioPage() {
  const data = await ArquivosRepositorio.listar(1);

  return (
    <div className="p-4">
      <PageInitializer id="importacao" title="Importação" />

      <ImportForm arquivos={data} />
    </div>
  );
}
