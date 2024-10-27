import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
//import localFont from "next/font/local";
import "@/app/globals.css";

export default function CustomerLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section>
          <div className="h-16" >
          <Navbar /></div>
          {children}
          </section>
    );
  }
  