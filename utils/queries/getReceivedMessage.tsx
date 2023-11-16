import { supabase } from "../supabase/client";

export const getReceivedMessages = async (
  sender_id: string,
  receiver_id?: string
) => {
  const { data, error } = await supabase.from("messages").select("*").match({
    sender_id: receiver_id,
    receiver_id: sender_id,
  });

  if (error) return;

  if (data) {
    // sendingMessages = [...sendingMessages, data];
    console.log("this is messages: ", data);
    return data;
  }
};
