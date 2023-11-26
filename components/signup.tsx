"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import GoogleButton from "./atoms/googlebtn";

const Signup = () => {
  if (typeof localStorage === "undefined") return;

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
        </div>
      </div>
    </div>
  );
};

export default Signup;
