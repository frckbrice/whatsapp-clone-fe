import React from "react";
import Image from "next/image";

type Props = {
  image: string;
};

const CardWithoutTitle = (props: Props) => {
  return (
    <div className="cardprofil w-full flex flex-col gap-2   justify-center items-center py-8 mx-auto border-b border-b-gray-200 bg-bgGray">
      <Image
        src={props.image}
        alt="Avatar image"
        width={300}
        height={200}
        className=" w-48 h-40 rounded-full hover:bg-[#3B4A54] "
      />
    </div>
  );
};

export default CardWithoutTitle;
