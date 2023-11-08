import { supabase } from "@supabase/supabase-js";

export const generateAuthCode = async () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 8; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }

  return code;
};

export const sendAuthCode = async (email: string, code: string) => {
  const { data, error } = await supabase.auth.sendMagicLinkEmail(email, code);
  if (error) {
    console.error(error);
    return false;
  }

  return true;
};

export const verifyAuthCode = async (email: string, code: string) => {
  const { data, error } = await supabase.auth.verifyMagicLinkEmail(email, code);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
};

export default {
  generateAuthCode,
  sendAuthCode,
  verifyAuthCode,
};
