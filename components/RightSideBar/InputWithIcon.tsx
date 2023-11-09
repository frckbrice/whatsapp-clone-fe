import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const InputWithIcon = ({ placeholder }) => {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
      <input type="text" placeholder={placeholder} className="ml-2" />
    </div>
  );
};

export default InputWithIcon;
