import Image from "next/image";
import React from "react";

type SimpleProps = {
  content: string;
  styleStyle: string;
};

export const SimpleMessage = (props: SimpleProps) => {
  return <div className={`box ${props.styleStyle}`}>{props.content}</div>;
};
