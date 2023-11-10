"use client";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Avatar from "../Avatar";
import Card from "../Card";
import ContactAction from "./ContactAction";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";

type Props = {
  children?: React.ReactElement[];
};

const ContactInfoPage = (props: Props) => {
  return (
    <div className=" flex flex-col space-y-2 pb-10 bg-bgGray">
      <Card
        image="https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg"
        phoneNumber="(+327 6 964 854 325)"
        usernames="Verges DKV"
      />
      <div className=" flex flex-col gap-2 w-full px-10 py-5 border-y border-y-gray-200 shadow-zinc-200 bg-white">
        <span className=" text-[#667781]">Infos</span>
        <span className=" text-[#111b21]">
          enlightened mind{" "}
          <span className=" italic text-[10px] font-thin text-black">
            (user description){" "}
          </span>
        </span>
      </div>
      <div className=" w-full px-10 pr-6 py-4 text-[#667781] bg-white border-y border-y-gray-200 text-[14px] flex justify-between">
        <span> media, links, and documents</span>
        <span>
          {" "}
          <IoIosArrowForward />
        </span>
      </div>

      <div className=" w-full px-10 py-5 bg-white border-y border-y-gray-200">
        <div className=" flex space-x-4  py-5 ">
          {" "}
          <span>
            <AiFillStar size={25} className=" text-[#667781]" />
          </span>{" "}
          <span>Important messages</span>
        </div>
        <hr className="border-b-bgGray" />
        <div className=" flex space-x-4 py-5">
          {" "}
          <span>
            <BsFillBookmarkFill size={25} className="text-[#667781]" />{" "}
          </span>{" "}
          <span> Bookmark</span>
        </div>
      </div>

      <div className=" w-full px-10 py-5 bg-white border-y border-y-gray-200">
        <div>
          {" "}
          <span>Important messages</span>
        </div>
        <div>Message kept</div>
        <div>Mute Notifications</div>
        <div>
          {" "}
          <span>Ephemeral Messages</span>
          <span> 90 days</span>
        </div>
        <div>
          {" "}
          <span>Cyphering</span>
          <span>The messages are end-to-end encrypted. Clic to confirm. </span>
        </div>
      </div>
      <div className=" w-full px-10 py-5 mb-5 bg-white border-y border-y-gray-200">
        <ContactAction />
      </div>
    </div>
  );
};

export default ContactInfoPage;
