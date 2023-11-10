import React from "react";
import Image from "next/image";

const Signup = () => {
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
            signup to whatsapp by entering your email acount
          </p>
          <form action="" className="flex flex-col mt-5 gap-5 items-center">
            <input
              className="w-60 mx-auto border border-slate-200 p-2 rounded outline-1 outline-secondry"
              type="email"
              placeholder="youremail@gmail.com"
            />
            <button className="bg-secondry w-20 py-2 text-sm text-white rounded">
              NEXT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
