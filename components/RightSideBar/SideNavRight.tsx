"use client";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Avatar from "../Avatar";
import { useWhatSappContext } from "@/app/context";

type Props = {
  children: React.ReactElement;
};

const SideNavRight = (props: Props) => {
  // const ref = useRef<HTMLDivElement>(null);/

  const { openSideNav, setOpenSideNav } = useWhatSappContext();

  const handleClose = () => {
    setOpenSideNav(false);
  };

  return (
    <div
      className={
        openSideNav
          ? "w-[25vw] inline-block text-[#3b4a54] bg-white transition duration-500 ease-in-out py-0"
          : "hidden w-0"
      }
      // ref={ref}
    >
      <div className=" flex items-center bg-bgGray h-16  gap-10 w-full py-2  px-10">
        <button
          className="text-2xl py-5 font-bold text-gray-600"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
        <p>Search for messages</p>
      </div>
      {props.children}
    </div>
  );
};

export default SideNavRight;
