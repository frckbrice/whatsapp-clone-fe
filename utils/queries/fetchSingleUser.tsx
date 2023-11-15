import { supabase } from "../supabase/client"

const fetchSingleUser = async (id: string) => {
  const { data, error } = await supabase
    .from('user')
    .select()
    .eq('id', id)
    .single()

  if (error) console.log(error)
  if (data) {
    console.log(data)
    localStorage.setItem('reciever', JSON.stringify(data)) // sending the reciever object to the local storage after a click

  }
  return data
}
export default fetchSingleUser