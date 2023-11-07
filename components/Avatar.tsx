"use client";

import Image from "next/image";
import React from "react";
type AvatarProps = {
  onClick: () => void;
  profilePicture: string;
  size: number;
};

const Avatar = ({ onClick, profilePicture, size }: AvatarProps) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundImage: `url(${profilePicture})` }}
      className={`bg-cover bg-center object-fill rounded-[50%] h-${size} w-${size}`}
    >
      {/* <Image
        src={dp}
        width={50}
        height={50}
        alt={""}
        className="rounded-full object-"
      /> */}
    </button>
  );
};

export default Avatar;
