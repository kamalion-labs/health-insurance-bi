"use client";

import { PageInitializer } from "@/components";
import clsx from "clsx";

export default function CovidDashboard() {
  return (
    <div className="p-4">
      <PageInitializer
        title="Dashboard Covid-19"
        id="covidDashboard"
        parentId="covid"
      />

      <div className="flex">
        <button className={clsx("")}>Botão</button>
        <button className={clsx("")}>Botão 2</button>
        <button className={clsx("")}>Botão 2</button>
        <button className={clsx("")}>Botão 2</button>
        <button className={clsx("")}>Botão 2</button>
        <button className={clsx("")}>Botão 2</button>
      </div>
    </div>
  );
}
