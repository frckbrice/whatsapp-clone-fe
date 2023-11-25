"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { GrSettingsOption } from "react-icons/gr";
import { useParams } from "next/navigation";
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
    const googleUser = JSON.parse(localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || '{}')
    const { data } = await supabase
      .from('user')
      .select("email")
    let res = data?.filter((i) => i.email === googleUser.user.email)
    if (res?.length === 1) {
      LOCAL_STORAGE.save('email', googleUser.user.email)
      setSuccess("Welcome back 🙂")
      router.push('/discussions')
      setIsLoading(false)
      return
    }
    if (res?.length === 0) {
      LOCAL_STORAGE.save('email', googleUser.user.email)
      const { data, error } = await supabase
        .from('user')
        .insert({ email: googleUser.user.email, name: googleUser.user.user_metadata.name, image: googleUser.user.user_metadata.picture, phone: googleUser.user.identities.phone })
      if (error) console.log('an error occured while sending user', error)
      console.log('data from DB', data)
      router.push('/discussions')
      setIsLoading(false)
    }
  };

  return (
    <div>
      <h1>Welcome to Waxchat</h1>
      <h4>A chat app where you can chat with your relatives</h4>
      <button
        onClick={() => handleInputChange()}
        className={isLoading ? "cursor-not-allowed" : "border p-3 bg-red-300"}
      >
        Next
      </button>
    </div>
  );
};

export default Signupb;
