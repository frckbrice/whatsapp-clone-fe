import Image from "next/image";
import React from "react";

export default function Message() {
  return (
    <div className=" bg-white rounded-lg ">
      <div>
        <div className=" px-3 py-2 text-[#111b21]">
          <div className=" inline-flex max-w-full text-[12.8px] font-[500] text-[#b4876e]">
            <span className=" pr-1 block min-w-[8ch] flex-1 overflow-ellipsis whitespace-nowrap overflow-hidden before:~ ">
              {" "}
              Sender name{" "}
            </span>{" "}
            <span className="text-[11px] block whitespace-nowrap fle  font-[400] text-[#667781]">
              Sender phone number or email address
            </span>{" "}
          </div>
          {/* <div className=" -ml-[2px] m-0 p-0 border-spacing-0 text-[#111b21]">
            <span className=" text-[#8696a0] inline-block align-top  ">
              {" "}
              <Image
                src={"forward-arrow.png"}
                alt="forward-arrow"
                sizes="30"
              />{" "}
            </span>
            <span className=" italic text-[11px] align-top">transfered</span>
          </div> */}
          <p>content</p>
          <div></div>
        </div>
      </div>
    </div>
  );
}
