import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import CardWithoutTitle from "../CardWithoutTitle";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRegLaugh } from "react-icons/fa";

type Props = {};

const ProfilePageContent = (props: Props) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showInput1, setShowInput1] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>("David Beckamp");
  const [profileDescription, setProfileDescription] = useState<string>("");

  return (
    <div className=" p-0 bg-bgGray text-[14px] h-full">
      {/** *  add use profile image and profile name here */}
      <CardWithoutTitle image="https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg" />

      <div className=" rest">
        <div className=" flex flex-col gap-2 w-full pl-7 pr-0 py-5  shadow shadow-zinc-200 bg-white">
          <span className=" text-[#33a033]">Your name</span>
          <div className=" flex justify-between">
            {!showInput1 ? (
              <span
                className=" italic text-[10px] font-thin text-black cursor-pointer"
                onClick={() => setShowInput1((prev) => !prev)}
              >
                <RiPencilFill size={25} color="#54656f" />
              </span>
            ) : (
              <div className=" flex justify-between items-center pb-[5px] border-solid border-b-2 border-b-[#778086]">
                <input
                  type="text"
                  className="inputprofile w-full pl-0 px-2 py-0 text-[#242f36] text-md focus:outline-none focus:ring-none focus:border-none"
                  onChange={(e) => setProfileDescription(e.target.value)}
                  value={profileName}
                />
                <div className=" flex justify-center items-center text-[#778086]">
                  <span className=" mr-2 cursor-pointer">
                    <FaRegLaugh size={23} />
                  </span>
                  <span className=" mr-0 cursor-pointer">
                    <AiOutlineCheck size={23} />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-bgGray px-7 pt-4 pb-5">
          <p>
            this is not your username but the one that will be visible to other
            users.
          </p>
        </div>
        <div className=" flex flex-col gap-4 w-full px-7 py-5 shadow shadow-zinc-200 bg-white">
          <span className=" text-[#33a033]">Infos</span>

          {!showInput ? (
            <span
              className=" italic text-[10px] font-thin text-black cursor-pointer"
              onClick={() => setShowInput((prev) => !prev)}
            >
              <RiPencilFill size={25} color="#54656f" />
            </span>
          ) : (
            <div className=" flex justify-between items-center pb-[5px] border-solid border-b-2 border-b-[#778086]">
              <input
                type="text"
                className="inputprofile w-full pl-0 px-2 py-0 text-[#242f36] text-md focus:outline-none focus:ring-none focus:border-none"
                onChange={(e) => setProfileName(e.target.value)}
                value={profileDescription}
              />
              <div className=" flex justify-center items-center text-[#778086]">
                <span className=" mr-2 cursor-pointer">
                  <FaRegLaugh size={23} />
                </span>
                <span className=" mr-0 cursor-pointer">
                  <AiOutlineCheck size={23} />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContent;
