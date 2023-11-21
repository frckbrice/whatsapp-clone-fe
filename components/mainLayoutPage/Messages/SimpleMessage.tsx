import Image from "next/image";
import React from "react";

type SimpleProps = {
  content: string;
  styleStyle: string;
  time?: string;
};

const SimpleMessage = (props: SimpleProps) => {
  console.log('props. constent', props.content)
  return (
    <div className={`box ${props.styleStyle}`}>
      <div className=" flex flex-col gap-1">
        <p> {props.content}</p>
        <span className=" flex justify-end">{props.time}</span>
      </div>
    </div>
  );
};

export default React.memo(SimpleMessage);
