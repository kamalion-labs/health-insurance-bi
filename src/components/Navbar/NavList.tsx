"use client";

import { ReactNode } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export function NavList({ children }: { children: ReactNode }) {
  return (
    <NavigationMenu.List className="flex list-none flex-col justify-center space-y-3 rounded p-3">
      {children}
    </NavigationMenu.List>
  );
}
