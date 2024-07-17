import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from 'react-toastify';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud Hosing",
  description: "Cloud Hosing Project",
  icons:{
    icon:"/favicon.ico"
    
  }
  

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="min-h-screen flex flex-col">
      <Header />
      <ToastContainer theme="colored" position="top-center" />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
        </body>
    </html>
  );
}
