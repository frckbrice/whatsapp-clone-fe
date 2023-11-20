import { GeistSans } from "geist/font";
import "./globals.css";
import type { Metadata } from "next";
import { WhatSappContextProvider } from "../components/context";
import { WhatSappContactContextProvider } from "@/components/context/Context";
import { ProfileContextProvider } from "@/components/context/profileContext";
import Pulsation from "./[signup]/component/PulseLoader";
import { Suspense } from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WhatsApp Clone App",
  description: "Reimplementing WhatsApp features with NextJS and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="ltr" lang="en" className={GeistSans.className}>
      <body>
        <div className="flex flex-col h-screen absolute w-[100vw] items-center">
          <div className=" h-[32vh] w-full bg-themecolor absolute top-0"></div>
          <div className=" flex flex-col items-center w-full mx-auto relative">
            <WhatSappContextProvider>
              <WhatSappContactContextProvider>
                <ProfileContextProvider>
                  {" "}
                  <Suspense
                    fallback={
                      <div className=" flex flex-col justify-center items-center m-28">
                        <Pulsation />
                      </div>
                    }
                  >
                    {children}
                  </Suspense>
                </ProfileContextProvider>
              </WhatSappContactContextProvider>{" "}
            </WhatSappContextProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
