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
import {
  dropdownRight,
  dropdownLeft,
} from "../utils/data/mainpageDropdownLists";
import DropDownR from "./mainLayoutPage/DropdownR";
import { useWhatSappContext } from "@/components/context";
import SideNavRight from "./RightSideBar/SideNavRight";
import SearchField from "./RightSideBar/SearchField";
import {
  FollowingMessagesSimple,
  ReceiverMessages,
  SenderMessages,
} from "./mainLayoutPage/Message";

const Discossions = () => {
  const [showDropdrownleft, setShowDropdownleft] = useState<boolean>(false);
  const [showDropdrownright, setShowDropdownright] = useState<boolean>(false);
  // const [showDropdrownleft, setShowDropdownleft] = useState<boolean>(false);
  const [showDropdrownBottonL, setShowDropdrownBottonL] =
    useState<boolean>(false);

  const { setOpenSideNav, openSideNav } = useWhatSappContext();

  const dropdownRef = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdownleft(false);
      setShowDropdownright(false);
      setShowDropdrownBottonL(false);
    }
  };

  useEffect(() => {
    if (ref.current !== null)
      ref.current.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  return (
    <div className="flex w-full">
      <div className="bg-white w-[25vw] h-screen">
        <div>
          <div className="flex items-center max-h-16 justify-between bg-bgGray w-full h-max-5 px-3 py-2 border-r">
            <Avatar
              onClick={() => alert("clicked")}
              profilePicture="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
              size={10}
            />

            <div className="flex gap-5">
              <button className="text-2xl text-gray-600">
                <MdGroups2 />
              </button>
              <button
                className="text-2xl text-gray-600 relative rounded-full"
                onClick={() => setShowDropdownleft((prev) => !prev)}
              >
                <HiDotsVertical />
              </button>

              {showDropdrownleft && (
                <DropDown dropdownList={dropdownLeft} ref={dropdownRef} />
              )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div
        ref={ref}
        className={
          openSideNav
            ? "relative w-[50vw] bg-whatsappimg border-r border-r-gray-300 z-0"
            : "relative w-[75vw] bg-whatsappimg z-0  "
        }
      >
        <div className="flex items-center bg-bgGray max-h-16 justify-between w-full h-max-5 px-3 py-2 ">
          <div className="flex gap-3">
            <Avatar
              onClick={() => alert("clicked")}
              profilePicture="/alexander-shatov-_whatsapp-unsplash.jpg"
              size={10}
            />
            <div>
              <h3 className="text-gray-700">add name here</h3>
              <p className="text-gray-500 text-xs">email or phone number</p>
            </div>
          </div>

          <div className="flex gap-5">
            <button
              className="text-2xl text-gray-600"
              onClick={() => setOpenSideNav(true)}
            >
              <GoSearch />
            </button>
            <button
              className="text-2xl text-gray-600"
              onClick={() => setShowDropdownright((prev) => !prev)}
            >
              <HiDotsVertical />
            </button>
            {showDropdrownright && (
              <DropDown dropdownList={dropdownRight} ref={dropdownRef} />
            )}
          </div>
        </div>

        <div className="relative flex flex-col justify-between mt-3 px-10">
          <div className="flex flex-col items-start w-[50%]">
            <ReceiverMessages />
            <FollowingMessagesSimple />
          </div>

          <div className="absolute right-0 flex-1 pr-10">
            <SenderMessages />
          </div>
        </div>

        <div
          className={
            openSideNav
              ? "  w-[50vw] flex items-center bg-bgGray h-[] fixed bottom-0 py-2 px-5 gap-5"
              : "w-[75vw] flex items-center bg-bgGray h-[] fixed bottom-0 py-2 px-5 gap-5"
          }
        >
          {showDropdrownBottonL && <DropDownR ref={dropdownRef} />}
          <BsEmojiSmile className="text-2xl text-gray-700" />
          <button
            type="button"
            onClick={() => {
              setShowDropdrownBottonL((prev) => !prev);
              console.log("clicked third");
            }}
            className={
              showDropdrownBottonL
                ? " bg-zinc-400 rounded-full transition-opacity-1 duration-150 ease-in"
                : "w-fit -rotate-45"
            }
          >
            <IoMdAdd
              className={
                showDropdrownBottonL
                  ? "text-2xl m-2 text-gray-900 rotate-45 transition-opacity-1 duration-150 ease-in"
                  : "text-2xl m-2 text-gray-700 -rotate-45"
              }
            />
          </button>

          <div className="flex bg-white items-center rounded-md gap-5 p-1 w-full">
            <input
              type="text"
              className="w-full my-2 outline-none text-gray-600 px-3 "
              placeholder="Type a message"
            />
          </div>
          <button className="text-2xl ">
            <IoSendSharp />
          </button>
        </div>
      </div>
      <SideNavRight>
        <SearchField />
      </SideNavRight>
    </div>
  );
};

export default Discossions;
