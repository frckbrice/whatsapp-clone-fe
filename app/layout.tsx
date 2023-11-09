import { GeistSans } from "geist/font";
import "./globals.css";
import type { Metadata } from "next";
import { WhatSappContextProvider } from "./context";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Clone App",
  description: "to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <div className="flex flex-col h-screen absolute w-[100vw] items-center">
          <div className=" h-[32vh] w-full bg-themecolor absolute top-0"></div>
          <div className=" flex flex-col items-center w-full mx-auto relative">
            <WhatSappContextProvider> {children}</WhatSappContextProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
