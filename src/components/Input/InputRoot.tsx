import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

interface InputRootProps {
  children: ReactNode;
  className?: string;
}

export function InputRoot({ children, className }: InputRootProps) {
  return <div className={twMerge("flex flex-col", className)}>{children}</div>;
}
