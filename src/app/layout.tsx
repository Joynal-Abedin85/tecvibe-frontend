import "@/app/globals.css";

import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { AuthProvider } from "./context/authprovider";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className} >
       <AuthProvider>
         <Navbar />
       
        <main className="max-w-6xl mx-auto p-4">{children}</main>
       </AuthProvider>
      </body>
    </html>
  );
}
