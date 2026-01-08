import "@/app/globals.css";

import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { AuthProvider } from "./context/authprovider";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className} >
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
       <AuthProvider>
         <Navbar />
       
        <main className=" mt-10 bg-bgs w-full p-4">{children}</main>
        <Toaster richColors position="top-right" />
       </AuthProvider>
       </GoogleOAuthProvider>
      </body>
    </html>
  );
}
