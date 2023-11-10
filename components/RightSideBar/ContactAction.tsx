import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { IoBan } from "react-icons/io5";
import { BiSolidDislike } from "react-icons/bi";

type Props = {};

const ContactAction = (props: Props) => {
  return (
    <div className=" flex flex-col gap-6 my-6 mb-5 text-[#ff2e74]">
      <div className=" text-md flex gap-5 item-center justify-start">
        {" "}
        <span>
          {" "}
          <IoBan size={25} className=" rotate-90 " />
        </span>{" "}
        <span> To Bloc Verges DKV</span>
      </div>
      <div className=" text-lg flex item-center  justify-start gap-5">
        <span>
          <BiSolidDislike size={25} />{" "}
        </span>{" "}
        <span>Signal Verges DKV</span>{" "}
      </div>
      <div className=" text-lg flex gap-5  justify-start item-center">
        {" "}
        <span>
          <HiOutlineTrash size={25} />{" "}
        </span>{" "}
        <span>delete Verges DKV</span>
      </div>
    </div>
  );
};

export default ContactAction;
