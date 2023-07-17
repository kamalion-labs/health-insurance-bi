import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function CardRoot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex h-fit flex-col justify-center space-y-2 rounded bg-white px-4 py-3 drop-shadow-md dark:bg-slate-800",
        className
      )}
    >
      {children}
    </div>
  );
}
