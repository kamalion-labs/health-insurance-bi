import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BoxContentProps {
  children: ReactNode;
  className?: string;
}

export function BoxContent({ children, className }: BoxContentProps) {
  return <div className={twMerge("pb-4", className)}>{children}</div>;
}
