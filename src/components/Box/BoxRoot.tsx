import { ReactNode } from "react";

interface BoxRootProps {
  children: ReactNode;
}

export function BoxRoot({ children }: BoxRootProps) {
  return <div className="rounded-md bg-main">{children}</div>;
}
