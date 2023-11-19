"use client";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import React from "react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type WhatSappContextType = {
  openSideNav: boolean;
  showPPicture: boolean;
  openCreateGroup: boolean;
  importPict: boolean;
  profilepict: string;
  profileImage: string;
  start: boolean;
  setStart: Dispatch<SetStateAction<boolean>>;
  sendingFile: any;
  setSendingFile: Dispatch<SetStateAction<any>>;
  setProfileImage: Dispatch<SetStateAction<string>>;
  setProfilPict: Dispatch<SetStateAction<string>>;
  setImportPict: Dispatch<SetStateAction<boolean>>;
  setShowPPicture: Dispatch<SetStateAction<boolean>>;
  setOpenCreateGroup: Dispatch<SetStateAction<boolean>>;

  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
};

const initContextState: WhatSappContextType = {
  openSideNav: false,
  showPPicture: false,
  openCreateGroup: false,
  importPict: false,
  start: false,
  profilepict: "",
  profileImage: "",
  sendingFile: "",
  setSendingFile: () => "",
  setProfileImage: () => "",
  setProfilPict: () => "",
  setStart: (start) => !start,
  setShowPPicture: (showPPicture) => !showPPicture,
  setOpenCreateGroup: (openCreateGroup) => !openCreateGroup,
  setOpenSideNav: (openSideNav) => !openSideNav,
  setImportPict: (importPict) => !importPict,
};

export const WhatSappContext =
  createContext<WhatSappContextType>(initContextState);

export const WhatSappContextProvider = ({ children }: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const [showPPicture, setShowPPicture] = useState<boolean>(false);
  const [openCreateGroup, setOpenCreateGroup] = useState<boolean>(false);
  const [importPict, setImportPict] = useState<boolean>(false);
  const [profilepict, setProfilPict] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [sendingFile, setSendingFile] = useState<any>();
  const [start, setStart] = useState<boolean>(false);

  const values = {
    openSideNav,
    setOpenSideNav,
    showPPicture,
    setShowPPicture,
    openCreateGroup,
    setOpenCreateGroup,
    importPict,
    setImportPict,
    profilepict,
    setProfilPict,
    profileImage,
    setProfileImage,
    sendingFile,
    setSendingFile,
    start,
    setStart,
  };

  if (importPict) console.log("importPict: ", importPict);

  return (
    <WhatSappContext.Provider value={values}>
      {children}
    </WhatSappContext.Provider>
  );
};

export const useWhatSappContext = () => {
  const {
    openSideNav,
    setOpenSideNav,
    showPPicture,
    setShowPPicture,
    openCreateGroup,
    setOpenCreateGroup,
    importPict,
    setImportPict,
    profilepict,
    setProfilPict,
    profileImage,
    setProfileImage,
    sendingFile,
    setSendingFile,
    start,
    setStart,
  } = useContext(WhatSappContext);
  return {
    openSideNav,
    setOpenSideNav,
    showPPicture,
    setShowPPicture,
    openCreateGroup,
    setOpenCreateGroup,
    importPict,
    setImportPict,
    profilepict,
    setProfilPict,
    profileImage,
    setProfileImage,
    sendingFile,
    setSendingFile,
    start,
    setStart,
  };
};
