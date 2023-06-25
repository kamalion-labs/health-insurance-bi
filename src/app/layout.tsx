import { ReactNode } from "react";
import "./globals.css";
import { Inter, Titillium_Web as Titillium } from "next/font/google";
import { Header, Navbar } from "@/components";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tt = Titillium({
  weight: ["200", "300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-titillium",
});

export const metadata = {
  title: "Seguro BI",
  description: "Seguro BI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${tt.variable} flex h-screen bg-[var(--color-main-bg)] font-sans text-[var(--foreground)]`}
      >
        <Providers>
          <Navbar />

          <div className="z-10 flex h-full flex-auto flex-col">
            <Header />

            <main className="scrollbar-rounded-md flex flex-auto flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
