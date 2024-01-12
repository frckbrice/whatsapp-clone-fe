"use client";
import { Message } from "@/type";
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
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  openSideNav: boolean;
  showPPicture: boolean;
  openCreateGroup: boolean;
  importPict: boolean;
  profilepict: string;
  profileImage: string;
  groupIcon: string;
  start: boolean;
  addedGroup: boolean;

  setAddedGroup: Dispatch<SetStateAction<boolean>>;
  setStart: Dispatch<SetStateAction<boolean>>;
  sendingFile: any;
  setSendingFile: Dispatch<SetStateAction<any>>;
  setProfileImage: Dispatch<SetStateAction<string>>;
  setGroupIcon: Dispatch<SetStateAction<string>>;
  setProfilPict: Dispatch<SetStateAction<string>>;
  setImportPict: Dispatch<SetStateAction<boolean>>;
  setShowPPicture: Dispatch<SetStateAction<boolean>>;
  setOpenCreateGroup: Dispatch<SetStateAction<boolean>>;

  setOpenSideNav: Dispatch<SetStateAction<boolean>>;

  // openProfile: boolean;
  // setOpenProfile: Dispatch<SetStateAction<boolean>>;

  // showCreateGroup: boolean;
  // setShowCreateGroupe: Dispatch<SetStateAction<boolean>>;
};

const initContextState: WhatSappContextType = {
  // openProfile: false,
  // setOpenProfile: (openProfile) => !openProfile,
  // showCreateGroup: false,
  // setShowCreateGroupe: (showCreateGroup) => !showCreateGroup,

  messages: [],
  setMessages: () => [],
  openSideNav: false,
  showPPicture: false,
  openCreateGroup: false,
  importPict: false,
  start: false,
  profilepict: "",
  profileImage: "",
  sendingFile: "",
  addedGroup: false,

  setAddedGroup: (addedGroup) => !addedGroup,
  groupIcon: "",
  setSendingFile: () => "",
  setGroupIcon: () => "",
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
  const [groupIcon, setGroupIcon] = useState("");

  const [sendingFile, setSendingFile] = useState<any>();
  const [start, setStart] = useState<boolean>(false);
  const [addedGroup, setAddedGroup] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([]);

  // const [openProfile, setOpenProfile] = useState<boolean>(false);
  // const [showCreateGroup, setShowCreateGroupe] = useState<boolean>;

  const values = {
    messages,
    setMessages,
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
    addedGroup,
    setAddedGroup,
    groupIcon,
    setGroupIcon,

    // openProfile,
    // setOpenProfile,
    // showCreateGroup,
    // setShowCreateGroupe,
  };

  if (importPict) console.log("importPict: ", importPict);
  if (groupIcon) console.log("groupIcon: ", groupIcon);

  return (
    <WhatSappContext.Provider value={values}>
      {children}
    </WhatSappContext.Provider>
  );
};

export const useWhatSappContext = () => useContext(WhatSappContext);
