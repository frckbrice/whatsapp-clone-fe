import React, { useEffect, useState } from "react";
import fetchSingleUser from "@/utils/queries/fetchSingleUser";
import { supabase } from "@/utils/supabase/client";
import Avatar from "../Avatar";
import { BsArrowLeft } from "react-icons/bs";

type Props = {
  className?: string;
  users: {}[];
  email: string;
  visible: any;
};

const Searchcontactpage = React.memo(
  ({ visible }: any, { className, users }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    console.log(users);

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
      setHasMounted(true);
    }, []);
    if (!hasMounted) return null;

    console.log("these are all users", users);

    // const insertUsersInRooms = async () => {
    //   const { data, error } = await supabase.from("rooms").insert([{}]);
    // };

    const handleDirectMessage = async (id: string) => {
      console.log(id);
      let data: Object = await fetchSingleUser(id);
      console.log(data);
    };

    const handleClick = () => {
      console.log("avatar");
    };
    return (
      <div>
        <div className="bg-teal-500 w-full h-10 ">
          <BsArrowLeft />
        </div>
        <input
          type="text"
          placeholder="Search for users"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div>
          {users && (
            <div className="flex gap-2 w-full flex-col ">
              {users
                .filter((item) => {
                  return searchTerm.toLocaleLowerCase() === ""
                    ? item
                    : item.email.toLocaleLowerCase().includes(searchTerm);
                })
                ?.map((item: any) => (
                  <div
                    onClick={() => handleDirectMessage(item.id)}
                    key={item.id}
                    className="flex w-full justify-between border-b border-slate-100 leading-4 gap-5 hover:bg-gray-100 hover:cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <Avatar
                        onClick={() => handleClick()}
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
      </div>
    );
  }
);

export default Searchcontactpage;
