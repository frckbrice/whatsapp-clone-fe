import { Group } from "@/type"
import { supabase } from "../supabase/client"

const getAllGroupsPerUser = async (groups: Group[]) => {
  
  const allGroups = groups?.map(async (grp) => {
    const { data, error } = await supabase
    .from("rooms")
    .select()
    .eq('id', grp.room_id)
    .single()

    if (error) console.log('could not fetch group of user', error)
    if (data) {
      console.log('this is group', data)
      return data
    }
  })
  return allGroups
}
export default getAllGroupsPerUser