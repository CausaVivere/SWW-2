import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/ui/themeProvider";
import { CartProvider } from "~/lib/cart";

export const metadata: Metadata = {
  title: "Second Web Workshop",
  description: "FMI Ovidius",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <CartProvider>{children}</CartProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
