"use client"
import React from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { setDefaultResultOrder } from "dns";

const Signup = () => {
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState('')

  const signup = async (e: any) => {
    e.preventDefault()
    if (!email) {
      return
    }
    // const { data, error } = supabase.auth.setSession({
    //   access_token,
    //   refresh_token
    // })
    const { error, data } = await supabase.auth.signInWithOtp({ email })

    if (error) console.log(error)
    if (data) {
      console.log(data)
      localStorage.setItem('email', email)
      setSubmitted(true)
    }
    if (submitted) {
      console.log("check your email address")
      return (
        <div>
          <h1 className="text-center bg-red-600">Please check your email to signup</h1>
        </div>
      )
    }


  }

  return (
    <div>
      <div className="flex flex-col justify-center xl:mt-5 w-[75vw] mobile:max-sm:w-[95%]">
        <div className="flex items-center gap-4 text-white">
          <Image src={"/logo.png"} width={50} height={50} alt={""}></Image>
          <p>WHATSAPP WEB</p>
        </div>
        <div className="bg-white mobile:max-sm:ml-2 flex flex-col justify-center w-full p-20 mobile:max-sm:p-5 mt-8 rounded drop-shadow">
          <h2 className="text-center text-gray-900 text-2xl">
            Enter your email
          </h2>
          <p className="text-center text-slate-500 mt-2">
            signup to whatsapp by entering your email address
          </p>
          <form action="" onSubmit={signup} className="flex flex-col mt-5 gap-5 items-center">
            <input
              className="w-60 mx-auto border border-slate-200 p-2 rounded outline-1 outline-secondry"
              type="email"
              placeholder="youremail@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-red-600">{error}</p>
            <button
              // onClick={() => signup()}
              type="submit"
              className="bg-secondry w-20 py-2 text-sm text-white rounded">
              NEXT
            </button>
          </form>
          {submitted ? <p className="text-center">Please check out your email</p> : ""}

        </div>
      </div>
    </div>
  );
};

export default Signup;
