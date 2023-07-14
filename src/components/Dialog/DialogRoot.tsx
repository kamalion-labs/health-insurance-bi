"use client";

import { ReactNode, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface Props {
  children: ReactNode;
}

export function DialogRoot({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      {children}
    </DialogPrimitive.Root>
  );
}
