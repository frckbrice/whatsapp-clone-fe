"use client"
import Image from "next/image"
import React, { useEffect } from "react"
import Avatar from "./Avatar"
import { supabase } from "@/utils/supabase/client"
import fetchUsers from "@/utils/fetchUsers"

type users = {
  email?: string,
  name?: string,
  image?: string,
  phone?: number,
  id?: string,
  onClick?: () => void
}

const DirectMessage = ({ email, name, onClick, id }: users) => {
  let users: any

  const handleClick = () => { }

  return (
    <div>
      <div onClick={onClick} className="flex pl-4 pr-2 gap-4">
        <Avatar
          onClick={() => handleClick()}
          profilePicture="https://files.123freevectors.com/wp-content/original/503847-beautiful-south-african-girl-portrait.jpg"
          size={10}
        />
        <div className="border-b-2">
          <p>{email}</p>
          {/* <span>{}</span> */}
        </div>

      </div>

    </div>
  )
}
export default DirectMessage
