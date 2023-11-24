import { User } from "@/type";
import { supabase } from "../supabase/client";

const fetchSignupUser = async () => {
  const googleUser = JSON.parse(localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || '{}')

  const {data, error} = await supabase
    .from('user')
    .select()
    .eq('email', googleUser.user.email)
    .single()
  if (error) console.log('Error while getting single signup user', error)
  if (data) {
    console.log('here is signup user', data)
    localStorage.setItem('sender', JSON.stringify(data))
  }
  return data[0] as User
}
export default fetchSignupUser