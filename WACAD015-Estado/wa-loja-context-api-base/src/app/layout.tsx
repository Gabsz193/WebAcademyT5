import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar/Navbar";
import FavoritoProvider from "@/app/provider/FavoritoProvider";
import React from "react";
import {Metadata} from "next";

export const metadata : Metadata = {
  title: 'Minha Loja',
  description: 'Minha loja online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <FavoritoProvider>
          <Navbar/>
          {children}
          <BootstrapClient/>
        </FavoritoProvider>
      </body>
    </html>
  );
}
