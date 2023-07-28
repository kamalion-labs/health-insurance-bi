import { PageInitializer } from "@/components";
import { OperadoraRepositorio } from "@/lib/operadora/repositorio/OperadoraRepositorio";
import { OperadoraForm } from "./(components)/OperadoraForm";

export default async function StudioPage() {
  const data = await OperadoraRepositorio.listar();

  return (
    <div className="p-4">
      <PageInitializer id="admin" title="Admin" />

      <OperadoraForm data={data} />
    </div>
  );
}
