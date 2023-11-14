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
  importPict: boolean;
  setImportPict: Dispatch<SetStateAction<boolean>>;
  setShowPPicture: Dispatch<SetStateAction<boolean>>;
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
};

const initContextState: WhatSappContextType = {
  openSideNav: false,
  showPPicture: false,
  setShowPPicture: (showPPicture) => !showPPicture,
  setOpenSideNav: (openSideNav) => !openSideNav,
  importPict: false,
  setImportPict: (importPict) => !importPict,
};

export const WhatSappContext =
  createContext<WhatSappContextType>(initContextState);

export const WhatSappContextProvider = ({ children }: any) => {
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const [showPPicture, setShowPPicture] = useState<boolean>(false);
  const [importPict, setImportPict] = useState<boolean>(false);

  const values = {
    openSideNav,
    setOpenSideNav,
    showPPicture,
    setShowPPicture,
    importPict,
    setImportPict,
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
    importPict,
    setImportPict,
  } = useContext(WhatSappContext);
  return {
    openSideNav,
    setOpenSideNav,
    showPPicture,
    setShowPPicture,
    importPict,
    setImportPict,
  };
};
