import Image from "next/image";
import React from "react";

type Props = {
  content: string;
};

export default function SenderMessages({ content }: Props) {
  return (
    <div className="box arrow-right ">
      <div className=" py-0 text-[#111b21]">
        <div className=" inline-flex max-w-full text-[12.8px] font-[500] text-[#b4876e] item-center ">
          <span className=" pr-1 block min-w-[8ch] flex-1 overflow-ellipsis whitespace-nowrap overflow-hidden before:~ ">
            {" "}
            John doe
          </span>{" "}
          <span className="text-[11px] block whitespace-nowrap fle  font-[400] text-[#667781]">
            (+141)26354256698
          </span>{" "}
        </div>

        <p> {content}</p>
      </div>
    </div>
  );
}
