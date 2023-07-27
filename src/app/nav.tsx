import { NavItemProps } from "@/components/Navbar/NavItemProps";
import {
  FaChartColumn,
  FaDollarSign,
  FaUsers,
  FaVirusCovid,
} from "react-icons/fa6";

export const NavItems: NavItemProps[] = [
  {
    id: "dashboardGeral",
    title: "Dashboard Geral",
    href: "/:idEmpresa",
    icon: <FaChartColumn size={24} />,
  },
  {
    title: "Análise Covid-19",
    icon: <FaVirusCovid size={24} />,
    id: "covid",
    items: [
      {
        title: "Dashboard",
        href: "/:idEmpresa/covid/dashboard",
        id: "covidDashboard",
      },
      {
        title: "Análise Temporal",
        href: "/:idEmpresa/covid/timeline",
        id: "covidTimeline",
      },
      {
        title: "Exames",
        href: "/:idEmpresa/covid/exames",
        id: "covidExames",
      },
      {
        title: "Internação",
        href: "/:idEmpresa/covid/internacao",
        id: "covidInternacao",
      },
    ],
  },
  {
    title: "Análise Populacional",
    id: "analisePopulacional",
    icon: <FaUsers size={24} />,
    items: [
      {
        title: "Indicadores Sociodemográficos (IS)",
        href: "/:idEmpresa/analisePopulacional/is",
        id: "analisePopulacionalIS",
      },
      {
        title: "Indicadores Comparativos de Utilização (ANS)",
        href: "/:idEmpresa/analisePopulacional/ans",
        id: "analisePopulacionalANS",
      },
      {
        title: "Relatórios de Atestados",
        href: "/:idEmpresa/analisePopulacional/atestados",
        id: "analisePopulacionalAtestados",
      },
    ],
  },
  {
    title: "Análise de Utilização",
    id: "analise",
    icon: <FaDollarSign size={24} />,
    items: [
      {
        title: "Por Categoria",
        href: "/:idEmpresa/analise/porCategoria",
        id: "analisePorCategoria",
      },
      {
        title: "Por CID",
        href: "/:idEmpresa/analise/porCid",
        id: "analisePorCid",
      },
    ],
  },
];
