import { ReactNode } from "react";

export function PageContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div>{children}</div>;
}
