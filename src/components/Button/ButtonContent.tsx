import { ReactNode } from "react";

interface ButtonContentProps {
  children: ReactNode;
}

export function ButtonContent({ children }: ButtonContentProps) {
  return <div className="drop-shadow-md">{children}</div>;
}
