"use client";

import React from "react";
interface AvatarProps {
  onClick: () => void;
  dp: string;
  size: number;
}

const Avatar = ({ onClick, dp, size }: AvatarProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-cover bg-center rounded-[50%] h-${size} w-${size} bg-[url('${
        dp || ""
      }')]`}
    ></button>
  );
};

export default Avatar;
