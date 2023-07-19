"use client";

import { usePage } from "@/stores";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function NavContent({ children }: Props) {
  const { id: currentPageId, setId } = usePage();

  return (
    <div className="scrollbar-rounded-md flex flex-auto flex-col overflow-y-auto scrollbar">
      <NavigationMenu.Root
        orientation="vertical"
        className="relative text-sm"
        value={currentPageId}
        defaultValue={currentPageId}
        onValueChange={setId}
      >
        {children}
      </NavigationMenu.Root>
    </div>
  );
}
