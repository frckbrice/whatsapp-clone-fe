"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import Avatar from "@/components/Avatar"
import { supabase } from "@/utils/supabase/client"
import fetchUsers from "@/utils/queries/fetchUsers"

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
    <div className="bg-red-400 ">
      {users && (
        <div className="flex gap-2 flex-col w-full">
          {users?.map((item: any) => (
            <div
              onClick={() => console.log(item.id)}
              key={item.id}
              className="flex leading-4 w-full gap-5 px-3 hover:bg-gray-100 hover:cursor-pointer">
              <Avatar
                onClick={() => handleClick()}
                profilePicture="https://files.123freevectors.com/wp-content/original/503847-beautiful-south-african-girl-portrait.jpg"
                size={10}
                className="my-auto"
              />
              <div className="border-b border-slate-100 py-4 leading-2">
                <p className="py-1 font-semibold">{item.email}</p>
                <span className="py-8">Lorem, ipsum dolor sit amet .</span>
                {/* <hr/> */}
              </div>
              <span className="mt-5">11:30</span>
            </div>
          ))}
        </div>
      )}
      <div
        className="flex pl-4 pr-2 gap-4">

        <div className="border-b-2">
          <p></p>
          <span></span>
        </div>

      </div>

    </div>
  )
}
export default DirectMessage
