"use client";
import fetchUsers from "@/utils/queries/fetchUsers";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Avatar from "../Avatar";
import { IoIosClose } from "react-icons/io";
import { LOCAL_STORAGE } from "@/utils/service/storage";

// icon imports
import { FaCircleArrowRight } from "react-icons/fa6";
import GroupSetup from "./GroupSetup";
import { supabase } from "@/utils/supabase/client";
import { User } from "@/type";

type Props = {
  currentUser: User;
  users: User[];
};

//  interface User {
//    created_at: string;
//    email: string;
//    id: string;
//    image: string;
//    name: string;
//    phone: null;
//  }

const CreateGroup = ({ users, currentUser }: Props) => {
  // const [users, setUsers] = useState<Array<{}>>([]);
  const [members, setMembers] = useState<Array<User>>(
    LOCAL_STORAGE.get("group_members") || []
  );

  // const currentUser = LOCAL_STORAGE.get("sender") || {};
  const [membersID, setMembersId] = useState<Array<string>>([]);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [groupSetup, setGroupSetup] = useState(true);

  useEffect(() => {
    LOCAL_STORAGE.save("group_members", []);
    setMembers([]);
  }, []);

  // Add group members
  function handleDirectMessage(member: any) {
    if (members.find((user) => user.id === member.id)) {
      console.log("aready added");
      return;
    }

    let selectedMember = members;
    selectedMember.push(member);

    LOCAL_STORAGE.save("group_members", selectedMember);
    setMembers(LOCAL_STORAGE.get("group_members"));
    selectedMember = [];
    // setShowNextBtn()

    console.clear();
    console.log("you clicked on: ", member);

    const subscribeUser = supabase
      .channel(`group_:${currentUser.id}`)
      .subscribe(member.id);
    if (subscribeUser)
      console.log("user successfully subscribed to channel: ", subscribeUser);
  }

  console.log("group menbers from state", members);

  // Remove a group member
  const removeMember = (id: string) => {
    const filteredMembers = members.filter((member) => member.id !== id);
    setMembers(filteredMembers);
    LOCAL_STORAGE.save("group_members", filteredMembers);
  };

  const openGroupSetup = () => {
    setGroupSetup((prev) => !prev);
  };

  return (
    <>
      {!groupSetup ? (
        <GroupSetup />
      ) : (
        <div className="bg-white h-[100vh] w-[25vw] absolute">
          <div>
            <div className="px-5 pt-5">
              <div className="flex w-full flex-wrap gap-2">
                {members.map((member) => (
                  <div className="flex bg-gray-200 gap-2 w-fit pr-1 items-center rounded-full text-slate-500">
                    <Avatar
                      onClick={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                      profilePicture={
                        member.image !== ""
                          ? `${member.image}`
                          : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                      }
                      size={5}
                    />
                    {member.name !== "" ? (
                      <p className="py-1 text-slate-500 text-xs">
                        {member.name}
                      </p>
                    ) : (
                      <p className="py-1 text-slate-500 text-xs">
                        {member.email}
                      </p>
                    )}
                    <button onClick={() => removeMember(member.id as string)}>
                      <IoIosClose size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <input
                className="w-full border-b outline-none p-2"
                type="search"
                placeholder="search name or number"
              />
            </div>
            <div></div>
            <div className="px-3 h-[60vh] overflow-scroll">
              {users && (
                <div className="flex gap-2 w-full flex-col ">
                  {users?.map((item: any) => (
                    <div
                      onClick={() => handleDirectMessage(item)}
                      key={item.id}
                      className="flex w-full justify-between border-b border-slate-100 leading-4 gap-5 hover:bg-gray-100 hover:cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <Avatar
                          onClick={() => handleDirectMessage}
                          profilePicture={
                            item.image !== ""
                              ? `${item.image}`
                              : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                          }
                          size={10}
                          className="my-auto"
                        />
                        <div className=" py-4 leading-2">
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-center items-center w-full p-3 relative bottom-0 left-0">
                <button className="text-themecolor" onClick={openGroupSetup}>
                  <FaCircleArrowRight size={40} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroup;
