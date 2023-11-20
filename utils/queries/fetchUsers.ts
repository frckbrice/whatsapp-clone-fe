import { supabase } from "../supabase/client";
import fetchUserGoups from "./fetchAllUserGroups";
import fetchGroupsOfSingleUser from "./fetchGroupsOfSingleUser";
import { shuffleArr } from "./getMessage";
import insertUsersInRooms from "./insertUsersInRooms";

const fetchUsers = async (id: string) => {
  const { data, error } = await supabase.from("user").select();
  if (error) return [];

  const groups = await Promise.all((await fetchUserGoups(id)) as any[]);
  // console.log("user groups: ", groups.flat());
  // console.log("users: ", data);

  const value = [...groups.flat(), ...data];
  // console.log("user and  groups: ", value);
  const newList = shuffleArr(value);
  console.log("user and  groups: ", {
    merged: newList,
    data: data,
    groups: groups.flat(),
  });
  const usersInRoomTable = await insertUsersInRooms(newList);
  // console.log(usersInRoomTable.flat().filter(Boolean));
  return {
    merged: usersInRoomTable.flat().filter(Boolean),
    data: data,
    groups: groups.flat(),
  };
};
export default fetchUsers;
