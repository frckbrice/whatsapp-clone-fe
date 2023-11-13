import React, { forwardRef, useState } from "react";
import Mainpopup from "../popups/mainpopup";

export interface IAppProps {
  dropdownList: string[];
}

const DropDown = forwardRef<HTMLUListElement, IAppProps>((props, ref) => {
  console.log("in the drop d");

  const [showModal, setShowModal] = useState(false);
  const handleListItemClick = () => {
    setShowModal(true);
  };

  return (
    <ul
      ref={ref}
      className="absolute mt-8 py-2 w-[250px] bg-white rounded-md shadow-xl  delay-7000 transform transition-duration-10000   -translate-x-48 -scale-30  ease-in-out z-10"
    >
      {props.dropdownList.map((value, index) => (
        <li
          key={index}
          className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap"
          onClick={handleListItemClick}
        >
          {/* {value} */}
          <p>to block</p>
        </li>
      ))}
    </ul>
  );
});

export default DropDown;
