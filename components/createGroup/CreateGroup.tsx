"use client";
import fetchUsers from "@/utils/queries/fetchUsers";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Avatar from "../Avatar";
import { IoIosClose } from "react-icons/io";

const CreateGroup = () => {
  const [users, setUsers] = useState<Array<{}>>([]);

  useEffect(() => {
    fetchUsers().then((data) => {
      if (data) setUsers(data);
    });
    console.log("data: ", users);
  }, []);
  function handleDirectMessage(id: any): void {
    alert(`you clicked on: ${id}`);
  }

  return (
    <div className="bg-white h-[100vh] w-[25vw] relative">
      <div>
        <div className="w-full">
          {/* <div className="flex items-center text-white pt-14 text-lg gap-5 pl-5 pb-5 bg-themecolor">
            <button>
              <FaArrowLeft />
            </button>{" "}
            <p>Add group members</p>
          </div> */}
        </div>
        <div className="px-5 pt-5">
          <div className="flex bg-gray-200 gap-2 w-fit pr-1 items-center rounded-full text-slate-500">
            <Avatar
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              profilePicture={
                "https://hips.hearstapps.com/hmg-prod/images/african-baby-girl-holding-flower-royalty-free-image-1676500153.jpg?crop=1.00xw:0.344xh;0,0.189xh&resize=1200:*"
              }
              size={5}
            />
            <p className="text-xs">Joynel</p>
            <button>
              <IoIosClose size={20} />
            </button>
          </div>
          <input
            className="w-full border-b outline-none p-2"
            type="search"
            placeholder="search name or number"
          />
        </div>
        <div className="px-3 h-[60vh] overflow-scroll">
          {users && (
            <div className="flex gap-2 w-full flex-col ">
              {users?.map((item: any) => (
                <div
                  onClick={() => handleDirectMessage(item.id)}
                  key={item.id}
                  className="flex w-full justify-between border-b border-slate-100 leading-4 gap-5 hover:bg-gray-100 hover:cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <Avatar
                      onClick={() => handleDirectMessage}
                      profilePicture="https://hips.hearstapps.com/hmg-prod/images/african-baby-girl-holding-flower-royalty-free-image-1676500153.jpg?crop=1.00xw:0.344xh;0,0.189xh&resize=1200:*"
                      size={10}
                      className="my-auto"
                    />
                    <div className=" py-4 leading-2">
                      <p className="py-1 text-[#111011] font-medium">
                        {item.email}
                      </p>
                      <span className="py-8 text-[14px]">
                        Lorem, ipsum dolor sit amet .
                      </span>
                      {/* <hr/> */}
                    </div>
                  </div>
                  {/* <span className="mt-5">11:30</span> */}
                </div>
              ))}
            </div>
          )}
          <div className="flex pl-4 pr-2 gap-4">
            <div className="border-b-2">
              <p></p>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
