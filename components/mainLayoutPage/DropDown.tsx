import React, { forwardRef, useState } from "react";
import Mainpopup from "../popups/mainpopup";
import { useWhatSappContext } from "../context";
import ShowmodalToBlock from "../popups/showmodalToBlock";
import Reportpopup from "../popups/reportpopup";

export interface IAppProps {
  dropdownList: string[];
}

const DropDown = forwardRef<HTMLUListElement, IAppProps>((props, ref) => {
  console.log("in the drop d");
  const [profil, setProfil] = useState<string>("Show the picture");
  const [popupMod, setPopupMod] = useState<boolean>(false);
  const [reportPopup, setReportPopup] = useState<boolean>(false);

  const { showPPicture, setShowPPicture } = useWhatSappContext();
  const handleLink = (value: string) => {
    // you can use switch case or if else statements
    if (value === "Show the picture") setShowPPicture(true);
    else if (value === "to block") setPopupMod(true);
    else if (value === "report") setReportPopup(true);
  };

  const { showModal, setShowModal } = useWhatSappContext();
  const handleListItemClick = (value: string) => {
    setShowModal(true);
  };

  return (
    <>
      {popupMod && <ShowmodalToBlock visible={popupMod} />}

      {reportPopup && <Reportpopup visible={reportPopup} />}

      {!(popupMod && reportPopup) && (
        <ul
          ref={ref}
          className="absolute mt-8 py-2 w-[250px] bg-white rounded-md shadow-xl transition-transform delay-5000 ease-in-out -translate-x-48 z-100"
        >
          {props.dropdownList.map((value, index) => (
            <li
              key={index}
              className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap"
              onClick={() => handleLink(value)}
              // onClick={() => handleListItemClick(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

export default DropDown;
