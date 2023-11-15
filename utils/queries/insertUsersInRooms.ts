import { User } from "@/type";
import { supabase } from "../supabase/client";

const insertUsersInRooms = async (users: User[]) => {
  const sendUsers = users?.map(async (user) => {
    const { data, error } = await supabase
      .from("rooms")
      .insert({ name: `${user.name}` })
      .select();
    if (error) return;
    if (data) return data;
  });

  console.log("sendUSers: ", sendUsers);
  return sendUsers;
};
export default insertUsersInRooms;
