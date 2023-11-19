import { supabase } from "../supabase/client";

const fetchSingleRoom = async (id: string) => {
  console.log(id)
  const { data, error } = await supabase
    .from("rooms")
    .select()
    .eq('user_id', id)
    .single()

  if (error) console.log("error while fetching single room", error)
  if (data) {
    // console.log("Here is single room", data)
    // localStorage.setItem("sender", JSON.stringify(data))
  }
  return data
}
export default fetchSingleRoom