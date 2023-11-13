"use client";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Avatar from "../Avatar";
import { useWhatSappContext } from "@/components/context";
import { useWhatSappContactContext } from "../context/Context";

type Props = {
  children: React.ReactElement;
  // title: string;
};

const ShowProfilePicture = (props: Props) => {
  const { setShowPPicture } = useWhatSappContext();

  return (
    <div className="relative w-[100vw] h-screen bg-whatsappimg border-r border-r-gray-300 z-0 cursor-pointer overflow-hidden">
      <div className="flex items-center bg-bgGray max-h-16 justify-between w-full h-max-5 px-5 pr-10 py-2 ">
        <div className="flex gap-3 w-full cursor-pointer">
          <Avatar
            onClick={() => {}}
            profilePicture="https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg"
            size={10}
          />
          <div>
            <h4 className="text-gray-700">David Beckamp</h4>
            <p className="text-gray-500 text-xs">(+801) 365 145 269</p>
          </div>
        </div>

        <div className="flex gap-5">
          <button
            className="text-2xl text-gray-600"
            onClick={() => setShowPPicture(false)}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default ShowProfilePicture;
