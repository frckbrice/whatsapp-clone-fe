// "use client";

// import React, { useEffect, useState } from "react";
// import ToastContainer from "rsuite/esm/toaster/ToastContainer";
// import { IoSendSharp } from "react-icons/io5";
// import { Message, User } from "@/type";
// import { RealtimeClient } from "@supabase/realtime-js";
// import { toast } from "react-toastify";
// import { supabase, API_KEY, REALTIME_URL } from "@/utils/supabase/client";
// import { randomUUID } from "crypto";

// const client = new RealtimeClient(REALTIME_URL, {
//   params: {
//     apikey: API_KEY.toString(),
//   },
// });

// type Props = {
//   setDiscussionsMessages: React.Dispatch<React.SetStateAction<Message[]>>;
//   receiverId: string;
//   currentUser: User;
//   newMessage: Message;
//   discussionsMessages: Message[];
// };

// const MessageInput = ({
//   setDiscussionsMessages,
//   receiverId,
//   currentUser,
//   newMessage,
//   discussionsMessages,
// }: Props) => {
//   const [message, setMessage] = useState<string>("");
//   // const [newMessage, setNewMessage] = useState<Message>();
//   let messageIds: string[] = [];

//   //* create channel for a room
//   const channel = client.channel(`${receiverId}`, {
//     config: {
//       broadcast: {
//         self: true,
//       },
//       presence: {
//         key: "",
//       },
//     },
//   });

//   //*subscribe to a room channel
//   channel?.subscribe(async (status: string, err: any) => {
//     // Wait for successful connection
//     if (status === "SUBSCRIBED") {
//       console.log(" socket connected");
//       await channel?.send({
//         type: "broadcast",
//         event: "message",
//         payload: newMessage,
//       });
//       const status = await channel.track({ name: currentUser?.name });
//       console.log("status :", status);
//     }

//     if (status === "CHANNEL_ERROR") {
//       console.log(`There was an error subscribing to channel: ${err?.message}`);

//       setTimeout(() => channel.socket.connect(), 100);
//     }

//     if (status === "TIMED_OUT") {
//       console.log("Realtime server did not respond in time.");
//       setTimeout(() => channel.socket.connect(), 100);
//     }

//     if (status === "CLOSED") {
//       console.log("Realtime channel was unexpectedly closed.");
//       setTimeout(() => channel.socket.connect(), 100);
//     }
//   });

//   channel.on("broadcast", { event: "message" }, ({ payload }) => {
//     if (payload && payload.id) {
//       const existingMessage = discussionsMessages?.find(
//         (message) => message.id === payload.id
//       );

//       if (!existingMessage && payload.receiver_room_id === receiverId) {
//         console.log("payload from broadcast", payload);
//         console.log(payload.receiver_room_id === receiverId);
//         setDiscussionsMessages((prev) => [...prev, payload]);
//       }
//     }
//   });

//   //* in case you wan to wubscribe to another channel
//   // const channel = client.channel("presence-test", {
//   //   config: {
//   //     presence: {
//   //       key: "",
//   //     },
//   //   },
//   // });

//   //* check pressence in room channel
//   channel.on("presence", { event: "sync" }, () => {
//     console.log("Online users: ", channel.presenceState());
//     // Get the presence state from the channel, keyed by realtime identifier
//     const presenceState = channel.presenceState();

//     /** transform the presence */
//     const users = Object.keys(presenceState)
//       .map((presenceId) => {
//         const presences = presenceState[presenceId] as unknown as {
//           username: string;
//         }[];
//         return presences.map((presence) => presence.username);
//       })
//       .flat();
//     /** sort and set the users */
//     console.log(users);
//   });

//   //* keep track of who joinned the channel room
//   channel.on("presence", { event: "join" }, ({ newPresences }) => {
//     console.log("New users have joined: ", newPresences);
//     //Listen to presence event for users joining the chat room
//     const presenceMsg = newPresences.map(({ name }) => {
//       return {
//         id: randomUUID(),
//         type: "presence" as const,
//         name,
//         message: "joined" as const,
//       };
//     });
//     console.log(presenceMsg);
//     // setDiscussionsMessages((messages) => [...messages, ...presenceMsg]);
//   });

//   //* keep track of who leaved the channel room
//   channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
//     console.log("Users have left: ", leftPresences);
//     //Listen to presence event for users leaving the chat room
//     const presenceMsg = leftPresences.map(({ username }) => {
//       return {
//         id: randomUUID(),
//         type: "presence" as const,
//         username,
//         message: "left" as const,
//       };
//     });

//     console.log(presenceMsg);
//     // setDiscussionsMessages((messages) => [...messages, ...presenceMsg]);
//   });

//   //* for subscription to another channel to check presence for example
//   // channel.subscribe(async (status) => {
//   //   if (status === "SUBSCRIBED") {
//   //     const status = await channel.track({ user_id: currentUser?.id });
//   //     console.log(status);
//   //   }
//   // });

//   // Unsubscribe when the component unmounts or when no longer needed
//   useEffect(() => {
//     return () => {
//       channel.unsubscribe();
//     };
//   }, []);

//   const sendMessageToDB = async () => {
//     if (message === "" || !receiverId) {
//       return toast.warning("Field cannot be empty", {
//         autoClose: 1000,
//         position: toast.POSITION.TOP_RIGHT,
//         hideProgressBar: true,
//       });
//     }

//     const sendingMessage: Message = {
//       sender_id: currentUser?.id as string,
//       receiver_room_id: receiverId as string,
//       content: message,
//       sender_name: currentUser?.name,
//       phone_number: currentUser?.phone as string,
//     };
//     // setNewMessage(sendingMessage);
//     const { error } = await supabase.from("messages").insert(sendingMessage);
//     setMessage("");
//     if (error) console.log("error inserting messages: ", error);
//   };

//   const handlekeydown = async (event: any) => {
//     if (event.key === "Enter") await sendMessageToDB();
//   };
//   return (
//     <div className=" w-full flex items-center justify-center gap-3 ">
//       <ToastContainer />
//       <input
//         type="text"
//         className="w-full focus:outline-none h-fit my-2 text-[14px]outline-none text-gray-600 p-3 rounded-md"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//         onKeyDown={handlekeydown}
//       />

//       <button className="text-3xl " onClick={sendMessageToDB}>
//         <IoSendSharp />
//       </button>
//     </div>
//   );
// };

// export default React.memo(MessageInput);
