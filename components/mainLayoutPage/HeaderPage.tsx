import * as React from 'react';
import Avatar from '../Avatar';
import { MdGroups2 } from "react-icons/md";
import  { useEffect, useRef, useState } from "react";
import DropDown from './DropDown';
import { HiDotsVertical } from "react-icons/hi";

interface IAppProps {
}
const dropdownLeft = [" new group","new community", "important messages","select dicussion","parameters","disconnect"]


const HeaderMainPageL: React.FunctionComponent<IAppProps> = (props) => {
  const [showDropdrownleft, setShowDropdownleft] = useState<boolean>(false);


  return <div className="flex items-center max-h-16 justify-between bg-bgGray w-full h-max-5 px-3 py-2 border-r">
  <Avatar
    onClick={() => alert("clicked")}
    profilePicture="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
    size={10}
  />

  <div className="flex gap-5">
    <button className="text-2xl text-gray-600">
      <MdGroups2 />
    </button>
    <button className="text-2xl text-gray-600 relative rounded-full" onClick={()=>setShowDropdownleft(prev => !prev)}>
      <HiDotsVertical />
    </button>
    {showDropdrownleft &&  <DropDown dropdownList ={dropdownLeft} />}
  </div>
</div>;
};

export default HeaderMainPageL;
