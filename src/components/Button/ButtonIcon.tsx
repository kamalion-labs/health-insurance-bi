import { ReactNode } from "react";

interface ButtonIconProps {
  children: ReactNode;
}

export function ButtonIcon({ children }: ButtonIconProps) {
  return <div className="drop-shadow-md">{children}</div>;
}
