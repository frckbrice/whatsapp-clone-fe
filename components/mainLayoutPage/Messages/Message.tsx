import Image from "next/image";
import React from "react";
import SenderMessages from "./SenderMessage";
import ReceiverMessages from "./ReceiverMessage";
import { SimpleMessage } from "./SimpleMessage";
import { User } from "@/type";

type Props = {
  messageList: any[];
  currentUser: User;
};

export default function Messages(props: Props) {
  const classForMessageReceiver = "align-left";
  const classForMessageSender = "box-row align-right";

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
      <div className="flex justify-start">
        <ReceiverMessages content={sortMessageList[0].content} />{" "}
      </div>
    );

  if (
    (sortMessageList[0].receiver_id !== props.currentUser.id &&
      sortMessageList[0].sender.id === props.currentUser.id) ||
    (sortMessageList[0].receiver_id === props.currentUser.id &&
      sortMessageList[0].sender_id === props.currentUser.id)
  ) {
    content = (
      <div className="flex justify-end">
        <SenderMessages content={sortMessageList[0].content} />
      </div>
    );
  }

  const listOfMessages = sortMessageList?.slice(1).map((messages, i) => {
    if (
      messages.receiver_id === props.currentUser.id &&
      messages.sender_id !== props.currentUser.id
    ) {
      console.log("Messages received: ", messages.content);
      return (
        <div className="flex justify-start" key={i}>
          {" "}
          <SimpleMessage
            content={messages.content}
            styleStyle={classForMessageReceiver}
          />
        </div>
      );
    }

    if (
      (messages.receiver_id !== props.currentUser.id &&
        messages.sender_id === props.currentUser.id) ||
      (messages.receiver_id === props.currentUser.id &&
        messages.sender_id === props.currentUser.id)
    ) {
      console.log("Messages sent: ", messages.content);
      return (
        <div className="flex justify-end" key={i}>
          <SimpleMessage
            content={messages.content}
            styleStyle={classForMessageSender}
          />
        </div>
      );
    }
  });

  return (
    <div className=" max-w-full flex flex-col ">
      {content}
      {listOfMessages}
    </div>
  );
}
