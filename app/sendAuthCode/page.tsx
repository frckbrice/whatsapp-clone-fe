import { Supabase } from "@supabase/supabase-js";
import React, { useState } from "react";
import { generateAuthCode } from "../generateAuthCode";
// import { generateCode } from "./generateCode"

export async function sendAuthCode() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const generatecode = await generateAuthCode(email);
    generatecode;
  };

  const code = generateAuthCode();

  const { error } = await Supabase.auth.sendMagicLinkEmail(email, {
    code,
  });

  if (error) {
    throw error;
  }

  return (
    <div>
      <h1>Generate code</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-teal-300">
        Generate code
      </button>
    </div>
  );
}
