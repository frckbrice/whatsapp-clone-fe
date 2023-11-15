import { supabase } from "../supabase/client";

export const getReceiveMessage = async (id: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("content")
    .eq("receiver_id", id);

  if (error) return;

  console.log(data);
  return data;
};
