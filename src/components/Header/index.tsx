"use client";

import { usePage } from "@/stores";

export function Header() {
  const { title } = usePage();

  return (
    <header className="sticky bg-[var(--color-header-bg)] p-5 drop-shadow-md">
      <div className=" text-3xl font-light">{title}</div>
    </header>
  );
}
