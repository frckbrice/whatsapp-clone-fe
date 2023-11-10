"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ProfileContextType = {
  openProfile: boolean;
  setOpenProfile: Dispatch<SetStateAction<boolean>>;
};

const initContextState: ProfileContextType = {
  openProfile: false,
  setOpenProfile: (openProfile) => !openProfile,
};

export const ProfileContext =
  createContext<ProfileContextType>(initContextState);

export const ProfileContextProvider = ({ children }: any) => {
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const values = {
    openProfile,
    setOpenProfile,
  };

  console.log(" in the context: openProfile, ", openProfile);

  return (
    <ProfileContext.Provider value={values}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const { openProfile, setOpenProfile } = useContext(ProfileContext);
  return { openProfile, setOpenProfile };
};
