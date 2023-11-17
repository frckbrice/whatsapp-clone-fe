"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import { supabase } from "@/utils/supabase/client";
import fetchUsers from "@/utils/queries/fetchUsers";
import fetchSingleUser from "@/utils/queries/fetchSingleUser";
import { User } from "@/type";
import fetchSingleRoom from "@/utils/queries/fetchSingleRoom";

type Props = {
  className?: string;
  users: {}[];
  roomObject?: User
  setRoomObject: (room: User) => void
  setUserObject: (user: User) => void
};

const DirectMessage = React.memo(({ className, users, setRoomObject, setUserObject }: Props) => {
  // const [users, setUsers] = useState<Array<{}>>([]);

  // // let users: any
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data, error } = await supabase.from("user").select();
  //     // console.log(data)
  //     console.log(typeof data);
  //     if (error) console.log(error);
  //     if (data) {
  //       setUsers(data);
  //       // users = data
  //       console.log(data);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  // console.log("these are all users", users);

  const handleDirectMessage = async (id: string) => {
    const reciever: User = JSON.parse(localStorage.getItem('reciever') || '{}')
    // console.log(reciever.id)
    console.log(id);
    let room: User = await fetchSingleRoom(id)
    setRoomObject(room)
    let data: User = await fetchSingleUser(id);
    setUserObject(data)
    console.log("single room object", room)
    console.log("single user object", data);
  };

  const handleClick = () => {
    console.log("avatar");
  };

  return (
    <div className={className}>
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
                  onClick={() => handleClick()}
                  profilePicture={(item.image !== '') ? `${item.image}` : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
                  size={10}

                  className="my-auto"
                />
                <div className=" py-4 leading-2">
                  {(item.name !== '') ? <p className="py-1 text-[#111011] font-medium">
                    {item.name}
                  </p> : <p className="py-1 text-[#111011] font-medium">
                    {item.email}
                  </p>}

                  <span className="py-8 text-[14px]">
                    Lorem, ipsum dolor sit amet .
                  </span>
                  {/* <hr/> */}
                </div>
              </div>
              <span className="mt-5">11:30</span>
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
  );
});
export default DirectMessage;
