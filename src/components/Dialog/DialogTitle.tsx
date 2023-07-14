import { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface Props {
  children: ReactNode;
}

export function DialogTitle({ children }: Props) {
  return (
    <DialogPrimitive.Title className="mb-4 text-xl font-medium text-gray-900">
      {children}
    </DialogPrimitive.Title>
  );
}
