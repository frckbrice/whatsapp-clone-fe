"use client";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";

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

import Messages from "@/components/mainLayoutPage/Messages/Message";
import ContactInfoPage from "../../components/RightSideBar/ContactInfoPage";
import { useWhatSappContactContext } from "../../components/context/Context";
import ProfilePage from "../../components/profilPage/ProfilePage";
import ProfilePageContent from "../../components/profilPage/ProfilePageContent";
import { useProfileContext } from "../../components/context/profileContext";
import ShowProfilePicture from "@/components/profilPage/ShowProfilePicture";
import Image from "next/image";
import UploadPicture from "@/components/profilPage/UploadPicture";
import { supabase } from "@/utils/supabase/client";
import DirectMessage from "@/components/directMessage";
import fetchUsers from "@/utils/queries/fetchUsers";
import fetchSignupUser from "@/utils/queries/fetchSignupUser";
import insertUsersInRooms from "@/utils/queries/insertUsersInRooms";
import { Message, Room, User } from "@/type";
import { getMessages } from "@/utils/queries/getMessage";
import CreateGrt from "@/components/profilPage/CreateGrt";
import CreateGroup from "@/components/createGroup/CreateGroup";
import DOMPurify from "isomorphic-dompurify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import insertIntoRooms from "@/utils/queries/insertIntoRoom";

import MessageInput from "@/components/mainLayoutPage/Messages/MessageInput";
import DisplaySearchResult from "@/components/RightSideBar/DisplaySearchResult";

const Discossions = () => {
  if (typeof localStorage === "undefined") return;

  const email: string = JSON.parse(localStorage.getItem("email") as string);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(() =>
    JSON.parse(localStorage.getItem("sender") || "{}")
  ); // state containing the user info

  const [userInGroupsCreations, setUserInGroupsCreations] = useState<User[]>(
    []
  );

  const [recipient, setRecipient] = useState<User>();
  const [showDropdrownleft, setShowDropdownleft] = useState<boolean>(false);
  const [userGroupsId, setUserGroupsId] = useState<string[]>([]);
  const [currentUserRoomId, setCurreUserRoomId] = useState<string>("");
  const [isGroupdiscussion, setIsGroupdiscussion] = useState<boolean>(false);

  const [roomObject, setRoomObject] = useState<Room>();
  const [newMessage, setNewMessage] = useState<Message>();
  const [showDropdrownright, setShowDropdownright] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<User>();
  const [showDropdrownBottonL, setShowDropdrownBottonL] =
    useState<boolean>(false);
  let [discussionsMessages, setDiscussionsMessages] = useState<Message[]>([]);
  const [showMessageEmoji, setMessageEmoji] = useState<boolean>(false);
  // const [channel, setChannel] = useState<RealtimeChannel>();

  const { showCreateGroup, setShowCreateGroupe } = useProfileContext();

  const {
    setOpenSideNav,
    openSideNav,
    showPPicture,
    importPict,
    profilepict,
    start,
    addedGroup, //to make the the page re-render to get new group added
    setAddedGroup,
  } = useWhatSappContext();
  const { openContactInfo, setOpenContactInfo } = useWhatSappContactContext();
  const { openProfile, setOpenProfile } = useProfileContext();

  const dropdownRef = useRef<HTMLUListElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdownleft(false);
      setShowDropdownright(false);
      setShowDropdrownBottonL(false);
      setMessageEmoji(false);
    }
    if (emojiRef.current && !emojiRef.current.contains(event.target)) {
      console.log("clicked");
      setMessageEmoji(false);
    }
  };
  const divMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    fetchSignupUser(email)
      .then((data) => {
        console.log(data);
        // setCurrentUser(data);
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });
    fetchUsers(currentUser.id as string)
      .then((users: any) => {
        console.log("the users: ", users);
        if (users) {
          setUsers(users.merged);
          setUserGroupsId(users.groups);
          setUserInGroupsCreations(users.data);
          setCurreUserRoomId(users.currentUserRoomId);
          setAddedGroup(false);
        }
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });

    if (ref.current !== null)
      ref.current.addEventListener("click", handleClickOutSide);

    return () => document.removeEventListener("click", handleClickOutSide);
  }, [addedGroup]);

  useEffect(() => {
    setDiscussionsMessages([]);
    if (userGroupsId.length)
      localStorage.setItem("userGroupsId", JSON.stringify(userGroupsId));
    if (receiver)
      getMessages(
        currentUser?.id!,
        receiver?.id!,
        receiver?.user_id!,
        currentUserRoomId
      )
        .then((messages: Message[] | undefined): void | PromiseLike<void> => {
          if (messages?.length) {
            setDiscussionsMessages(messages);
            if (userGroupsId?.includes(receiver?.id as string))
              setIsGroupdiscussion(true);
          } else {
            setDiscussionsMessages([]);
          }
        })
        .catch((err) => {
          if (err instanceof Error) console.error(err);
        });
  }, [receiver?.id]);

  // Postgres CDC

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  }, [newMessage]);

  const messages = supabase
    .channel("message-channel")
    ?.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      async (payload: any) => {
        console.log("Change received!", payload);

        if (
          payload.new.receiver_room_id === receiver?.id ||
          payload.new.receiver_room_id === currentUserRoomId
        ) {
          if (payload.eventType === "INSERT") {
            console.log("this message concernes the room ");
            setNewMessage(payload.new);
          }

          if (payload.eventType === "UPDATE") {
            console.log("update done");
            const newIndex: number = discussionsMessages?.findIndex(
              (message: any) => message.id === payload.new.id
            );
            if (newIndex != -1) {
              discussionsMessages[newIndex].emoji = payload.new?.emoji;
              setDiscussionsMessages(discussionsMessages);
            }
          }
        }
      }
    )
    .subscribe();

  const unreadMessages = supabase
    .channel("unread_messages-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "unread_messages" },
      async (payload: any) => {
        console.log("Change received from unread_message table!", payload);

        const index = users?.findIndex(
          (user: User) => user.user_id === payload.new.sender_id
        );
        if (
          index !== -1 &&
          payload.new.receiver_room_id === currentUserRoomId &&
          (payload.new.last_message || payload.new.unread_count)
        ) {
          console.log("promote to thfirst place", payload);
          users[index] = {
            ...users[index],
            unread_count: payload.new.unread_count,
            last_message: payload.new.last_message,
            updated_at: payload.new.updated_at,
          };
          if (payload.new.unread_count) {
            setUsers(() => [users[index], ...users]);
            return;
          }
          // * swap two (postions: index and 0) elements in an array
          // users[0] = users.splice(index, 1, users[0])[0];
          setUsers(users);
        }
      }
    )
    .subscribe();

  // console.log(roomMessages);

  const user = supabase
    .channel("allusers-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "user" },
      async (payload: any) => {
        console.log("Change received from user table!", payload);

        await insertIntoRooms(payload.new);
      }
    )
    .subscribe();

  return (
    <>
      {showPPicture ? (
        <ShowProfilePicture>
          <div className=" w-full h-full bg-white/90 flex flex-col justify-start pt-20  items-center z-100">
            <Image
              src={
                profilepict ||
                currentUser?.image ||
                "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
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
                    currentUser?.image ||
                    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                  }
                  size={10}
                />

                <div className="flex gap-5">
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
              <DirectMessage
                users={users?.sort((user1: any, user2: any) =>
                  user1.unread_count - user2.unread_count > 0 ? 1 : -1
                )}
                setReceiver={setReceiver}
                className=" overflow-y-auto h-full p-0"
                setRoomObject={setRoomObject}
                setRecipient={setRecipient}
                currentUserRoomId={currentUserRoomId as string}
              />
            </div>
            <div
              ref={ref}
              className={
                openSideNav || openContactInfo
                  ? `relative w-[50vw] ${
                      !start
                        ? "bg-whatsappdashimg bg-no-repeat bg-cover"
                        : "bg-whatsappimg pb-10"
                    }  border-r border-r-gray-300 z-0`
                  : `relative w-[75vw] bg-whatsappdashimg z-0 pb-10 ${
                      !start
                        ? "bg-whatsappdashimg bg-no-repeat bg-cover"
                        : "bg-whatsappimg"
                    }`
              }
            >
              <div
                className={
                  !start
                    ? "hidden"
                    : "flex items-center bg-bgGray max-h-16 justify-between w-full h-max-5 px-3 py-2 cursor-pointer"
                }
              >
                <div
                  className="flex gap-3 w-full cursor-pointer"
                  onClick={() => setOpenContactInfo(true)}
                >
                  <Avatar
                    onClick={() => setOpenContactInfo(true)}
                    profilePicture={
                      recipient?.image ||
                      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    }
                    size={10}
                  />
                  <div className="flex flex-col items-start scrollbar-track-bg-red-600 my-auto">
                    <h4 className="text-gray-700 text-xl">
                      {recipient?.name || roomObject?.name}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      {recipient?.phone ||
                        roomObject?.phone ||
                        recipient?.email ||
                        "hey there i'm using whatsapp"}
                    </p>
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
              <div
                className="w-full h-[calc(100vh-117px)] bigScreen:h-[calc(100vh-117px-39px)] overflow-y-auto p-4 mb-10 overflow-x-clip "
                ref={divMessageRef}
              >
                {discussionsMessages.length ? (
                  <Messages
                    messageList={discussionsMessages}
                    currentUser={currentUser}
                    receiver={receiver as User}
                    ref={emojiRef}
                    showMessageEmoji={showMessageEmoji}
                    setMessageEmoji={setMessageEmoji}
                    currentUserRoomId={currentUserRoomId}
                    isGroupdiscussion={isGroupdiscussion}
                  />
                ) : (
                  ""
                )}
              </div>

              <div
                className={
                  !start
                    ? "hidden"
                    : openSideNav || openContactInfo
                    ? "  w-[50vw] flex items-center bg-bgGray h-[] fixed bottom-0 py-2 px-5 gap-5 z-0"
                    : "w-[75vw] flex items-center bg-bgGray h-[] fixed bottom-0 py-2 px-5 gap-5 z-0"
                }
              >
                {showDropdrownBottonL && <DropDownR ref={dropdownRef} />}

                <MessageInput
                  setDiscussionsMessages={setDiscussionsMessages}
                  receiverId={receiver?.id as string}
                  currentUser={currentUser}
                  newMessage={newMessage!}
                  discussionsMessages={discussionsMessages}
                  currentUserRoomId={currentUserRoomId}
                />
              </div>
            </div>
            {openContactInfo ? (
              <SideNavRight title="Contact Infos">
                <ContactInfoPage roomObject={recipient || roomObject} />
              </SideNavRight>
            ) : (
              <SideNavRight title="Search for messages">
                <SearchField messageList={discussionsMessages} />
                <DisplaySearchResult />
              </SideNavRight>
            )}

            {showCreateGroup && (
              <CreateGrt title="Create new group">
                <CreateGroup
                  currentUser={currentUser}
                  users={userInGroupsCreations}
                />
              </CreateGrt>
            )}
          </div>
        </>
      )}
    </>
  );
};

Discossions.displayName = Discossions;

export default Discossions;
