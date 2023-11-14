"use client";

import Image from "next/image";
import React from "react";
type AvatarProps = {
  onClick: () => void;
  profilePicture: string;
  size: number;
  className?: string
};

const Avatar = ({ onClick, profilePicture, size, className }: AvatarProps) => {
  return (
    <div className={className}>
      <button
      onClick={onClick}
      style={{ backgroundImage: `url(${profilePicture})`, width: `${size*5}px`, height: `${size*5}px` }}
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
    </div>
  );
};

export default Avatar;
