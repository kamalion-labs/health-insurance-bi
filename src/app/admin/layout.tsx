import { ReactNode } from "react";
import { Page } from "@/components";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Page>{children}</Page>;
}
