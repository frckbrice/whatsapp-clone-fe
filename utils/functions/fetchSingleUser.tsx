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
    }
    return data
  }
  export default fetchSingleUser