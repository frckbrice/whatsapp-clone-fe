import { supabase } from "../supabase/client";

const fetchRooms = async () => {
  const { data, error } = await supabase
    .from("rooms")
    .select();
  if (error) console.log("could not fetch all rooms", error);
  if (data) {
    console.log("rooms data: ", data);
    localStorage.setItem('allRooms', JSON.stringify(data))
  }

  return data;
};
export default fetchRooms;
