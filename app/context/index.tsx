"use client";
import { createContext, useContext, useState } from "react";

export const WhatSappContext = createContext({});

export const WhatSappContextProvider = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);

  const values = { openSideNav, setOpenSideNav };

  console.log("in the context");
  console.log("openSideNav: " + openSideNav);

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
