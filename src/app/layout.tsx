import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar"
import { Inter } from "next/font/google"
//import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "ReelZone",
  description: "Your video reels making platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
    // <html lang="en">
    //   <body className={inter.className}>
    //     <div className="h-16" ></div>
    //     <Navbar />
    //     <main>{children}</main>
    //   </body>
    // </html>
  );
}
