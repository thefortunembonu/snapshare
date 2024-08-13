import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/sections/Navbar";
import Head from "next/head";
import ReduxProvider from "@/redux/reduxProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "SnapShare: Photo Sharing Application",
  description: "By Fortune Mbonu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="font-poppins">
        <Toaster position="top-right" richColors />
        <ReduxProvider>
          <Navbar />
          <main className="dark:bg-gray-900 bg-pink-50/50 px-6 text-center z-5 relative">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
