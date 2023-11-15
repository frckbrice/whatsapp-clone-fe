import Image from "next/image";
import React from "react";

type Props = {
  content: string;
  styleS: string;
};

export default function FollowingMessagesSimple(props: Props) {
  return (
    <div className={props.styleS}>
      <p> {props.content}</p>
    </div>
  );
}
