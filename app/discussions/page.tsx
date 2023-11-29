"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import { MdGroups2, MdRecordVoiceOver } from "react-icons/md";
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
import { RiContactsBookLine } from "react-icons/ri";
import DirectMessage from "@/components/directMessage";
import fetchUsers from "@/utils/queries/fetchUsers";
import fetchSignupUser from "@/utils/queries/fetchSignupUser";
import insertUsersInRooms from "@/utils/queries/insertUsersInRooms";
import { Message, PartRoomUser, Room, Roomuser, User, Group } from "@/type";
import { getMessages, shuffleArr } from "@/utils/queries/getMessage";
import CreateGrt from "@/components/profilPage/CreateGrt";
import CreateGroup from "@/components/createGroup/CreateGroup";
import { getGroupMembers } from "@/utils/queries/getGroupMembers";
import DOMPurify from "isomorphic-dompurify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateUnreadMessageCount } from "@/utils/queries/updateUnreadMessageCount";
import insertIntoRooms from "@/utils/queries/insertIntoRoom";

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
  const [message, setMessage] = useState<string>("");
  const [updateUsers, setUpdateUsers] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<User>();
  const [showDropdrownleft, setShowDropdownleft] = useState<boolean>(false);
  const [userGroupsId, setUserGroupsId] = useState<string[]>([]);
  const [currentUserRoomId, setCurreUserRoomId] = useState<string>("");
  const [isGroupdiscussion, setIsGroupdiscussion] = useState<boolean>(false);

  const [roomObject, setRoomObject] = useState<Room>();
  const [groupMembersIds, setGroupMembersIds] = useState<string[]>();
  const [showDropdrownright, setShowDropdownright] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<User>();
  const [showDropdrownBottonL, setShowDropdrownBottonL] =
    useState<boolean>(false);
  const [discussionsMessages, setDiscussionsMessages] = useState<Message[]>([]);
  const [showMessageEmoji, setMessageEmoji] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<Message>();

  const { showCreateGroup, setShowCreateGroupe } = useProfileContext();

  // if (!email && !currentUser) router.push("/");

  const {
    setOpenSideNav,
    openSideNav,
    showPPicture,
    importPict,
    profilepict,
    start,
    isDark,
    setIsDark,
    label,
    setLabel,
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
      console.log("emoji component is clicked");
      setMessageEmoji(false);
    }
  };

  const switchTheme: any = () => {
    console.log("clicked");
    setIsDark((prev) => !prev);

    setLabel(() => (label === "Light" ? "Night" : "Light"));
  };

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

  // this is useEffect is mainly to let user setup their profile after the have signup
  // useEffect(() => {
  //   setImageUrl(LOCAL_STORAGE.get("imageURL"));
  //   // i am using this localhost image to check if the use have setup his/her profile
  // }, []);

  // console.log("these are groups", groups);
  useEffect(() => {
    setDiscussionsMessages([]);
    getMessages(
      currentUser?.id as string,
      receiver?.id as string,
      receiver?.user_id as string,
      currentUserRoomId
    )
      .then((messages: any) => {
        if (messages.length) {
          if (userGroupsId?.includes(receiver?.id as string)) {
            console.log("group messages: ", messages);
            setDiscussionsMessages(() =>
              messages.map((message: Message) => ({
                ...message,
                receiver_room_id: currentUserRoomId,
              }))
            );
            setIsGroupdiscussion(true); //to help display group messages with sender name.
          } else {
            console.log("all messages: ", messages);
            setIsGroupdiscussion(false);
            setDiscussionsMessages(messages);
          }
        } else {
          setDiscussionsMessages([]);
        }
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });
    getGroupMembers(receiver?.id as string)
      .then((membersIds) => {
        if (membersIds?.length) {
          console.log("the member of selected group: ", membersIds);
          setGroupMembersIds(membersIds);
        }
      })
      .catch((err: any) => {
        if (err instanceof Error) console.error(err);
      });
  }, [receiver?.id]);

  const sendMessageToDB = async () => {
    if (message === "" || !receiver?.id) {
      toast.warning("Field cannot be empty", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
      });
      console.log("message or receiver of the message can not be empty");
      return;
    }

    const sendingMessage: Message = {
      sender_id: currentUser.id as string,
      receiver_room_id: receiver?.id as string,
      content: message,
      sender_name: currentUser?.name,
      phone_number: currentUser?.phone as string,
    };
    // console.log(sendingMessage);
    const { error } = await supabase.from("messages").insert(sendingMessage);

    if (error) console.log("error inserting messages: ", error);
    setMessage("");
  };

  const handlekeydown = async (event: any) => {
    if (event.key === "Enter") await sendMessageToDB();
  };

  const messages = supabase
    .channel("custom-messages-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      async (payload: any) => {
        console.log("Change received!", payload);
        setLastMessage(payload.new);

        if (payload.eventType === "UPDATE") {
          const newIndex: number = discussionsMessages?.findIndex(
            (message: any) => message.id === payload.new.id
          );
          discussionsMessages[newIndex].emoji = payload.new.emoji;
          setDiscussionsMessages(discussionsMessages);
        }

        if (payload.eventType === "INSERT") {
          if (userGroupsId?.includes(payload.new.receiver_room_id)) {
            groupMembersIds?.map((memberId) => {
              supabase
                .channel(`group_:${payload.new.receiver_room_id}`)
                .send({
                  type: "broadcast",
                  event: "test",
                  payload: { message: payload.new.content },
                })
                .then((data) => {
                  console.log("broadcast messages: ", data);
                });
            });
            supabase
              .channel(`group_:${payload.new.receiver_room_id}`)
              .on("broadcast", { event: "test" }, (payload) => {
                if (payload.receiver_room_id !== currentUser.id) {
                  console.log("Received room message: ", payload);
                }
              })
              .subscribe();
            setDiscussionsMessages((prev) => [
              ...prev,
              { ...payload.new, receiver_room_id: currentUserRoomId },
            ]);
          } else {
            setDiscussionsMessages((prev) => [...prev, payload.new]);
          }

          const { data, error } = await supabase
            .from("unread_messages")
            .select("*")
            .match({
              sender_id: payload.new.sender_id,
              receiver_room_id: payload.new.receiver_room_id,
            })
            .single();

          await supabase.from("unread_messages").upsert(
            {
              sender_id: payload.new.sender_id,
              receiver_room_id: payload.new.receiver_room_id,
              unread_count: !data ? 1 : data.unread_count + 1,
              last_message: payload.new.content,
            },
            {
              onConflict: "sender_id, receiver_room_id ",
            }
          );
        }
        // setInsert(false);
      }
    )
    .subscribe();

  const unreadMessages = supabase
    .channel("custom-insert-channel")
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
          payload.new.receiver_room_id === currentUserRoomId
        ) {
          console.log("promote to thfirst place", payload);
          users[index] = {
            ...users[index],
            unread_count: payload.new.unread_count,
            last_message: payload.new.last_message,
            updated_at: payload.new.updated_at,
          };
          if (payload.new.unread_count)
            users[0] = users.splice(index, 1, users[0])[0];
          setUsers(users);
        }
      }
    )
    .subscribe();

  // console.log(discussionsMessages);

  const user = supabase
    .channel("custom-allusers-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "user" },
      async (payload: any) => {
        console.log("Change received from user table!", payload);

        await insertIntoRooms(payload.new);
      }
    )
    .subscribe();

  const rooms = supabase
    .channel("custom-allrooms-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "rooms" },
      (payload: any) => {
        console.log("Change received from room table!", payload);

        setUsers(() => [
          {
            id: payload.new.id,
            name: payload.new.name,
            created_at: payload.new.created,
            image: payload.new.image,
            updated_at: payload.new.updated,
            status: payload.new.status,
            user_id: payload.new.user_id,
            created_by: payload.new.created_by,
          },
          ...users,
        ]);
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
                  {/* <Header switchTheme={switchTheme} label={label} /> */}
                  {/* <button className="text-2xl text-gray-600">
                    <MdGroups2 />
                  </button> */}
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
                users={users?.sort(
                  (user1: any, user2: any) =>
                    user2.unread_count - user1.unread_count
                )}
                setReceiver={setReceiver}
                className=" overflow-y-auto h-full p-0"
                setRoomObject={setRoomObject}
                setUsers={setUsers}
                setRecipient={setRecipient}
                lastMessage={lastMessage as Message}
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

              <div className=" w-full flex flex-col pb-2 mt-3 px-10 z-0 h-[80vh] overflow-y-auto ">
                {discussionsMessages.length ? (
                  <Messages
                    messageList={discussionsMessages}
                    currentUser={currentUser}
                    receiver={receiver as User}
                    ref={emojiRef}
                    showMessageEmoji={showMessageEmoji}
                    setMessageEmoji={setMessageEmoji}
                    currentUserRoomId={currentUserRoomId}
                    // recipient={recipient as User}
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
                  <ToastContainer />
                  <input
                    type="text"
                    className="w-full my-2 outline-none text-gray-600 px-3 "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    onKeyDown={handlekeydown}
                  />
                </div>
                <button className="text-2xl " onClick={sendMessageToDB}>
                  <IoSendSharp />
                </button>
              </div>
            </div>
            {openContactInfo ? (
              <SideNavRight title="Contact Infos">
                <ContactInfoPage roomObject={recipient || roomObject} />
              </SideNavRight>
            ) : (
              <SideNavRight title="Search for messages">
                <SearchField />
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

export default Discossions;
