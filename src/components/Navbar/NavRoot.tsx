import { DarkToggle } from "@/components";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function NavRoot({ children }: Props) {
  return (
    <nav className="sticky z-20 hidden h-full flex-col bg-gradient pt-5 text-white md:flex md:min-w-[280px] md:max-w-[280px]">
      {children}

      <div className="flex flex-row justify-center">
        <DarkToggle />
      </div>
    </nav>
  );
}
