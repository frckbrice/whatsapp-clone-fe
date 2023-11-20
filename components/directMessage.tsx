"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import { supabase } from "@/utils/supabase/client";
// import fetchUsers from "@/utils/queries/fetchUsers";
import fetchSingleUser from "@/utils/queries/fetchSingleUser";
import { PartRoomUser, User, Group, Room } from "@/type";
import { useWhatSappContext } from "./context";
import { useProfileContext } from "./context/profileContext";
import fetchSingleRoom from "@/utils/queries/fetchSingleRoom";
import fetchGroupsOfSingleUser from "@/utils/queries/fetchGroupsOfSingleUser";
import getAllGroupsPerUser from "@/utils/queries/getAllGroups";
import { AiOutlineConsoleSql } from "react-icons/ai";

import { IoIosClose } from "react-icons/io";

type Props = {
  className?: string;
  users: User[];
  groups: Group[];
  setReceiver: React.Dispatch<React.SetStateAction<User | undefined>>;
  setRoomObject: (room: User) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setRecipient: React.Dispatch<React.SetStateAction<User>>;
};

const DirectMessage = ({
  className,
  users,
  setReceiver,
  setRoomObject,
  setUsers,
  groups,
  setRecipient,
}: Props) => {
  // to style the select room
  const [target, setTarget] = useState("");
  const [fetchedGroups, setFetchedGroups] = useState<Promise<any> | undefined>()

  // console.log(users);

  const { setStart } = useWhatSappContext();
  const { openProfile } = useProfileContext();

  // console.log("avatar");

  let allGroups: any

  // let combinedArray = [...users, ...groups]
  // console.log("cmbien arrays", combinedArray)
  // const com = groups.concat(users)

  const handleDirectMessage = async (id: string) => {
    console.log(id);
    let data: User = await fetchSingleUser(id);
    // console.log("test after fetchsingleUser");
    // console.log(data);
    setRecipient(data);
    setStart(true);
    setTarget(id);
    let room: Room = (await fetchSingleRoom(id)) as Room;
    setRoomObject(room);
    // setReceiver(data);
    console.log("single room object", room);
  };

  const handleClick = () => {

    console.log("avatar");
  };


  const removeMember = (id: string) => {
    const filteredMembers = users.filter((member) => member.id !== id);
    setUsers(filteredMembers);
  };

  return (
    <div className={` ${openProfile ? "hidden" : className} `}>
      {users.length ? (
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
                    Hey there i'm using whatsapp.
                  </span>
                </div>
              </div>
              <div>
                <span className="">
                  {item?.updated_at.split("T")[1].split(".")[0].slice(0, 5)}
                </span>
                <button onClick={() => removeMember(item.id)}>
                  <IoIosClose size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {/* <div className="flex pl-4 pr-2 gap-4">
        <div className="border-b-2">
          <p></p>
          <span></span>
        </div>
      </div> */}
    </div>
  );
};
export default React.memo(DirectMessage);
