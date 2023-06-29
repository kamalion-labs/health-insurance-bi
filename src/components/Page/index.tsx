"use client";

import { ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Header } from "../Header";
import clsx from "clsx";
import { usePage } from "@/stores";

type Props = {
  className?: string;
  children?: ReactNode;
};

export function Page({ className, children }: Props) {
  const { title, id } = usePage();

  return (
    <>
      <Navbar pageId={id} />

      <div className="z-10 flex h-full flex-auto flex-col">
        <Header title={title} />

        <main
          className={clsx(
            "scrollbar-rounded-md flex flex-auto flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300",
            className
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
}
