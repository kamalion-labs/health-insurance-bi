import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SelectRootProps {
  children: ReactNode;
  className?: string;
}

export function SelectRoot({ children, className }: SelectRootProps) {
  return (
    <div className={twMerge("flex flex-col w-full", className)}>{children}</div>
  );
}
