"use client";

import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useProfileContext } from "../context/profileContext";
import { useWhatSappContactContext } from "../context/Context";

type Props = {
  title: string;
  children: React.ReactElement;
};

const CreateGrt = ({ title, children }: Props) => {
  // const [openCreateGroup, setOpenCreateGroup] = useState<boolean>(true);

  const { showCreateGroup, setShowCreateGroupe } = useProfileContext();

  return (
    <div
      className={
        showCreateGroup
          ? "profil w-[25vw] inline-block text-[#3b4a54] bg-bgGray transition duration-1000 ease-in-out py-0 fixed top-0 left-0 z-30"
          : " profiloff hidden"
      }
    >
      <div className=" flex items-center bg-[#008069] h-32  gap-10 w-full py-2  px-10">
        <button
          className="text-2xl py-5 font-bold text-gray-600"
          onClick={() => setShowCreateGroupe(false)}
        >
          <AiOutlineArrowLeft size={25} className=" text-[#e7e8e9] " />
        </button>
        <p className=" text-[#e7e8e9] text-[20px]">{title}</p>
      </div>
      {children}
    </div>
  );
};

export default CreateGrt;
