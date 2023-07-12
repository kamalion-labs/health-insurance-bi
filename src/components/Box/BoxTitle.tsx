import { ReactNode } from "react";

interface BoxTitleProps {
  children: ReactNode;
}

export function BoxTitle({ children }: BoxTitleProps) {
  return <div className="px-4 py-2 text-lg font-bold">{children}</div>;
}
