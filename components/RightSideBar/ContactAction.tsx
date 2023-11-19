import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { IoBan } from "react-icons/io5";
import { BiSolidDislike } from "react-icons/bi";
import { User } from "@/type";

type Props = {};

const ContactAction = (props: Props) => {
  const reciever: User = JSON.parse(localStorage.getItem("reciever") || '{}')

  return (
    <div className=" flex flex-col gap-6 mt-6 text-[#ff2e74]">
      <div className=" text-[18px]  text-md flex gap-5 item-center justify-start">
        {" "}
        <span>
          {" "}
          <IoBan size={25} className=" rotate-90 " />
        </span>{" "}
        <span> To Bloc {reciever?.name || ''}</span>
      </div>
      <div className=" text-[18px] flex item-center  justify-start gap-5">
        <span>
          <BiSolidDislike size={25} />{" "}
        </span>{" "}
        <span>Signal {reciever?.name || ''}</span>{" "}
      </div>
      <div className=" text-[18px] flex gap-5  justify-start item-center">
        {" "}
        <span>
          <HiOutlineTrash size={25} />{" "}
        </span>{" "}
        <span>delete {reciever?.name || ''}</span>
      </div>
    </div>
  );
};

export default ContactAction;
