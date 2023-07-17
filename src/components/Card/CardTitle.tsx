import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge("text-sm font-light drop-shadow-md", className)}>
      {children}
    </div>
  );
}
