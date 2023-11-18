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
import fetchSingleRoom from "@/utils/queries/fetchSingleRoom";

type Props = {
  className?: string;
  users: User[];
  setReceiver: React.Dispatch<React.SetStateAction<User | undefined>>;
  setRoomObject: (room: User) => void;
  // setUserObject: (user: User) => void
};

const DirectMessage = React.memo(
  ({ className, users, setReceiver, setRoomObject }: Props) => {
    const [target, setTarget] = useState("");
    // to style the select room

    const { setStart } = useWhatSappContext();
    const { openProfile } = useProfileContext();

    const handleDirectMessage = async (id: string) => {
      console.log(id);
      let data: User = await fetchSingleUser(id);
      console.log("test after fetchsingleUser");
      console.log(data);
      setReceiver(data);
      setStart(true);
      setTarget(id);
      let room: User = await fetchSingleRoom(id);
      setRoomObject(room);
      console.log("single room object", room);
    };

    const handleClick = () => {
      console.log("avatar");
    };

    return (
      <div className={` ${openProfile ? "hidden" : className} `}>
        {users && (
          <div className="flex gap-2 p-0 w-full h-[85vh] flex-col">
            {users?.map((item: any) => (
              <div
                onClick={() => handleDirectMessage(item.id)}
                key={item.id}
                className={
                  target === item.id
                    ? "bg-gray-300 flex w-full justify-between border-b border-slate-100 py-1 gap-5 hover:cursor-pointer px-4 items-center "
                    : "flex w-full justify-between border-b border-slate-100  gap-5 hover:bg-gray-100 hover:cursor-pointer px-4 py-1 items-center "
                }
              >
                <div className="flex items-center gap-3 ">
                  <Avatar
                    onClick={() => handleClick()}
                    profilePicture={
                      item.image !== ""
                        ? `${item.image}`
                        : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    }
                    size={10}
                    className="my-auto"
                  />
                  <div className="leading-2 ">
                    {item.name !== "" ? (
                      <p className="py-1 text-[#111011] font-medium">
                        {item.name}
                      </p>
                    ) : (
                      <p className="py-1 text-[#111011] font-medium">
                        {item.email}
                      </p>
                    )}

                    <span className="py-8 text-[14px]">
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
  }
);
export default DirectMessage;
