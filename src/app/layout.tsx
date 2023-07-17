import "./globals.css";
import { Inter, Titillium_Web as Titillium } from "next/font/google";
import Providers from "./Providers";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tt = Titillium({
  weight: ["200", "300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-titillium",
});

export const metadata = {
  title: "Seguro BI",
  description: "Seguro BI",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
