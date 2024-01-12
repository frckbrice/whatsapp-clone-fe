"use client";

import React, { useEffect, useState } from "react";
import ToastContainer from "rsuite/esm/toaster/ToastContainer";
import { IoSendSharp } from "react-icons/io5";
import { Message, User } from "@/type";
import { RealtimeClient } from "@supabase/realtime-js";
import { toast } from "react-toastify";
import { supabase, API_KEY, REALTIME_URL } from "@/utils/supabase/client";
import { randomUUID } from "crypto";

const client = new RealtimeClient(REALTIME_URL, {
  params: {
    apikey: API_KEY.toString(),
  },
});

type Props = {
  setDiscussionsMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  receiverId: string;
  currentUser: User;
  newMessage: Message;
  discussionsMessages: Message[];
  currentUserRoomId: string;
};

const MessageInput = ({
  setDiscussionsMessages,
  receiverId,
  currentUser,
  newMessage,
  discussionsMessages,
  currentUserRoomId,
}: Props) => {
  const [message, setMessage] = useState<string>("");

  //* create channel for a room
  const channel = client.channel(`${receiverId}`, {
    config: {
      broadcast: {
        self: true,
      },
    },
  });

  //*subscribe to a room channel
  channel?.subscribe(async (status: string, err: any) => {
    // Wait for successful connection
    if (status === "SUBSCRIBED") {
      console.log(" socket connected");
      await channel?.send({
        type: "broadcast",
        event: "message",
        payload: newMessage,
      });
    }

    if (status === "CHANNEL_ERROR") {
      console.log(`There was an error subscribing to channel: ${err?.message}`);

      setTimeout(() => channel.socket.connect(), 100);
    }

    if (status === "TIMED_OUT") {
      console.log("Realtime server did not respond in time.");
      setTimeout(() => channel.socket.connect(), 100);
    }

    if (status === "CLOSED") {
      console.log("Realtime channel was unexpectedly closed.");
      setTimeout(() => channel.socket.connect(), 100);
    }
  });

  useEffect(() => {
    channel.on("broadcast", { event: "message" }, ({ payload }) => {
      if (
        payload?.receiver_room_id === receiverId ||
        payload?.receiver_room_id === currentUserRoomId
      ) {
        console.log("received payload", newMessage);

        const existingMessage = discussionsMessages?.find(
          (message) => message.id === payload.id
        );

        if (!existingMessage) {
          console.log(
            "payload from broadcast for non existing message",
            payload
          );
          setDiscussionsMessages((prev) => [...prev, payload]);
        }
      }
    });
    // Unsubscribe when the component unmounts or when no longer needed
    return () => {
      channel.unsubscribe();
    };
  }, [newMessage]);

  const sendMessageToDB = async () => {
    if (message === "" || !receiverId) {
      return toast.warning("Field cannot be empty", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
      });
    }

    const sendingMessage: Message = {
      sender_id: currentUser?.id as string,
      receiver_room_id: receiverId as string,
      content: message,
      sender_name: currentUser?.name,
      phone_number: currentUser?.phone as string,
    };
    // setNewMessage(sendingMessage);
    const { error } = await supabase.from("messages").insert(sendingMessage);
    setMessage("");
    if (error) console.log("error inserting messages: ", error);
  };

  const handlekeydown = async (event: any) => {
    if (event.key === "Enter") await sendMessageToDB();
  };

  return (
    <div className=" w-full flex items-center justify-center gap-3 ">
      <ToastContainer />
      <input
        type="text"
        className="w-full focus:outline-none h-fit my-2 text-[14px]outline-none text-gray-600 p-3 rounded-md"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        onKeyDown={handlekeydown}
      />

      <button className="text-3xl " onClick={sendMessageToDB}>
        <IoSendSharp />
      </button>
    </div>
  );
};

export default React.memo(MessageInput);
