"use client";

import { usePage } from "@/stores";

export function HeaderTitle() {
  const { title } = usePage();

  return <div className="flex-1 text-3xl font-light">{title}</div>;
}
