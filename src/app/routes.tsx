import { NavItemProps } from "@/components/Navbar/NavItemProps";
import {
  FaBinoculars,
  FaChartColumn,
  FaCircleExclamation,
  FaDollarSign,
  FaLock,
  FaUserPlus,
  FaUsers,
  FaVirusCovid,
} from "react-icons/fa6";

export const Routes: NavItemProps[] = [
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
      // {
      //   title: "Relatórios de Atestados",
      //   href: "/:idEmpresa/analisePopulacional/atestados",
      //   id: "analisePopulacionalAtestados",
      // },
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
      {
        title: "Por Rede e Reembolso",
        href: "/:idEmpresa/analise/porRedeReembolso",
        id: "analisePorRedeReembolso",
      },
      {
        title: "De Exames",
        href: "/:idEmpresa/analise/deExames",
        id: "analiseDeExames",
      },
    ],
  },
  {
    title: "Grupos de Atenção",
    id: "gruposAtencao",
    icon: <FaCircleExclamation size={24} />,
    items: [
      {
        title: "Exames de Rastreamento (Screening)",
        href: "/:idEmpresa/gruposAtencao/screening",
        id: "screening",
      },
      {
        title: "Prováveis Gestantes",
        href: "/:idEmpresa/gruposAtencao/gestantes",
        id: "gestantes",
      },
      {
        title: "Ortorpedia",
        href: "/:idEmpresa/gruposAtencao/ortopedia",
        id: "ortopedia",
      },
      {
        title: "Psicologia",
        href: "/:idEmpresa/gruposAtencao/psicologia",
        id: "psicologia",
      },
      {
        title: "Oncologia",
        href: "/:idEmpresa/gruposAtencao/oncologia",
        id: "oncologia",
      },
    ],
  },
  {
    title: "Previsão de Sinistro",
    id: "previsaoSinistro",
    icon: <FaBinoculars size={24} />,
    items: [
      {
        title: "Risco de DM e HAS",
        href: "/:idEmpresa/previsaoSinistro/riscos",
        id: "riscos",
      },
      {
        title: "Guias de Liberação",
        href: "/:idEmpresa/previsaoSinistro/guiasLiberacao",
        id: "guiasLiberacao",
      },
    ],
  },
  {
    title: "Maiores Usuários",
    id: "maioresUsuarios",
    icon: <FaUserPlus size={24} />,
    items: [
      {
        title: "Geral",
        href: "/:idEmpresa/maioresUsuarios/geral",
        id: "geral",
      },
    ],
  },
  {
    title: "Administração",
    id: "admin",
    icon: <FaLock size={24} />,
    items: [
      {
        title: "Usuários",
        href: "/admin/usuarios",
        id: "usuarios",
      },
      {
        title: "Operadoras",
        href: "/admin/operadoras",
        id: "operadoras",
      },
      {
        title: "Empresas",
        href: "/admin/empresas",
        id: "empresas",
      },
    ],
  },
];
