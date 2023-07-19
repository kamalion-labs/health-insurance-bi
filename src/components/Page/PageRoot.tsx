import { ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
};

export function PageRoot({ className, children }: Props) {
  return <>{children}</>;
}
