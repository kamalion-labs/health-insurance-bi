import { ReactNode } from "react";

interface ButtonIconProps {
  children: ReactNode;
}

export function ButtonIcon({ children }: ButtonIconProps) {
  return <div>{children}</div>;
}
