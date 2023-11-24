"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import GoogleButton from "./atoms/googlebtn";
import { redirect, useRouter } from "next/navigation";
import { AuthResponse } from "@supabase/supabase-js";

const Signup = () => {
  if (typeof localStorage === "undefined") return;

  const handleGoogleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: usrToUse(),
      },
    });
  };

  const usrToUse = () => {
    let url =
      process?.env?.NODE_ENV === "production" // Set this to your site URL in production env.
        ? process?.env?.NEXT_PUBLIC_VERCEL_URL // Automatically set by Vercel.
        : "http://localhost:3000/discussions";
    // Make sure to include `https://` when not localhost.
    url = url?.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url?.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  return (
    <div>
      <div className="flex flex-col justify-center mt-2 xl:mt-5 w-[75vw] mobile:max-sm:w-[95%]">
        <div className="flex items-center gap-4 text-white">
          <Image src={"/logo.png"} width={50} height={50} alt={""}></Image>
          <p>WHATSAPP WEB</p>
        </div>

        <div className="bg-white  mobile:max-sm:ml-2 flex flex-col justify-center w-full p-20 mobile:max-sm:p-5 mt-8 rounded drop-shadow">
          <h2 className="text-center text-gray-900 text-2xl">
            Welcome to Waxchat
          </h2>
          <p className="text-center text-slate-500 mt-2">
            A chat app that permits you to chat with your relatives
          </p>

          <GoogleButton />

          {/* <div className="w-1/2 hover:cursor-pointer">
            <div id="g_id_onload"
              data-client_id="743181202305-k56gg7eego9at61g95m28u9aikihnltv.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="popup"
              data-callback="handleSignInWithGoogle"
              data-login_uri="https://xkwspfurbsmpwwazlkmu.supabase.co/auth/v1/callback"
              data-auto_prompt="false">
            </div>

            <div className="g_id_signin "
              data-type="standard"
              data-shape="pill"
              data-theme="outline"
              data-text="signin_with"
              data-size="large"
              data-locale="en-US"
              data-logo_alignment="left">
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
