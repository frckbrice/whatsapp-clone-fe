"use client";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import { MdGroups2 } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import DropDown from "./mainLayoutPage/DropDown";
import HeaderMainPageL from "./mainLayoutPage/HeaderPage";

const dropdownRight = ["contact infos", " select messages", "close discussions","mute notifications","ephemeral messages","remove the discussion","report","to block" ]
const dropdownLeft = [" new group","new community", "important messages","select dicussion","parameters","disconnect"]


const Discossions = () => {
  
  const [showDropdrownright, setShowDropdownright] = useState<boolean>(false);


  return (
    <div className="flex w-full">
      <div className="bg-white w-[30vw] h-screen">
        <div>
          {/* <div className="flex items-center max-h-16 justify-between bg-bgGray w-full h-max-5 px-3 py-2 border-r">
            <Avatar
              onClick={() => alert("clicked")}
              profilePicture="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
              size={10}
            />

            <div className="flex gap-5">
              <button className="text-2xl text-gray-600">
                <MdGroups2 />
              </button>
              <button className="text-2xl text-gray-600 relative rounded-full" onClick={()=>setShowDropdownleft(prev => !prev)}>
                <HiDotsVertical />
              </button>
              {showDropdrownleft &&  <DropDown dropdownList ={dropdownLeft} />}
            </div>
          </div> */}
          <HeaderMainPageL/>
          <div></div>
        </div>
      </div>
      <div className="w-[70vw] bg-[url('https://w0.peakpx.com/wallpaper/557/521/HD-wallpaper-whatsapp-v-background-doodle-pattern-patterns-whatsapp-thumbnail.jpg')]">
        <div className="flex items-center bg-bgGray max-h-16 justify-between w-full h-max-5 px-3 py-2 ">
          <div className="flex gap-3">
            <Avatar
              onClick={() => alert("clicked")}
              profilePicture="https://avatars.githubusercontent.com/u/106551910?v=4"
              size={10}
            />
            <div>
              <h3 className="text-gray-700">Colins</h3>
              <p className="text-gray-500 text-xs">+2374568457</p>
            </div>
          </div>

          <div className="flex gap-5">
            <button className="text-2xl text-gray-600">
              <GoSearch />
            </button>
            <button className="text-2xl text-gray-600" onClick={()=> setShowDropdownright(prev => !prev)}>
              <HiDotsVertical />
            </button>
            {/* {showDropdrownright && <DropDown dropdownList ={dropdownRight} />} */}
          </div>
        </div>

        <form
          action=""
          className="flex items-center bg-bgGray h-[] fixed bottom-0 w-full py-2 px-4 gap-5"
        >
          <IoMdAdd className="text-2xl text-gray-700" />
          <div className="flex bg-white items-center rounded-md gap-5 p-1">
            <BsEmojiSmile className="text-2xl text-gray-700" />
            <input
              type="text"
              className="w-[57vw] my-2 outline-none text-gray-600"
              placeholder="Type a message"
            />
          </div>
          <button className="text-2xl ">
            <IoSendSharp />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Discossions;
