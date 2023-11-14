"use client";
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
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowPPicture: Dispatch<SetStateAction<boolean>>;
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
};

const initContextState: WhatSappContextType = {
  openSideNav: false,
  showPPicture: false,
  showModal: false,
  setShowModal: (showModal) => !showModal,
  setShowPPicture: (showPPicture) => !showPPicture,
  setOpenSideNav: (openSideNav) => !openSideNav,
};

export const WhatSappContext =
  createContext<WhatSappContextType>(initContextState);

export const WhatSappContextProvider = ({ children }: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const [showPPicture, setShowPPicture] = useState<boolean>(false);

  const values = {
    openSideNav,
    setOpenSideNav,
    showPPicture,
    setShowPPicture,
    showModal,
    setShowModal,
  };

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
    showModal,
    setShowModal,
  } = useContext(WhatSappContext);
  return {
    openSideNav,
    setOpenSideNav,
    showPPicture,
    setShowPPicture,
    showModal,
    setShowModal,
  };
};
