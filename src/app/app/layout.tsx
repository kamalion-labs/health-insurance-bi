import { ReactNode } from "react";
import { Header, Navbar, Page } from "@/components";
import { headers } from "next/headers";
import { NavItems } from "./nav";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userId = headers().get("X-USER-ID");
  console.log({ userId });

  return (
    <Page.Root>
      <Page.Nav>
        <Navbar.Root>
          <Navbar.Header />

          <Navbar.Content items={NavItems} />
        </Navbar.Root>
      </Page.Nav>

      <div className="z-10 flex h-full flex-auto flex-col bg-slate-200 dark:bg-slate-700">
        <Page.Header>
          <Header />
        </Page.Header>

        <main className="scrollbar-rounded-md z-10 flex flex-auto flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {children}
        </main>
      </div>
    </Page.Root>
  );
}
