import type {Metadata} from "next";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "@/app/components/Navbar";
import React from "react";

export const metadata: Metadata = {
  title: "Loja do Web Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body suppressHydrationWarning>
        <Navbar/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
