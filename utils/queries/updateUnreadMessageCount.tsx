import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

export const updateUnreadMessageCount = async (
  sender_id: string,
  receiver_room_id: string,
  insert: boolean,
  content?: string
) => {
  console.log("inside the main function");
  const { data, error } = await supabase
    .from("unread_messages")
    .select("*")
    .match({ sender_id: sender_id, receiver_room_id: receiver_room_id })
    .single();

  if (error) console.log(error);

  if (insert) {
    console.log("encore du test mais accepted , content: " + content);
    await supabase.from("unread_messages").upsert(
      {
        sender_id: sender_id,
        receiver_room_id: receiver_room_id,
        unread_count: !data ? 1 : data.unread_count + 1,
        last_message: content,
      },
      {
        onConflict: "sender_id, receiver_room_id ",
      }
    );
  } else console.log("not inserted");
};
