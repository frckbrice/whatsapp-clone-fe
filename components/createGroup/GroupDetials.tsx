"use client";
import {
  getGroupMembers,
  getMembersInGroup,
} from "@/utils/queries/getGroupMembers";
import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { Message, PartRoomUser, Room, Roomuser, User, Group } from "@/type";
import { supabase } from "@/utils/supabase/client";
import { getAllUsers } from "@/utils/queries/getAllUser";
import Avatar from "../Avatar";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import { IoMdClose } from "react-icons/io";
import { VscPassFilled } from "react-icons/vsc";

type Props = {
  children?: React.ReactElement[];
  roomObject?: Room;
};

interface UserObject {
  created_at: string;
  email: string;
  id: string;
  image: string;
  name: string;
  phone: string | null;
  created_by: string;
}

const GroupDetials = ({ roomObject }: Props) => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [groupMember, setGroupMembers] = useState<Array<UserObject>>([]);
  const [currentUser, setCurrentUser] = useState();
  const [openCard, setOpenCard] = useState(false);
  const [userData, setUserData] = useState<Array<User>>([]);
  const [members, setMembers] = useState<Array<User>>(
    LOCAL_STORAGE.get("group_members") || []
  );

  const fetchAllUsers = async () => {
    const { data, error } = await supabase.from("user").select();
    if (data) {
      setUsers(data);
      setUserData(data);
      // console.log("this are all users", data);
      return data;
    }
  };

  useEffect(() => {
    fetchAllUsers();
    getMembersInGroup(roomObject?.id as string)
      .then(async (membersIds) => {
        if (membersIds?.length) {
          // setMemberid(memberid);
          // console.clear();
          // console.log("the member of selected group: ", membersIds);

          const { data, error } = await supabase
            .from("user")
            .select()
            .in("id", membersIds);
          if (data) {
            setGroupMembers(data);
            console.log("group members#######", data);
          }
        }
      })
      .catch((err: any) => {
        if (err instanceof Error) console.error(err);
      });
    setCurrentUser(LOCAL_STORAGE.get("sender").id);
    LOCAL_STORAGE.save("group_members", []);
    setMembers([]);
    // console.log("groupMembers: ", getGroupMembers);
  }, []);

  // handleAddToGroup

  const handleAddToGroup = (item: User) => {};

  const handleFilter = (event: { target: { value: any } }) => {
    const searchName = event.target.value;

    const newFilter = users.filter((user) => {
      return user.name.toLowerCase().includes(searchName.toLowerCase());
    });
    if (newFilter.length === 0 || searchName === "") {
      setUserData(users);
    }
    setUserData(newFilter);
  };

  return (
    <div className="relative">
      {!openCard && (
        <div className="flex flex-col bg-white">
          <p className="m-4">{groupMember.length} Members</p>
          <button
            onClick={() => setOpenCard((prev) => !prev)}
            className="hover:bg-slate-200 flex items-center p-4 gap-2"
          >
            <span className="bg-themecolor text-white p-2 rounded-[50%]">
              <IoMdPersonAdd size={25} />
            </span>
            Add member
          </button>

          {groupMember?.map((user, index) => (
            <div key={index} className="flex justify-between p-4">
              <div className="flex gap-3">
                <Avatar
                  profilePicture={user.image}
                  onClick={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  size={8}
                />
                <p>{user.name}</p>
              </div>
              <div>
                <p
                  className={`${
                    user.id === user.created_by ? "visible" : "hidden"
                  } bg-[#e7fce3] h-5 px-2 text-xs rounded items-center text-[#2f652b]`}
                >
                  Group Admin
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {openCard && (
        <>
          <div className=" w-full">
            <div>
              <div className="bg-[#008069] flex p-4 gap-3 items-center w-full text-white">
                <button onClick={() => setOpenCard((prev) => !prev)}>
                  <IoMdClose size={20} />
                </button>
                <p className="text-md">Add Members</p>
              </div>
            </div>
            <input
              className="w-full border-b outline-none p-2"
              type="search"
              placeholder="search name or number"
              onChange={handleFilter}
            />
          </div>
          <div className="add-user px-3 h-[60vh]  overflow-auto">
            {users && (
              <div className="flex gap-2 w-full flex-col ">
                {userData?.map((item: any) => (
                  <div
                    onClick={() => handleAddToGroup(item)}
                    key={item.id}
                    className="flex w-full justify-between border-b border-slate-100 leading-4 gap-5 hover:bg-gray-100 hover:cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <Avatar
                        onClick={() => handleAddToGroup(item)}
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
          </div>
        </>
      )}
      <button className=" text-themecolor absolute top-80 right-0">
        <VscPassFilled size={50} />
      </button>
    </div>
  );
};

export default GroupDetials;
