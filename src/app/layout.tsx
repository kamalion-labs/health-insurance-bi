import { Inter, Titillium_Web as Titillium } from "next/font/google";
import { ReactNode } from "react";
import Providers from "./Providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tt = Titillium({
  weight: ["200", "300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-titillium",
});

export const metadata = {
  title: "Interliga",
  description: "Interliga",
  viewport: "width=device-width, initial-scale=1",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${tt.variable} flex h-screen bg-gradient font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
