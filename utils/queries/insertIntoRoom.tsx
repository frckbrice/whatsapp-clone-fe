import { User } from "@/type";
import { supabase } from "../supabase/client";

const insertIntoRooms = async (user: User) => {
  // console.log(typeof users)
  // console.log(users);

  if (user.name !== "" && user.id !== "") {
    const { data, error } = await supabase
      .from("rooms")
      .upsert(
        {
          name: user.name,
          image: user.image,
          status: false,
        },
        {
          onConflict: "user_id, name, image",
        }
      )
      .match({ user_id: user.id })
      .select();
    if (error) {
      console.log("could not post users in room", error);
      return;
    }
    if (data) {
      // console.log("this is data from insert data", data);
      return data[0];
    }
  }
};
export default insertIntoRooms;
