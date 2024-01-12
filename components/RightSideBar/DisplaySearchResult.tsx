import React from "react";
import { useWhatSappContext } from "../context";

type Props = {};

const DisplaySearchResult = (props: Props) => {
  const { messages } = useWhatSappContext();

  return (
    <div className="w-full mx-auto bg-red-800">
      {messages.length
        ? messages?.map((message) => (
            <span key={message.id}>{message.content}</span>
          ))
        : null}
    </div>
  );
};

export default DisplaySearchResult;
