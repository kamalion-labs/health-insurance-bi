import { ReactNode } from "react";

export function PageHeader({ children }: { children: ReactNode }) {
  return <div className="z-20">{children}</div>;
}
