"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import GoogleButton from "./atoms/googlebtn";

const Signup = () => {
  const [email, setEmail] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("")
  const router = useRouter()

  if (typeof localStorage === "undefined") return

  useEffect(() => {
    const localEmail: any = localStorage.getItem("email")
    if (localEmail) {
      router.push('/discussions')
    }
  }, [])

  const signup = async (e: any) => {
    e.preventDefault();
    if (email === "") {
      setError("Please enter your email")
      return;
    } else {
      let expression: any = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
      let regularExp = new RegExp(expression);
      if (!email.match(regularExp)) {
        console.log("invalid email address")
        setError('Invalid email address')

      } else {
        const { data } = await supabase.from("user").select("email");
        let res = data?.filter((i) => i.email === email);
        console.log(res);
        if (res?.length === 1) {
          localStorage.setItem("email", email)
          setSuccess("Welcome back 🙂")
          router.push('/discussions')
          return
        }
        // new email not in DB
        if (res?.length === 0) {
          const { error, data } = await supabase.auth.signInWithOtp({ email });

          if (error) {
            setError('Something went wrong')
            console.log('error from supabase', error);
            return
          }
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
        }
      }
    }
  };

  async function handleSignInWithGoogle(response: { credential: any; }) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
      nonce: 'NONCE', // must be the same one as provided in data-nonce (if any)
    })
  }


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
            <p className="text-center">{success}</p>
            <button
              // onClick={() => signup()}
              type="submit"
              className="bg-secondry w-20 py-2 text-sm text-white rounded"
            >
              NEXT
            </button>
            <GoogleButton />

          </form>
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
export default Signup