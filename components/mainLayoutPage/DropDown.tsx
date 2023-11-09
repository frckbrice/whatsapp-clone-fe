import * as React from 'react';

export interface IAppProps {
    dropdownList: string[],
    // ref: React.MutableRefObject<HTMLUListElement | null>
}

 const DropDown =(props:IAppProps) => {

    console.log("in the drop d");

  return (
  <ul className="absolute -translate-x-48 mt-8 py-2 w-[250px] bg-white rounded-md shadow-xl z-20">
    {props.dropdownList.map((value, index) => (
        <li key={index} className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap">
      {value}
    </li>
    ))}
  </ul>
  );
};

export default DropDown;
// absolute top-20 left-72 