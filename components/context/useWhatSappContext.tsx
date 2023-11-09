import { useContext } from "react";
import { WhatSappContext } from ".";

const useWhatSappContext = () => {
  const { openSideNav, setOpenSideNav } = useContext(WhatSappContext);
};

export default useWhatSappContext;
