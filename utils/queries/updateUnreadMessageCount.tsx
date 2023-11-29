import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

export const updateUnreadMessageCount = async (
  sender_id: string,
  receiver_room_id: string,
  insert: boolean,
  content?: string
) => {
  let guardContent: string = "",
    senderid = "",
    receiver_id = "",
    last_unread_count = 0,
    unreadMessages: PostgrestSingleResponse<null>;

  const { data, error } = await supabase
    .from("unread_messages")
    .select("*")
    .match({ sender_id: sender_id, receiver_room_id: receiver_room_id })
    .single();

  
 if(insert){
    console.log("encore du test mais accepted , content: " + content);
    unreadMessages = await supabase.from("unread_messages").upsert(
      {
        sender_id: sender_id,
        receiver_room_id: receiver_room_id,
        unread_count: !data ? 1 :  data.unread_count + 1,
        last_message: content,
      },
      {
        onConflict: "sender_id, receiver_room_id ",
    
      }
    );

    return unreadMessages;
  }

  
};
