import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function CardValue({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge("text-3xl font-bold drop-shadow-md", className)}>
      {children}
    </div>
  );
}
