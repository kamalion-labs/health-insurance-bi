"use client";

import { FaChartColumn, FaHeartPulse, FaVirusCovid } from "react-icons/fa6";

import { DarkToggle } from "@/components";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NavItem from "./NavItem";
import { useEffect, useState } from "react";

type Props = {
  pageId: string;
};

export function Navbar({ pageId }: Props) {
  const [val, setVal] = useState(pageId);

  useEffect(() => {
    if (pageId) {
      setVal(pageId);
    }
  }, [pageId]);

  return (
    <nav className="sticky z-20 flex h-full flex-col bg-alt shadow-lg md:w-[280px]">
      <div className="flex items-center space-x-2 px-5 py-10 font-alt text-3xl font-bold">
        <FaHeartPulse className="text-primary" />
        <span>SEGURO BI</span>
      </div>

      <div className="scrollbar-rounded-md flex flex-auto flex-col overflow-y-auto scrollbar">
        <NavigationMenu.Root
          orientation="vertical"
          className="relative text-sm"
          value={val}
          defaultValue={pageId}
          onValueChange={setVal}
        >
          <NavigationMenu.List className="flex list-none flex-col justify-center rounded">
            <NavItem
              title="Dashboard Geral"
              icon={<FaChartColumn size={20} />}
              href="/"
              id="dashboardGeral"
            />

            <NavItem
              title="Análise Covid-19"
              icon={<FaVirusCovid size={20} />}
              id="covid"
            >
              <NavigationMenu.List>
                <NavItem
                  title="Dashboard"
                  href="/covid/dashboard"
                  id="covidDashboard"
                />
                <NavItem
                  title="Análise Temporal"
                  href="/covid/timeline"
                  id="covidTimeline"
                />
                <NavItem title="Exames" href="/covid/exames" id="covidExames" />
                <NavItem
                  title="Internação"
                  href="/covid/internacao"
                  id="covidInternacao"
                />
              </NavigationMenu.List>
            </NavItem>

            {/* <NavItem title="Análise Populacional" icon={<FaUsers size={20} />}>
              <NavItem
                title="Indicadores Sociodemográficos (IS)"
                href="/populacional/is"
              />
              <NavItem
                title="Indicadores Comparativos de Utilização (ANS)"
                href="/populacional/ans"
              />
              <NavItem
                title="Relatórios de Atestados"
                href="/populacional/atestados"
              />
            </NavItem> */}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>

      <div className="flex flex-row justify-center">
        <DarkToggle />
      </div>
    </nav>
  );
}
