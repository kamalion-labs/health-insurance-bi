import { ReactNode } from "react";

export function HeaderRoot({ children }: { children: ReactNode }) {
  return (
    <header className="flex bg-[var(--color-header-bg)] p-5 drop-shadow-md">
      {children}
    </header>
  );
}
