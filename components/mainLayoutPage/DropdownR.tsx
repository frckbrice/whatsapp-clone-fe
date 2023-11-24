import React, { forwardRef } from "react";
import { TbFileDescription } from "react-icons/tb";
import { MdPhotoLibrary } from "react-icons/md";
import { AiFillCamera } from "react-icons/ai";
import { FaUserLarge } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { WiStars } from "react-icons/wi";

export interface IAppProps {}

const DropDownR = forwardRef<HTMLUListElement>((props, ref) => {
  console.log("in the drop d");

  return (
    <ul
      ref={ref}
      className="absolute mb-80 py-2 w-[250px] bg-white shadow-xl  delay-7000 transform transition-duration-10000   translate-x-12 -scale-20  ease-in-out rounded-[16px] font-sans font-medium"
    >
      <li className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center ">
        <TbFileDescription
          size={23}
          className=" bg-[#edecee] text-[#8544bd] w-6"
        />{" "}
        <span className="ml-2">Document</span>
      </li>
      <li className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center">
        <MdPhotoLibrary size={25} className=" bg-white text-[#2250cf]" />
        <span className="ml-2">Photos and Videos</span>
      </li>
      <li className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center">
        <AiFillCamera size={25} className=" bg- text-[#ff2a58] " />{" "}
        <span className="ml-2">Camera</span>
      </li>
      {/* <li className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center">
        <FaUserLarge size={22} className=" bg-white text-[#4a64cb] " />{" "}
        <span className="ml-2">Contact</span>
      </li>
      <li className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center">
        <FontAwesomeIcon
          icon={faSquarePollHorizontal}
          style={{ width: 23, height: 23 }}
          className=" text-[#ff8c00]"
        />
        <span className="ml-2">Survey</span>
      </li>
      <li className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center">
        <WiStars size={23} className=" bg-[#20c997] text-white rounded-md" />{" "}
        <span className="ml-2">New sticker</span>
      </li> */}
    </ul>
  );
});

export default DropDownR;
