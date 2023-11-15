// populate the room table with all the users

import { supabase } from "../supabase/client"
import fetchUsers from "./fetchUsers"


const postUsersOnRoom = async () => {
  const users: any = await fetchUsers()
  const { data, error } = await supabase
    .from('rooms')
    .insert([{}])
  
  
}