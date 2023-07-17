"use client";

import { FaChartColumn, FaUsers, FaVirusCovid } from "react-icons/fa6";

import { DarkToggle } from "@/components";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NavItem from "./NavItem";
import { useEffect, useState } from "react";

import logo from "../../assets/interliga.png";
import Image from "next/image";

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
    <nav className="sticky z-20 hidden h-full flex-col bg-gradient pt-5 text-white md:flex md:min-w-[280px] md:max-w-[280px]">
      <div className="flex justify-center pb-10">
        <div className="rounded-full bg-white px-2 py-4 drop-shadow-md">
          <Image alt="Interliga" src={logo} className="w-[80px]" />
        </div>
      </div>

      <div className="scrollbar-rounded-md flex flex-auto flex-col overflow-y-auto scrollbar">
        <NavigationMenu.Root
          orientation="vertical"
          className="relative text-sm"
          value={val}
          defaultValue={pageId}
          onValueChange={setVal}
        >
          <NavigationMenu.List className="flex list-none flex-col justify-center space-y-3 rounded p-3">
            <NavItem
              title="Dashboard Geral"
              icon={<FaChartColumn size={20} />}
              href="/app"
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
                  href="/app/covid/dashboard"
                  id="covidDashboard"
                />
                <NavItem
                  title="Análise Temporal"
                  href="/app/covid/timeline"
                  id="covidTimeline"
                />
                <NavItem title="Exames" href="/covid/exames" id="covidExames" />
                <NavItem
                  title="Internação"
                  href="/app/covid/internacao"
                  id="covidInternacao"
                />
              </NavigationMenu.List>
            </NavItem>

            <NavItem
              title="Análise Populacional"
              id="analisePopulacional"
              icon={<FaUsers size={20} />}
            >
              <NavItem
                title="Indicadores Sociodemográficos (IS)"
                href="/app/analisePopulacional/is"
                id="analisePopulacionalIS"
              />
              <NavItem
                title="Indicadores Comparativos de Utilização (ANS)"
                href="/app/populacional/ans"
                id="analisePopulacionalANS"
              />
              <NavItem
                title="Relatórios de Atestados"
                href="/app/populacional/atestados"
                id="analisePopulacionalAtestados"
              />
            </NavItem>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>

      <div className="flex flex-row justify-center">
        <DarkToggle />
      </div>
    </nav>
  );
}
