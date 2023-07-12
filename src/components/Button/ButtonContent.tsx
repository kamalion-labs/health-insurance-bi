import { ReactNode } from "react";

interface ButtonContentProps {
  children: ReactNode;
}

export function ButtonContent({ children }: ButtonContentProps) {
  return <div>{children}</div>;
}
