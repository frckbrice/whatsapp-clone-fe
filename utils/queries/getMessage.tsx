import { Message } from "postcss";
import { supabase } from "../supabase/client";
import { getReceivedMessages } from "./getReceivedMessage";

export const getMessages = async (sender_id: string, receiver_id?: string) => {
  const messages: any = (await getReceivedMessages(
    sender_id,
    receiver_id
  )) as any[];

  const { data, error } = await supabase.from("messages").select("*").match({
    sender_id: sender_id,
    receiver_id: receiver_id,
  });

  if (error) return;

  // console.log("this is received messages: ", messages);
  if (data) {
    // console.log("this is sent messages: ", data);
    if (sender_id !== receiver_id) return shuffleArr([...data, ...messages]);

    return data;
  }
};

export const shuffleArr = (arr: any[]) => {
  if (arr.length <= 1) return arr;
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
