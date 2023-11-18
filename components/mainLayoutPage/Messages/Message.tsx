import Image from "next/image";
import React, {
  MouseEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import SenderMessages from "./SenderMessage";
import ReceiverMessages from "./ReceiverMessage";
import SimpleMessage from "./SimpleMessage";
import { User } from "@/type";
import { FaFaceGrinWide } from "react-icons/fa6";
import EmojiMessage from "./EmojiMessage";
import { supabase } from "@/utils/supabase/client";

type Props = {
  messageList: any[];
  currentUser: User;
  receiver: User;
  showMessageEmoji: any;
  setMessageEmoji: React.Dispatch<React.SetStateAction<boolean>>;
};
const Messages = forwardRef<HTMLDivElement, Props>((props, ref) => {
  // const [showMessageEmoji, setMessageEmoji] = useState<boolean>(false);
  const [target, setTarget] = useState<string>(props.messageList[0].content);
  const [emojie, setEmojie] = useState<string>();
  const [messageId, setMessageId] = useState<string>("");
  const [oldmessageId, setOldmessageId] = useState<string>("");
  const emojieRef = useRef<HTMLDivElement | null>(null);

  const classForMessageReceiver = "align-left";
  const classForMessageSender = "box-row align-right";

  const handleTargetEmoji = async (targetEmoji: string, id: string) => {
    if (targetEmoji === target) {
      props.setMessageEmoji((prev) => !prev);
    }
    setTarget(targetEmoji);
    setMessageId(id);
  };

  const getEmoji = async (emoji: string) => {
    setEmojie(emoji);
    const { data, error } = await supabase
      .from("messages")
      .update({
        sender_id: props.currentUser.id,
        receiver_id: props.receiver?.id,
        emoji: emoji,
      })
      .eq("id", messageId)
      .single();

    if (data) console.log("message containing emoji: ", data);
    if (error) console.log("Error inserting emoji: ", error);
  };

  let content;

  const sortMessageList = props.messageList.sort((a, b) =>
    a.created_at > b.created_at ? 1 : -1
  );

  if (
    // eslint-disable-next-line no-restricted
    sortMessageList[0].receiver_id === props.currentUser.id &&
    sortMessageList[0].sender_id !== props.currentUser.id
  )
    content = (
      <>
        <div className="flex justify-start items-center">
          <ReceiverMessages
            content={sortMessageList[0].content}
            time={sortMessageList[0].created_at
              .split("T")[1]
              .split(".")[0]
              .slice(0, 5)}
          />
          <span
            className=" opacity-0 hover:opacity-100 mx-1  hover:block p-[5px] rounded-full bg-[#a3adb3a7] "
            onClick={() =>
              handleTargetEmoji(
                sortMessageList[0].content,
                sortMessageList[0].id
              )
            }
          >
            <FaFaceGrinWide className=" text-white" size={20} />
          </span>
        </div>
        {props.showMessageEmoji && sortMessageList[0].content === target && (
          <EmojiMessage
            setEmojie={getEmoji}
            classname=" translate-x-[10%]"
            ref={ref}
          />
        )}
        {sortMessageList[0].emoji ? (
          <span className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out translate-y-[-20%] translate-x-[30%]">
            {sortMessageList[0].emoji}
          </span>
        ) : (
          ""
        )}
      </>
    );

  if (
    (sortMessageList[0].receiver_id !== props.currentUser.id &&
      sortMessageList[0].sender_id === props.currentUser.id) ||
    (sortMessageList[0].receiver_id === props.currentUser.id &&
      sortMessageList[0].sender_id === props.currentUser.id)
  ) {
    content = (
      <>
        {props.showMessageEmoji && sortMessageList[0].content === target && (
          <EmojiMessage
            setEmojie={getEmoji}
            classname="absolute top-[250px] right-[300px]"
            ref={ref}
          />
        )}
        <div className="flex justify-end">
          <span
            className="w-10 h-10 flex justify-center items-center opacity-0 hover:opacity-100 mx-1  hover:block p-[5px] rounded-full bg-[#a3adb3a7] cursor-pointer"
            onClick={() =>
              handleTargetEmoji(
                sortMessageList[0].content,
                sortMessageList[0].id
              )
            }
          >
            <FaFaceGrinWide
              className=" text-white  mr-[5px] mb-[5px] ml-[5px] "
              size={25}
            />
          </span>
          <SenderMessages
            content={sortMessageList[0].content}
            time={sortMessageList[0].created_at
              .split("T")[1]
              .split(".")[0]
              .slice(0, 5)}
          />
        </div>
        <div className=" w-full flex justify-end items-center">
          {sortMessageList[0].emoji ? (
            <span
              className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out  translate-y-[-10px] translate-x-[-20px]
          "
            >
              {/*  absolute z-10 top-[265px] right-[100px] */}
              {sortMessageList[0].emoji}
            </span>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }

  const listOfMessages = sortMessageList?.slice(1).map((messages, i) => {
    if (
      messages.receiver_id === props.currentUser.id &&
      messages.sender_id !== props.currentUser.id
    ) {
      console.log("messages: ", messages.content);

      return (
        <>
          <div className="flex justify-start" key={i}>
            {messages.id !== oldmessageId ? (
              <SimpleMessage
                content={messages.content}
                styleStyle={classForMessageReceiver}
                time={sortMessageList[0].created_at
                  .split("T")[1]
                  .split(".")[0]
                  .slice(0, 5)}
              />
            ) : (
              ""
            )}

            <span
              className=" opacity-0 hover:opacity-100 mx-1  hover:block  rounded-full bg-[#a3adb3a7] w-8 h-8 flex justify-center items-center place-content-center pl-[6px] pt-[5px] cursor-pointer"
              onClick={() => handleTargetEmoji(messages.content, messages.id)}
            >
              <FaFaceGrinWide className=" text-white" size={20} />
            </span>
          </div>

          {props.showMessageEmoji && messages.content === target && (
            <EmojiMessage
              setEmojie={getEmoji}
              classname=" translate-x-[10%]"
              ref={ref}
            />
          )}
          {messages.emoji ? (
            <span className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out translate-y-[-20%] translate-x-[30%]">
              {messages.emoji}
            </span>
          ) : (
            ""
          )}
        </>
      );
    } else if (
      (messages.receiver_id !== props.currentUser.id &&
        messages.sender_id === props.currentUser.id) ||
      (messages.receiver_id === props.currentUser.id &&
        messages.sender_id === props.currentUser.id)
    ) {
      return (
        <>
          {props.showMessageEmoji && messages.content === target && (
            <EmojiMessage
              setEmojie={getEmoji}
              classname="absolute top-[250px] right-[300px]"
              ref={ref}
            />
          )}
          <div className="flex justify-end" key={i}>
            <span
              className=" opacity-0 hover:opacity-100 mx-1  hover:block  rounded-full bg-[#a3adb3a7] w-8 h-8 flex justify-center items-center place-content-center pl-[6px] pt-[5px] cursor-pointer"
              onClick={() => handleTargetEmoji(messages.content, messages.id)}
            >
              <FaFaceGrinWide className=" text-white" size={20} />
            </span>

            <SimpleMessage
              content={messages.content}
              styleStyle={classForMessageSender}
              time={sortMessageList[0].created_at
                .split("T")[1]
                .split(".")[0]
                .slice(0, 5)}
            />
          </div>

          <div className=" w-full flex justify-end items-center">
            {messages.emoji ? (
              <span className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out translate-y-[-10px] translate-x-[-20px]">
                {messages.emoji}
              </span>
            ) : (
              ""
            )}
          </div>
        </>
      );
    }
  });

  return (
    <div className=" max-w-full flex flex-col ">
      <div className=" flex justify-center flex-col items-center pt-10 text-[#54656f] mb-3">
        <span className=" w-fit pt-1 pb-[8px] px-3 bg-white shadow-sm rounded-[8px] mb-4 ">
          {" "}
          {props.messageList[0].created_at.split("T")[0]}
        </span>
        <p className=" bg-[#ffeecd] flex justify-center items-center w-fit text-[12px] text-center p-2 px-4 rounded-[8px] shadow-brie">
          messages are end-to-end encrypted. no one outside of this discussion,
          not even whatsapp can read, nor even listen to them
        </p>
      </div>
      {content}
      {listOfMessages}
    </div>
  );
});

export default Messages;
