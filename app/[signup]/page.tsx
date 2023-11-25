"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

const Signupb = () => {
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);

  const handleInputChange = async () => {
    setIsloading(true);
    const googleUser = JSON.parse(localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || '{}')

    localStorage.setItem("email", JSON.stringify(googleUser.user.email))

    const { data, error } = await supabase.from("user").insert({
      email: googleUser.user.email,
      name: googleUser.user.user_metadata.name,
      image: googleUser.user.user_metadata.picture,
      phone: googleUser.user.identities.phone,
    });

    if (error) console.log('an error occured while sending user', error)
    
      console.log('data from DB', data)
    
    router.push('/discussions')
    setIsloading(false)
  };

  return (
    <div className=" mt-56 items-center justify-center text-center">
      <h1 className="text-3xl font-extrabold text-white font-serif">Welcome to WAXCHAT WEB</h1>
      <h4 className="mt-8 mb-6 font-bold text-xl text-gray-950">Read our <span className="text-themecolor">Privacy Policy</span>. Tap 'Agree and Continue' to accept the <span className="text-themecolor">Terms of Service</span></h4>
      <button
      onClick={() => handleInputChange()}
      className="border p-4 px-5 text-base font-extrabold text-black rounded"
      >
        Agree and Continue
      </button>
    </div>
  );
};

export default Signupb;
