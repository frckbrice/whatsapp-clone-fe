import React from "react";
import Card from "../Card";
import { RiPencilFill } from "react-icons/ri";

type Props = {};

const ProfilePageContent = (props: Props) => {
  return (
    <div>
      {/** *  add use profile image and profile name here */}
      <Card image="https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg" />

      <div className=" flex flex-col gap-2 w-full px-7 py-5 border-y border-y-gray-200 shadow-zinc-200 bg-white">
        <span className=" text-[#667781]">Your name</span>
        <div className=" flex justify-between">
          <span className=" text-[#3B4A54]">David Beckamp </span>
          <span className=" italic text-[10px] font-thin text-black">
            <RiPencilFill size={20} color="#3B4A54" />
          </span>
        </div>
      </div>
      <div className=" px-10 pt-4 pb-5">
        <p>
          this is not your username but the one that will be visible to other
          users.
        </p>
      </div>
    </div>
  );
};

export default ProfilePageContent;
