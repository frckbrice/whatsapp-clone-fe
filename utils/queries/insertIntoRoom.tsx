import { User } from "@/type";
import { supabase } from "../supabase/client";

const insertIntoRooms = async (user: User) => {
  // console.log(typeof users)
  // console.log(users);

  if (user.name !== "" && user.id !== "") {
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        name: `${user.name}`,
        user_id: `${user.id}`,
        image: `${user.image}`,
        status: false,
      })
      .select();
    if (error) {
      console.log("could not post users in room", error);
      return;
    }
    if (data) {
      // console.log("this is data from insert data", data);
      return data;
    }
  }
};
export default insertIntoRooms;
