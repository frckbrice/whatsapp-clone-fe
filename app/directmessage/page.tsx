"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import Avatar from "@/components/Avatar"
import { supabase } from "@/utils/supabase/client"
import fetchUsers from "@/utils/fetchUsers"

const DirectMessage = () => {
  const [users, setUsers] = useState<Array<{}>>([])

  // let users: any
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('user')
        .select()
      // console.log(data)
      console.log(typeof data)
      if (error) console.log(error)
      if (data) {
        setUsers(data)
        // users = data
        console.log(data)
      }
    }
    fetchUsers()
    console.log(users)
  }, [])


  const handleClick = () => {
    fetchUsers()
  }

  return (
    <div>
      {users && (
        <div>
          {users?.map((item: any, index: number) => (
            <div key={index}>
              <p>{item.email}</p>
              <span>{item.id} </span>
            </div>
          ))}
        </div>
      )}
      <div
        className="flex pl-4 pr-2 gap-4">
        <Avatar
          onClick={() => handleClick()}
          profilePicture="https://files.123freevectors.com/wp-content/original/503847-beautiful-south-african-girl-portrait.jpg"
          size={10}
        />
        <div className="border-b-2">
          <p></p>
          <span></span>
        </div>

      </div>

    </div>
  )
}
export default DirectMessage
