"use client";
import { Message } from "@/type";
import React, { ChangeEvent, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useWhatSappContext } from "../context";

type Props = {
  messageList: Message[];
};

function SearchField({ messageList }: Props) {
  const [changeArrowstate, setChangeArrow] = useState(false);
  const [filteredList, setFilterdList] = useState<Message[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { setMessages } = useWhatSappContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterdList(messageList.slice());

    setChangeArrow(true);
    setSearchText(e.target.value);

    const newMessageList = filteredList?.filter((message) => {
      !searchText.toLowerCase().trim()
        ? message
        : message.content.toLowerCase().includes(searchText.toLowerCase());
    });

    if (newMessageList.length) setMessages(newMessageList);
  };

  return (
    <div className=" text-[#3b4a54] bg-white border-b border-b-gray-100  w-full pr-3 ml-0 py-2 flex items-center ">
      <button
        className=" text-[#54656f] mr-0 translate-x-[36px] focus:outline-none active:outline-none"
        onClick={() => setChangeArrow((prev) => !prev)}
      >
        {changeArrowstate ? (
          <AiOutlineArrowLeft size={25} className=" text-green-700 " />
        ) : (
          <AiOutlineSearch size={25} className=" text-[#54656f]" />
        )}
      </button>
      <input
        type="text"
        id="search-text-mainpage"
        placeholder="Search..."
        className=" px-16 py-2 bg-bgGray text-[#3b4a54] w-full rounded-[8px]"
        value={searchText}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchField;
