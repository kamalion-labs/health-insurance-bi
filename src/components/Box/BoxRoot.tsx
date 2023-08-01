import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BoxRootProps {
  children: ReactNode;
  className?: string;
}

export function BoxRoot({ children, className }: BoxRootProps) {
  return (
    <div
      className={twMerge(
        "w-full rounded bg-white shadow-md dark:bg-slate-700",
        className
      )}
    >
      {children}
    </div>
  );
}
