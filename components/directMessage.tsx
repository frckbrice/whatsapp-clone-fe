"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import { supabase } from "@/utils/supabase/client";
import fetchUsers from "@/utils/queries/fetchUsers";
import fetchSingleUser from "@/utils/queries/fetchSingleUser";
import { User } from "@/type";
import { useWhatSappContext } from "./context";
import { useProfileContext } from "./context/profileContext";

type Props = {
  className?: string;
  users: User[];
  setReceiver: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const DirectMessage = React.memo(({ className, users, setReceiver }: Props) => {
  const [target, setTarget] = useState("");
  // console.log("these are all users", users);

  const { setStart } = useWhatSappContext();
  const { openProfile } = useProfileContext();

  const handleDirectMessage = async (id: string) => {
    console.log(id);
    let data: User = await fetchSingleUser(id);
    console.log(data);
    setReceiver(data);
    setStart(true);
    setTarget(id);
  };

  const handleClick = () => {
    console.log("avatar");
  };

  return (
    <div className={` ${openProfile ? "hidden" : className} `}>
      {users && (
        <div className="flex gap-2 p-0 w-full flex-col">
          {users?.map((item: any) => (
            <div
              onClick={() => handleDirectMessage(item.id)}
              key={item.id}
              className={
                target === item.id
                  ? "bg-gray-100 flex w-full justify-between border-b border-slate-100 py-1 gap-5 hover:cursor-pointer px-4 items-center "
                  : "flex w-full justify-between border-b border-slate-100  gap-5 hover:bg-gray-100 hover:cursor-pointer px-4 py-1 items-center "
              }
            >
              <div className="flex items-center gap-3 ">
                <Avatar
                  onClick={() => handleClick()}
                  profilePicture="https://hips.hearstapps.com/hmg-prod/images/african-baby-girl-holding-flower-royalty-free-image-1676500153.jpg?crop=1.00xw:0.344xh;0,0.189xh&resize=1200:*"
                  size={10}
                  className="my-auto"
                />
                <div className="  leading-2 font-serif">
                  <p className=" text-[#111011] font-medium">{item.email}</p>
                  <span className=" text-[14px]">
                    Lorem, ipsum dolor sit amet .
                  </span>
                  {/* <hr/> */}
                </div>
              </div>
              <span className="">
                {item.updated_at.split("T")[1].split(".")[0]}
              </span>
            </div>
          ))}
        </div>
      )}
      {/* <div className="flex pl-4 pr-2 gap-4">
        <div className="border-b-2">
          <p></p>
          <span></span>
        </div>
      </div> */}
    </div>
  );
});
export default DirectMessage;
