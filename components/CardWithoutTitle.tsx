import React from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

type Props = {
  image: string;
};

const CardWithoutTitle = (props: Props) => {
  return (
    <>
      <div className="relative w-full flex flex-col hover:opacity-100   gap-2   justify-center items-center py-8 mx-auto border-b border-b-gray-200 bg-bgGray z-0 ">
        <Image
          src={props.image}
          alt="Avatar image"
          width={200}
          height={200}
          className=" bg-cover bg-center object-cover cardprofil w-44 h-44 rounded-full"
        />
        <div
          className="overlay w-44 h-44 absolute  rounded-full cursor-pointer  opacity-0 transition duration-500 hover:opacity-100  ease-in-out hover:bg-slate-700/70  hover:backdrop-brightness-75  "
          title="change the profile picture"
        >
          <div className="w-44 h-44 rounded-full absolute bottom-0 hover:opacity-100 opacity-0 ">
            <div className=" absolute left-16 top-12 flex flex-col justify-center items-center ">
              <span className=" -translate-x-6">
                <FaCamera size={25} className="text-[#ffffff] " />{" "}
              </span>
              <span className="text-[#ffffff] text-[12px] font-semibold w-24">
                CHANGE PROFIL PICTURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardWithoutTitle;
