import { ReactNode } from "react";
// import { headers } from "next/dist/client/components/headers";

import { prisma } from "@/lib/db/prisma";
import { Navbar, Header, Page } from "@/components";
import { Empresas } from "@/components/Empresas";
import { Routes } from "../routes";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // const userId = headers().get("X-USER-ID");
  // console.log({ userId });

  const empresas = await prisma.empresa.findMany({ orderBy: { id: "asc" } });

  return (
    <Page.Root>
      <Page.Nav>
        <Navbar.Root>
          <Navbar.Header />

          <Navbar.Content items={Routes} />
        </Navbar.Root>
      </Page.Nav>

      <div className="flex h-full flex-auto flex-col bg-slate-200 dark:bg-slate-700">
        <Page.Header>
          <Header.Root>
            <Header.Title />

            <Header.Right>
              <Empresas data={empresas} />
            </Header.Right>
          </Header.Root>
        </Page.Header>

        <main className="scrollbar-rounded-md z-10 flex flex-auto flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {children}
        </main>
      </div>
    </Page.Root>
  );
}
