import { Navbar } from "@/components/Navbar"
//import localFont from "next/font/local";
import "@/app/globals.css";

export default function CustomerLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          <div className="h-16" ></div>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    );
  }
  