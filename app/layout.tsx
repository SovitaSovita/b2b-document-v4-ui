import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biz book",
  description: "Develop by B2B R&D department",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://www.kosign.com.kh/images/Vectors-Wrapper.svg" />
      </head>
      <body className={inter.className}>
        <NextUIProvider>
          <Provider>
            {children}
          </Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
