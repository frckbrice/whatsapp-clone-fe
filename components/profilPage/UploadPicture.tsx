"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiArrowGoBackLine } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";
import { useWhatSappContext } from "../context";
import { uploadFile } from "@/utils/service/getFile";

type Props = {};

const UploadPicture = (props: Props) => {
  const { importPict, setImportPict } = useWhatSappContext();
  if (typeof localStorage === "undefined") return;
  const [profilepict, setProfilPict] = useState(() => {
    const fileValue: string | null = localStorage.getItem("uploadFile");
    if (typeof fileValue === "string") return JSON.parse(fileValue);
  });

  const uploadFileToSupabase = () => {};

  const reload = () => {
    const inputFile = document.createElement("input") as HTMLInputElement;
    inputFile.type = "file";
    inputFile.addEventListener("change", (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (e: any) => {
        const fileContent = reader.result;
        if (fileContent) {
          console.log("file to upload: " + fileContent);
          localStorage.setItem("uploadFile", fileContent as string);
          setProfilPict(fileContent as string);
        }
      });
      reader.readAsDataURL(file);
    });
  };

  console.log("file to upload: ", profilepict);

  return (
    <div
      className={
        importPict
          ? " top-0 left-0 bg-white/75 w-[100vw] h-screen z-0 overflow-hidden flex flex-col pt-16 items-center"
          : "hidden"
      }
    >
      <div className="  w-[470px] h-[500px] z-100 bg-[#d8dfe3] shadow-maebrie">
        <div className="flex items-center justify-evenly bg-[#008069] h-12  gap-10 w-full py-2  px-3 text-[#f4f9fc]">
          <button className="text-2xl" onClick={() => setImportPict(false)}>
            <AiOutlineClose size={25} className="" />
          </button>
          <span className=" text-lg "> Drag image to adjust</span>
          <button
            className="text-2xl   flex gap-2 items-center "
            onClick={() => reload()}
          >
            <RiArrowGoBackLine size={20} className=" " />
            <span className=" text-[16px] "> reload</span>
          </button>
        </div>
        <div className="border-none">
          <Image
            // src="https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg"
            src={
              profilepict
                ? profilepict
                : "https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg"
            }
            alt=""
            width={100}
            height={100}
            className=" w-full h-[360px] border-none "
          />
        </div>
        {/* */}
        {/* <div className=" overlay overlay w-full h-full relative  rounded-full cursor-move   "></div> */}
        <div></div>
      </div>
      <button
        className="bg-[#008069] p-4 rounded-full translate-y-[-190%] translate-x-[230%]"
        onClick={uploadFileToSupabase}
      >
        <AiOutlineCheck size={35} className=" text-white " />{" "}
      </button>
    </div>
  );
};

export default UploadPicture;
