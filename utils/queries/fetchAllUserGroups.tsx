import { supabase } from "../supabase/client";

const fetchGoups = async () => {
  let { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("status", true);

  if (error) console.log("could not fetch all group ", error);
  if (data) {
    console.log("rooms data: ", data);
    localStorage.setItem("grupMember", JSON.stringify(data));
  }

  return data;
};
export default fetchGoups;
