import type {Metadata} from "next";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "@/app/components/Navbar";
import React from "react";
import BootstrapClient from "@/app/components/BootstrapClient";
import ReactQueryClientProvider from "@/app/components/ReactQueryClient";
import {ToastContainer} from "react-toastify";

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
        <ReactQueryClientProvider>
          <Navbar/>
          {children}
          <BootstrapClient/>
          <ToastContainer/>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
