import { User } from "@/type";
import { supabase } from "../supabase/client";

const insertUsersInRooms = async (users: User[]) => {
  console.log(typeof users)
  console.log(users)
  const sendUsers = users?.map(async (user) => {
    if (user.name !== "") {
      const { data, error } = await supabase
        .from("rooms")
        .insert({ name: `${user.name}` })
        .select();
      if (error) {
        console.log("could not post users in room", error)
        return
      };
      if (data) {
        console.log('this is data from insert data', data)
        return data
      };
    }

  });

  console.log("sendUSers: ", sendUsers);
  return sendUsers;
};
export default insertUsersInRooms;
