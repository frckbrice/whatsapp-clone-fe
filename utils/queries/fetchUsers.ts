import { supabase } from "../supabase/client";
import fetchGroupsOfSingleUser from "./fetchGroupsOfSingleUser";
import { shuffleArr } from "./getMessage";

const fetchUsers = async (id: string) => {
  const { data, error } = await supabase.from("user").select();
  if (error) return [];

  const groups = await Promise.all(
    (await fetchGroupsOfSingleUser(id)) as any[]
  );

  if (data) {
    const newList = shuffleArr([...groups, ...data]);
    return newList;
  }
};
export default fetchUsers;
