import { ReactNode } from "react";
import { DarkToggle } from "../DarkToggle";

type Props = {
  children: ReactNode;
};

export function NavRoot({ children }: Props) {
  return (
    <nav className="sticky z-20 hidden h-full flex-col bg-gradient p-3 text-white md:flex">
      {children}

      <div className="flex flex-row justify-center">
        <DarkToggle />
      </div>
    </nav>
  );
}
