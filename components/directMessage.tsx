"use client";
import React, { useState } from "react";
import Avatar from "@/components/Avatar";
import fetchSingleUser from "@/utils/queries/fetchSingleUser";
import { User } from "@/type";
import { useWhatSappContext } from "./context";
import { useProfileContext } from "./context/profileContext";
import fetchSingleRoom from "@/utils/queries/fetchSingleRoom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { updateReadMessageStatus } from "../utils/queries/updateReadMessageStatus";

import { useWhatSappContactContext } from "./context/Context";

type Props = {
  className?: string;
  users: User[];
  setReceiver: React.Dispatch<React.SetStateAction<User | undefined>>;
  setRoomObject: (room: User) => void;
  setRecipient: React.Dispatch<React.SetStateAction<User | undefined>>;

  currentUserRoomId: string;
};

const DirectMessage = ({
  className,
  users,
  setReceiver,
  setRoomObject,

  setRecipient,

  currentUserRoomId,
}: Props) => {
  // to style the select room
  const [target, setTarget] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  const { setShowPPicture } = useWhatSappContext();

  dayjs.extend(relativeTime);

  // console.log(users);

  const { setStart } = useWhatSappContext();
  const { setOpenContactInfo } = useWhatSappContactContext();
  const { openProfile } = useProfileContext();

  const handleDirectMessage = async (user_id: string) => {
    setOpenContactInfo(false);
    console.log(user_id);
    let data: User = (await fetchSingleUser(user_id)) as User;
    console.log("test after fetchsingleUser", data);

    setRecipient(data);
    setClicked((prev) => !prev);
    setStart(true);
    setTarget(user_id);
    let room: User = (await fetchSingleRoom(user_id)) as User;
    setRoomObject(room);
    setReceiver(room);
    console.log("single room object", room);

    await updateReadMessageStatus(user_id, currentUserRoomId as string);
  };

  function handleClick() {
    setShowPPicture(true);
  }

  console.log(users);

  return (
    <div className={` ${openProfile ? "hidden" : className} `}>
      {users.length ? (
        <div className="flex gap-2 p-0 w-full h-[85vh] flex-col">
          {users
            ?.sort(
              (user1: any, user2: any) => user1.updated_at - user2.updated_at
            )
            .map((discussion: any, i) => {
              return (
                <div
                  onClick={() => handleDirectMessage(discussion.user_id)}
                  key={i}
                  className={
                    target === discussion.user_id
                      ? "bg-gray-300 flex w-full justify-between border-b border-slate-100 py-1 gap-1 hover:cursor-pointer px-4 items-center "
                      : "flex w-full justify-between border-b border-slate-100  gap-1 hover:bg-gray-100 hover:cursor-pointer px-4 py-1 items-center "
                  }
                >
                  <div className="flex items-center gap-3 ">
                    <Avatar
                      onClick={() => handleClick()}
                      profilePicture={
                        discussion.image !== ""
                          ? `${discussion.image}`
                          : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                      }
                      size={10}
                      className="my-auto"
                    />
                    <div className="leading-2 ">
                      {discussion.name !== "" ? (
                        <h6 className="py-1 text-sm text-[#212021] ">
                          {discussion.name}
                        </h6>
                      ) : (
                        <p className="py-1 text-xs text-[#111011] font-normal">
                          {discussion.email}
                        </p>
                      )}

                      <span className="py-8 text-[14px]">
                        {discussion?.last_message}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-[70px]">
                    <span className="mx-auto text-[#1FA855]">
                      {dayjs().to(dayjs(discussion?.updated_at))}
                    </span>
                    <span
                      className={` p-[5px] w-6 h-6 min-w-fit min-h-fit rounded-full  ${
                        discussion.unread_count ? "opacity-100" : "opacity-0"
                      }   bg-[#25c460] text-white text-[14px] font-[SF Pro Text] flex justify-center items-center`}
                    >
                      {discussion.unread_count ?? 0}
                    </span>
                    {/* <button
                  className="hover:bg-gray-300 rounded-full w-fit self-center"
                  onClick={() => removeMember(item.id)}
                >
                  <IoIosClose size={20} />
                </button> */}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default React.memo(DirectMessage);
