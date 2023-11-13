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
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
};

const initContextState: WhatSappContextType = {
  openSideNav: false,

  setOpenSideNav: (openSideNav) => !openSideNav,
};

export const WhatSappContext =
  createContext<WhatSappContextType>(initContextState);

export const WhatSappContextProvider = ({ children }: any) => {
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);

  const values = {
    openSideNav,
    setOpenSideNav,
  };

  return (
    <WhatSappContext.Provider value={values}>
      {children}
    </WhatSappContext.Provider>
  );
};

export const useWhatSappContext = () => {
  const { openSideNav, setOpenSideNav } = useContext(WhatSappContext);
  return { openSideNav, setOpenSideNav };
};
