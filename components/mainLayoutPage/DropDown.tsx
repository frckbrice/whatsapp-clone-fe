import React, { ChangeEvent, forwardRef, useState } from "react";
import { useWhatSappContext } from "../context";
import { uploadFile } from "@/utils/service/getFile";
import { useProfileContext } from "../context/profileContext";
import { useWhatSappContactContext } from "../context/Context";

export interface IAppProps {
  dropdownList: string[];
}

const DropDown = forwardRef<HTMLUListElement, IAppProps>((props, ref) => {
  console.log("in the drop d");
  const uldd = document.getElementById("uldropdown") as HTMLUListElement;

  const { setShowPPicture, setProfilPict, setImportPict, setSendingFile } =
    useWhatSappContext();
  const { setOpenProfile } = useProfileContext();
  const { setOpenContactInfo } = useWhatSappContactContext();

  const handleLink = (value: string) => {
    if (value === "Show the picture") setShowPPicture(true);
    if (value === "Import a picture") {
      const inputFile = document.createElement("input") as HTMLInputElement;
      inputFile.type = "file";
      inputFile.addEventListener("change", (e: any) => {
        const file = e.target.files[0];
        setSendingFile(file);
        const reader = new FileReader();
        reader.addEventListener("load", (e: any) => {
          const fileContent = reader.result;
          if (fileContent) {
            setProfilPict(fileContent as string);
          }
        });
        reader.readAsDataURL(file);
      });

      setImportPict(true);
      inputFile.click();
    }
    if (value === "contact infos") setOpenContactInfo(true);
    if (uldd !== null) {
      uldd.style.display = "none";
    }
  };

  return (
    <ul
      ref={ref}
      className="absolute mt-8 py-2 w-[250px] bg-white rounded-md shadow-xl transition-transform delay-5000 ease-in-out -translate-x-48 z-20"
      id="uldropdown"
    >
      {props.dropdownList.map((value, index) => (
        <li
          key={index}
          className="w-64  text-sm text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap"
          onClick={() => handleLink(value)}
        >
          {value}
        </li>
      ))}
    </ul>
  );
});

export default React.memo(DropDown);
