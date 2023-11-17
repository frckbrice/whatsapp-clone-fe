"use client";
import React from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { setDefaultResultOrder } from "dns";

const Signup = () => {
  const [email, setEmail] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const signup = async (e: any) => {
    e.preventDefault();
    if (email === "") {
      return;
    } else {
      let expression: any = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
      let regularExp = new RegExp(expression);
      if (email.match(regularExp)) {
        console.log("email match")
        return
      } else {
        return console.log('invalid email a')
      }

      const { data, error } = await supabase.from("user").select("email");
      let res = data?.filter((i) => i.email === email);
      console.log(res);
      if (res?.length === 1) {
        return setError("Email address already exist");
      }
    }

    const { error, data } = await supabase.auth.signInWithOtp({ email });

    if (error) console.log(error);
    if (data) {
      console.log(data);
      setError("");
      localStorage.setItem("email", email);
      setSubmitted(true);
    }
    if (submitted) {
      console.log("check your email address");
      return (
        <div>
          <h1 className="text-center text-green-600">
            Please check your email to signup
          </h1>
        </div>
      );
    }
  };

  const handleTest = () => {
    let expression: any = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    let regularExp = new RegExp(expression);
    console.log(email)
    if (!email.match(regularExp)) {
      console.log("invalid email address")

    } else {
      console.log('valid email')
    }
    console.log('test')
  }

  return (
    <div>
      <div className="flex flex-col justify-center mt-2 xl:mt-5 w-[75vw] mobile:max-sm:w-[95%]">
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
          <form
            action=""
            onSubmit={signup}
            className="flex flex-col mt-5 gap-5 items-center"
          >
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
              className="bg-secondry w-20 py-2 text-sm text-white rounded"
            >
              NEXT
            </button>
          </form>
          <button onClick={() => handleTest()}>
            test
          </button>
          {submitted ? (
            <p className="text-center py-4">Please check out your mail</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
