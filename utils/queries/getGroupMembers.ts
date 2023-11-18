import { supabase } from "../supabase/client";

export const getGroupMembers = async (groupId: string) => {
  try {
    const { data } = await supabase
      .from("roomuser")
      .select("user_id")
      .eq("room_id", groupId);

    if (data) {
      console.log(" the members of the group: ", data);
      return data;
    }
  } catch (error) {
    if (error) console.log("error fetching the group members: ", error);
  }
};
