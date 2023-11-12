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
  showEmojie: boolean;
  setShowEmojie: Dispatch<SetStateAction<boolean>>;
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
};

const initContextState: WhatSappContextType = {
  openSideNav: false,
  showEmojie: false,
  setShowEmojie: (showEmojie) => !showEmojie,
  setOpenSideNav: (openSideNav) => !openSideNav,
};

export const WhatSappContext =
  createContext<WhatSappContextType>(initContextState);

export const WhatSappContextProvider = ({ children }: any) => {
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const [showEmojie, setShowEmojie] = useState<boolean>(false);

  const values = {
    openSideNav,
    setOpenSideNav,
    showEmojie,
    setShowEmojie,
  };

  return (
    <WhatSappContext.Provider value={values}>
      {children}
    </WhatSappContext.Provider>
  );
};

export const useWhatSappContext = () => {
  const { openSideNav, setOpenSideNav, showEmojie, setShowEmojie } =
    useContext(WhatSappContext);
  return { openSideNav, setOpenSideNav, showEmojie, setShowEmojie };
};
