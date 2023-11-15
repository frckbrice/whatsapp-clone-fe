"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import { MdGroups2 } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import DropDown from "../../components/mainLayoutPage/DropDown";
import {
  dropdownRight,
  dropdownLeft,
} from "../../utils/data/mainpageDropdownLists";
import DropDownR from "../../components/mainLayoutPage/DropdownR";
import { useWhatSappContext } from "@/components/context";
import SideNavRight from "../../components/RightSideBar/SideNavRight";
import SearchField from "../../components/RightSideBar/SearchField";
import SenderMessages from "@/components/mainLayoutPage/Messages/SenderMessage";
import ReceiverMessages from "@/components/mainLayoutPage/Messages/ReceiverMessage";
import FollowingMessagesSimple from "@/components/mainLayoutPage/Messages/SimpleMessage";
import ContactInfoPage from "../../components/RightSideBar/ContactInfoPage";
import { useWhatSappContactContext } from "../../components/context/Context";
import ProfilePage from "../../components/profilPage/ProfilePage";
import ProfilePageContent from "../../components/profilPage/ProfilePageContent";
import { useProfileContext } from "../../components/context/profileContext";
import ShowProfilePicture from "@/components/profilPage/ShowProfilePicture";
import Image from "next/image";
import UploadPicture from "@/components/profilPage/UploadPicture";
import { supabase } from "@/utils/supabase/client";
import { RiContactsBookLine } from "react-icons/ri";
import DirectMessage from "@/components/directMessage";
import fetchUsers from "@/utils/queries/fetchUsers";
import fetchSignupUser from "@/utils/queries/fetchSignupUser";
import insertUsersInRooms from "@/utils/queries/insertUsersInRooms";
import { Message, User } from "@/type";
import { getReceiveMessage } from "@/utils/queries/getMessage";

type Users = {
  email: string;
  name: string;
  image: string;
  phone: number;
  id: string;
  onClick?: () => void;
};

const Discossions = () => {
  if (typeof localStorage === "undefined") return;

  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<any>("");
  const [rooms, setRooms] = useState<Promise<any[] | undefined>[]>([]);
  const [currentUser, setCurrentUser] = useState<Users>(() =>
    JSON.parse(localStorage.getItem("sender") || "{}")
  ); // state containing the user info
  const [showDropdrownleft, setShowDropdownleft] = useState<boolean>(false);
  const [sendingMessage, setSendingMessage] = useState<string[]>([]);
  const [receivingMessage, setReceivingMessage] = useState<string[]>([]);
  const [showDropdrownright, setShowDropdownright] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<User>();
  const [showDropdrownBottonL, setShowDropdrownBottonL] =
    useState<boolean>(false);

  const {
    setOpenSideNav,
    openSideNav,
    showPPicture,
    importPict,
    profileImage,
  } = useWhatSappContext();
  const { openContactInfo, setOpenContactInfo } = useWhatSappContactContext();
  const { openProfile, setOpenProfile } = useProfileContext();
  // const { reciever } = useRecieverInfoContext()

  const dropdownRef = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdownleft(false);
      setShowDropdownright(false);
      setShowDropdrownBottonL(false);
    }
  };

  useEffect(() => {
    fetchSignupUser()
      .then((data) => setCurrentUser(data))
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });
    fetchUsers()
      .then((users) => {
        if (users) setUsers(users);
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });
    insertUsersInRooms(users)
      .then((data) => {
        if (data) setRooms(data);
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });
    if (ref.current !== null)
      ref.current.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  const sendMessageToDB = async () => {
    const sendingMessage: Message = {
      sender_id: currentUser.id,
      receiver_id: receiver?.id as string,
      content: message,
    };

    console.log("message to send: ", sendingMessage);

    const { error } = await supabase.from("messages").insert(sendingMessage);
    if (error) console.log("error inserting messages: ", error);
    setMessage("");
  };

  const messages = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      (payload) => {
        console.log("Change received!", payload);
        if (
          payload.new.receiver_id === currentUser?.id &&
          payload.new.sender_id !== currentUser?.id
        )
          setReceivingMessage((prev) => [...prev, payload.new.content]);
        if (
          payload.new.receiver_id !== currentUser?.id &&
          payload.new.sender_id === currentUser?.id
        )
          setSendingMessage((prev) => [...prev, payload.new.content]);
        if (
          payload.new.sender_id === payload.new.receiver_id &&
          payload.new.receiver_id === currentUser?.id
        )
          setSendingMessage((prev) => [...prev, payload.new.content]);
      }
    )
    .subscribe();

  console.log("sent messages: ", sendingMessage);
  console.log("received messages: ", receivingMessage);

  return (
    <>
      {showPPicture ? (
        <ShowProfilePicture>
          <div className=" w-full h-full bg-white/90 flex flex-col justify-start pt-20  items-center z-100">
            <Image
              src={
                "https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg"
              }
              alt=""
              width={400}
              height={500}
            />
          </div>
        </ShowProfilePicture>
      ) : (
        <>
          <UploadPicture />
          <div className={importPict ? "hidden" : "flex w-full "}>
            <div className="bg-white w-[25vw] h-screen">
              <ProfilePage title="Profil">
                <ProfilePageContent />
              </ProfilePage>
              <div
                className={
                  openProfile || importPict
                    ? "hidden"
                    : "flex items-center max-h-16 justify-between bg-bgGray w-full h-max-5 px-3 py-2 border-r z-0"
                }
              >
                <Avatar
                  onClick={() => setOpenProfile(true)}
                  profilePicture={
                    profileImage ||
                    "https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg"
                  }
                  size={10}
                />

                <div className="flex gap-5">
                  <button className="text-2xl text-gray-600">
                    <MdGroups2 />
                  </button>
                  <button
                    className="text-2xl text-gray-600 relative rounded-full"
                    onClick={() => setShowDropdownleft((prev) => !prev)}
                  >
                    <HiDotsVertical />
                  </button>

                  {showDropdrownleft && (
                    <DropDown dropdownList={dropdownLeft} ref={dropdownRef} />
                  )}
                </div>
              </div>
              <DirectMessage users={users} setReceiver={setReceiver} />
            </div>
            <div
              ref={ref}
              className={
                openSideNav || openContactInfo
                  ? "relative w-[50vw] bg-whatsappimg border-r border-r-gray-300 z-0 cursor-pointer"
                  : "relative w-[75vw] bg-whatsappimg z-0 cursor-pointer "
              }
            >
              <div className="flex items-center bg-bgGray max-h-16 justify-between w-full h-max-5 px-3 py-2 ">
                <div
                  className="flex gap-3 w-full cursor-pointer"
                  onClick={() => setOpenContactInfo(true)}
                >
                  <Avatar
                    onClick={() => setOpenContactInfo(true)}
                    profilePicture="https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg"
                    size={10}
                  />
                  <div>
                    <h4 className="text-gray-700">David Beckamp</h4>
                    <p className="text-gray-500 text-xs">(+801) 365 145 269</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <button
                    className="text-2xl text-gray-600"
                    onClick={() => setOpenSideNav(true)}
                  >
                    <GoSearch />
                  </button>
                  <button
                    className="text-2xl text-gray-600"
                    onClick={() => setShowDropdownright((prev) => !prev)}
                  >
                    <HiDotsVertical />
                  </button>
                  {showDropdrownright && (
                    <DropDown dropdownList={dropdownRight} ref={dropdownRef} />
                  )}
                </div>
              </div>

              <div className=" w-full flex flex-col mt-3 px-10">
                <div className=" max-w-[70%] flex flex-col items-start justify-start">
                  {receivingMessage[0] ? (
                    <ReceiverMessages content={receivingMessage[0]} />
                  ) : (
                    ""
                  )}
                  {receivingMessage.slice(1).length
                    ? receivingMessage
                        .slice(1)
                        ?.map((message, i) => (
                          <FollowingMessagesSimple
                            content={message}
                            styleS=" box align-left"
                            key={i}
                          />
                        ))
                    : ""}
                  {/* <FollowingMessagesSimple content={} /> */}
                </div>

                <div className=" w-full flex flex-col items-end justify-end ">
                  {sendingMessage[0] ? (
                    <SenderMessages content={sendingMessage[0]} />
                  ) : (
                    ""
                  )}
                  {/*  align-left */}
                  {sendingMessage.slice(1).length
                    ? sendingMessage
                        .slice(1)
                        ?.map((message, i) => (
                          <FollowingMessagesSimple
                            content={message}
                            styleS="box box-row align-right"
                            key={i}
                          />
                        ))
                    : ""}
                </div>
              </div>

              <div
                className={
                  openSideNav || openContactInfo
                    ? "  w-[50vw] flex items-center bg-bgGray h-[] fixed bottom-0 py-2 px-5 gap-5 -z-10"
                    : "w-[75vw] flex items-center bg-bgGray h-[] fixed bottom-0 py-2 px-5 gap-5 -z-10"
                }
              >
                {showDropdrownBottonL && <DropDownR ref={dropdownRef} />}
                <BsEmojiSmile className="text-2xl text-gray-700" />
                <button
                  type="button"
                  onClick={() => {
                    setShowDropdrownBottonL((prev) => !prev);
                    console.log("clicked third");
                  }}
                  className={
                    showDropdrownBottonL
                      ? " bg-zinc-400 rounded-full transition-opacity-1 duration-150 ease-in"
                      : "w-fit -rotate-45"
                  }
                >
                  <IoMdAdd
                    className={
                      showDropdrownBottonL
                        ? "text-2xl m-2 text-gray-900 rotate-45 transition-opacity-1 duration-150 ease-in"
                        : "text-2xl m-2 text-gray-700 -rotate-45"
                    }
                  />
                </button>

                <div className="flex bg-white items-center rounded-md gap-5 p-1 w-full">
                  <input
                    type="text"
                    className="w-full my-2 outline-none text-gray-600 px-3 "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                  />
                </div>
                <button className="text-2xl " onClick={sendMessageToDB}>
                  <IoSendSharp />
                </button>
              </div>
            </div>
            {openContactInfo ? (
              <SideNavRight title="Contact Infos">
                <ContactInfoPage />
              </SideNavRight>
            ) : (
              <SideNavRight title="Search for messages">
                <SearchField />
              </SideNavRight>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Discossions;
