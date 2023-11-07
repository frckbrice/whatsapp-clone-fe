"use client";
import React from "react";
import Avatar from "./Avatar";
import { MdGroups2 } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

const Discossions = () => {
  return (
    <div className="flex w-full">
      <div className="bg-white w-[30vw] h-screen">
        <div>
          <div className="flex items-center max-h-16 justify-between bg-bgGray w-full h-max-5 px-3 py-2 border-r">
            <Avatar
              onClick={() => alert("clicked")}
              dp="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
              size={10}
            />

            <div className="flex gap-5">
              <button className="text-2xl text-gray-600">
                <MdGroups2 />
              </button>
              <button className="text-2xl text-gray-600">
                <HiDotsVertical />
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="w-[70vw] bg-[url('https://w0.peakpx.com/wallpaper/557/521/HD-wallpaper-whatsapp-v-background-doodle-pattern-patterns-whatsapp-thumbnail.jpg')]">
        <div className="flex items-center max-h-16 justify-between w-full h-max-5 px-3 py-2 ">
          <Avatar
            onClick={() => alert("clicked")}
            dp="https://avatars.githubusercontent.com/u/106551910?v=4"
            size={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Discossions;
