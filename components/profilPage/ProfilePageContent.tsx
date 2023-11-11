import React from "react";
import { RiPencilFill } from "react-icons/ri";
import CardWithoutTitle from "../CardWithoutTitle";

type Props = {};

const ProfilePageContent = (props: Props) => {
  return (
    <div className=" p-0 bg-bgGray text-[14px]">
      {/** *  add use profile image and profile name here */}
      <CardWithoutTitle image="https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg" />

      <div className=" flex flex-col gap-2 w-full px-7 py-5  shadow shadow-zinc-200 bg-white">
        <span className=" text-[#33a033]">Your name</span>
        <div className=" flex justify-between">
          <span className=" text-[#3B4A54]">David Beckamp </span>
          <span className=" italic text-[10px] font-thin text-black">
            <RiPencilFill size={25} color="#3B4A54" />
          </span>
        </div>
      </div>
      <div className="bg-bgGray px-7 pt-4 pb-5">
        <p>
          this is not your username but the one that will be visible to other
          users.
        </p>
      </div>
      <div className=" flex flex-col gap-5 w-full px-7 py-5 shadow shadow-zinc-200 bg-white">
        <span className=" text-[#33a033]">Infos</span>

        <span className=" italic text-[10px] font-thin text-black">
          <RiPencilFill size={25} color="#54656f" />
        </span>
      </div>
    </div>
  );
};

export default ProfilePageContent;
