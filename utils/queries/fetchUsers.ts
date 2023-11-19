import { supabase } from "../supabase/client";
import fetchUserGoups from "./fetchAllUserGroups";
import fetchGroupsOfSingleUser from "./fetchGroupsOfSingleUser";
import { shuffleArr } from "./getMessage";

const fetchUsers = async (id: string) => {
  const { data, error } = await supabase.from("user").select();
  if (error) return [];

  const groups = await Promise.all((await fetchUserGoups(id)) as any[]);
  console.log("user groups: ", groups);
  console.log("users: ", data);

  const newList = shuffleArr([...groups, ...data]);
  console.log("user and  groups: ", newList);
  return newList;
};
export default fetchUsers;
