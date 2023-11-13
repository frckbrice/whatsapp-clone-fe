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
  setShowPPicture: Dispatch<SetStateAction<boolean>>;
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
};

const initContextState: WhatSappContextType = {
  openSideNav: false,
  showPPicture: false,
  setShowPPicture: (showPPicture) => !showPPicture,
  setOpenSideNav: (openSideNav) => !openSideNav,
};

export const WhatSappContext =
  createContext<WhatSappContextType>(initContextState);

export const WhatSappContextProvider = ({ children }: any) => {
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const [showPPicture, setShowPPicture] = useState<boolean>(false);

  const values = {
    openSideNav,
    setOpenSideNav,
    showPPicture,
    setShowPPicture,
  };

  return (
    <WhatSappContext.Provider value={values}>
      {children}
    </WhatSappContext.Provider>
  );
};

export const useWhatSappContext = () => {
  const { openSideNav, setOpenSideNav, showPPicture, setShowPPicture } =
    useContext(WhatSappContext);
  return { openSideNav, setOpenSideNav, showPPicture, setShowPPicture };
};
