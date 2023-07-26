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
    href: "/app",
    icon: <FaChartColumn size={24} />,
  },
  {
    title: "Análise Covid-19",
    icon: <FaVirusCovid size={24} />,
    id: "covid",
    items: [
      {
        title: "Dashboard",
        href: "/app/covid/dashboard",
        id: "covidDashboard",
      },
      {
        title: "Análise Temporal",
        href: "/app/covid/timeline",
        id: "covidTimeline",
      },
      {
        title: "Exames",
        href: "/app/covid/exames",
        id: "covidExames",
      },
      {
        title: "Internação",
        href: "/app/covid/internacao",
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
        href: "/app/analisePopulacional/is",
        id: "analisePopulacionalIS",
      },
      {
        title: "Indicadores Comparativos de Utilização (ANS)",
        href: "/app/analisePopulacional/ans",
        id: "analisePopulacionalANS",
      },
      {
        title: "Relatórios de Atestados",
        href: "/app/analisePopulacional/atestados",
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
        href: "/app/analise/porCategoria",
        id: "analisePorCategoria",
      },
      {
        title: "Por Cid",
        href: "/app/analise/porCid",
        id: "analisePorCid",
      },
    ],
  },
];
