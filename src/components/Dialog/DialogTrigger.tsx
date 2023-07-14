import { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface Props {
  children: ReactNode;
}

export function DialogTrigger({ children }: Props) {
  return <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>;
}
