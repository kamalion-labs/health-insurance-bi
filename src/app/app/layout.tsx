import { ReactNode } from "react";
import { Header, Navbar, Page } from "@/components";
import { headers } from "next/headers";
import { FaChartColumn, FaUsers, FaVirusCovid } from "react-icons/fa6";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userId = headers().get("X-USER-ID");
  console.log({ userId });

  return (
    <Page.Root>
      <Page.Nav>
        <Navbar.Root>
          <Navbar.Header />

          <Navbar.Content>
            <Navbar.List>
              <Navbar.Item
                title="Dashboard Geral"
                icon={<FaChartColumn size={20} />}
                href="/app"
                id="dashboardGeral"
              />

              <Navbar.Item
                title="Análise Covid-19"
                icon={<FaVirusCovid size={20} />}
                id="covid"
              >
                <Navbar.List>
                  <Navbar.Item
                    title="Dashboard"
                    href="/app/covid/dashboard"
                    id="covidDashboard"
                  />
                  <Navbar.Item
                    title="Análise Temporal"
                    href="/app/covid/timeline"
                    id="covidTimeline"
                  />
                  <Navbar.Item
                    title="Exames"
                    href="/covid/exames"
                    id="covidExames"
                  />
                  <Navbar.Item
                    title="Internação"
                    href="/app/covid/internacao"
                    id="covidInternacao"
                  />
                </Navbar.List>
              </Navbar.Item>

              <Navbar.Item
                title="Análise Populacional"
                id="analisePopulacional"
                icon={<FaUsers size={20} />}
              >
                <Navbar.Item
                  title="Indicadores Sociodemográficos (IS)"
                  href="/app/analisePopulacional/is"
                  id="analisePopulacionalIS"
                />
                <Navbar.Item
                  title="Indicadores Comparativos de Utilização (ANS)"
                  href="/app/analisePopulacional/ans"
                  id="analisePopulacionalANS"
                />
                <Navbar.Item
                  title="Relatórios de Atestados"
                  href="/app/analisePopulacional/atestados"
                  id="analisePopulacionalAtestados"
                />
              </Navbar.Item>
            </Navbar.List>
          </Navbar.Content>
        </Navbar.Root>
      </Page.Nav>

      <div className="z-10 flex h-full flex-auto flex-col bg-slate-200 dark:bg-slate-700">
        <Page.Header>
          <Header title={"title"} />
        </Page.Header>

        <main className="scrollbar-rounded-md flex flex-auto flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {children}
        </main>
      </div>
    </Page.Root>
  );
}
