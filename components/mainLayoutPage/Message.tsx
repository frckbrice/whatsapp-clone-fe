import Image from "next/image";
import React from "react";

export function SenderMessages() {
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

        <p> This is a box with some content and an arrow at the top right.</p>
      </div>
    </div>
  );
}
{
  /* {showEmojie && <EmojiPicker />} */
}
export function ReceiverMessages() {
  return (
    <div className="box arrow-left">
      <div className=" py-0 text-[#111b21]">
        <div className=" inline-flex max-w-full text-[12.8px] font-[500] text-[#b4876e] item-center">
          <span className=" pr-1 block min-w-[8ch] flex-1 overflow-ellipsis whitespace-nowrap overflow-hidden before:~ ">
            {" "}
            John doe{" "}
          </span>{" "}
          <span className="text-[11px] block whitespace-nowrap fle  font-[400] text-[#667781]">
            (+141)26354256698
          </span>{" "}
        </div>

        <p> This is a box with some content and an arrow at the top left.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et corrupti
          exercitationem quidem voluptas nulla inventore consequuntur illo autem
          odio atque reiciendis incidunt quos impedit suscipit, sapiente
          aspernatur placeat laboriosam. Fugiat! Maxime tempora rem ducimus non.
        </p>
      </div>
    </div>
  );
}

export function FollowingMessagesSimple() {
  return (
    <div className="box align-left">
      <p> This is a box with some content and an arrow at the top left.</p>
    </div>
  );
}
