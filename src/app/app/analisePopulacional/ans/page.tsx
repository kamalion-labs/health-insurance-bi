import { Box, PageInitializer } from "@/components";
import { ExameRepositorio } from "@/lib/exames/repositorio/ExameRepositorio";
import { Grafico } from "./Grafico";

export default async function ANSPage() {
  const exames = await ExameRepositorio.listar();

  const listaConsultas = exames.filter((x) => x.idCategoria === 2);
  const listaConsultasEletivas = exames.filter((x) => x.idCategoria === 3);
  const listaConsultasPS = exames.filter((x) => x.idCategoria === 4);
  const listaExames = exames.filter((x) => x.idCategoria === 5);
  const listaOutros = exames.filter((x) => x.idCategoria === 6);
  const listaTerapia = exames.filter((x) => x.idCategoria === 7);

  const chartData = [
    {
      Item: 1,
      Total: 5.78,
      TotalColor: "#5B93FF",
    },
  ];

  return (
    <div className="space-y-5 p-4">
      <PageInitializer
        title="Indicadores comparativos de utilização ANS"
        id="analisePopulacionalANS"
        parentId="analisePopulacional"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Box.Root>
          <Box.Title>Exames por Beneficiário</Box.Title>

          <Box.Content className="h-[300px]">
            <Grafico data={chartData} />
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Title>Consultas por Beneficiário</Box.Title>

          <Box.Content className="h-[300px]">
            <Grafico data={chartData} />
          </Box.Content>
        </Box.Root>
      </div>
    </div>
  );
}
