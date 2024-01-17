"use client";
// import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Pulsation from "./component/PulseLoader";
import { LOCAL_STORAGE } from "@/utils/service/storage";

const Signupb = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async () => {
    setIsLoading(true);
    const googleUser = JSON.parse(
      localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || "{}"
    );
    const { data } = await supabase.from("user").select("email");
    let res = data?.filter((i) => i.email === googleUser?.user?.email);
    console.log(res);
    if (res?.length === 1) {
      setIsLoading(false);
      LOCAL_STORAGE.save("email", googleUser?.user?.email);
      setSuccess("Welcome back 🙂");
      router.push("/discussions");

      return;
    }
    if (res?.length === 0) {
      LOCAL_STORAGE.save("email", googleUser?.user?.email);
      const { data, error } = await supabase.from("user").insert({
        email: googleUser?.user.email,
        name: googleUser?.user.displayName,
        image: googleUser?.user.photoURL,
        phone: googleUser?.user.phoneNumber,
      });
      if (error) console.log("an error occured while sending user", error);
      console.log("data from DB", data);
      router.push("/discussions");
      setIsLoading(false);
    }
  };

  return (
    <div className=" mt-56 flex flex-col gap-4 items-center justify-center text-center">
      <h1 className="text-3xl -translate-y-3 font-extrabold text-white font-serif ">
        Welcome to <span className="text-4xl"> WAXCHAT</span> WEB
      </h1>
      <h4 className="mt-16 mb-6 font-bold text-[25px] text-gray-950">
        Read our <span className="text-themecolor">Privacy Policy</span>. Tap
        'Agree and Continue' to accept the{" "}
        <span className="text-themecolor">Terms of Service</span>
      </h4>
      <button
        onClick={() => handleInputChange()}
        className={`${
          isLoading ? "border-none" : "border  border-green-400"
        } p-4 px-5 text-[20px] font-extrabold text-black rounded w-fit h-auto flex justify-center items-center ${
          success ? "hidden" : ""
        }`}
      >
        {isLoading ? <Pulsation /> : "Agree and Continue"}
      </button>

      {success && (
        <div className="text-2xl mt-6 font-extrabold text-themecolor flex flex-col gap-10">
          <p>{success} </p>
          <div>
            <Pulsation />
          </div>
        </div>
      )}
    </div>
  );
};
export default Signupb;
