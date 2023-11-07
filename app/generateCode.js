import { Supabase } from "@supabase/supabase-js";

export async function generateCode(email) {
  // create a new Supabase client
  const supabase = new Supabase({
    url: process.env.Supabase,
    publicKey: process.env.SUAPABASE_PUBLIC_KEY,
    privateKey: process.env.SUAPABASE_PRIVATE_KEY,
  });

  // generate a random 8-characters code.
  const code = Math.random().toString(36).substring(7);

  // Insert the code into the supabase database
  const { error } = await supabase.from("codes").insert({
    code,
    email,
  });

  if (error) {
    throw error;
  }

  // Return the code
  return code;
}
