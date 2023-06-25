"use client";

import { usePage } from "@/hooks";

export function Header() {
  const { pageTitle } = usePage();

  return (
    <header className="sticky bg-[var(--color-header-bg)] p-5">
      <div className=" text-3xl font-light">{pageTitle}</div>
    </header>
  );
}
