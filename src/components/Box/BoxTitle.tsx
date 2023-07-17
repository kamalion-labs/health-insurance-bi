import { ReactNode } from "react";

interface BoxTitleProps {
  children: ReactNode;
}

export function BoxTitle({ children }: BoxTitleProps) {
  return <div className="p-4 text-lg font-medium">{children}</div>;
}
