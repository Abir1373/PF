import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dewan Abir Mahmud",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      ml-update="aware"
    >
      <body className="min-h-screen bg-[#0a0a0a] text-base-content">
        <div className="max-w-7xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
