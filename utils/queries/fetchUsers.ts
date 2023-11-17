import { supabase } from "../supabase/client";

const fetchUsers = async () => {
  const { data, error } = await supabase.from("user").select();
  // console.log(data)
  // console.log(typeof data)
  if (error) console.log(error);
  if (data) {
    // console.log("users: ", data);
  }

  return data;
};
export default fetchUsers;
