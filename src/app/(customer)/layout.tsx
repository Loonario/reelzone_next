import Navbar from "@/components/common/navbar"
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
  