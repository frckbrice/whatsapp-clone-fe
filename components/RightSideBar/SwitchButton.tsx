import React, { useState } from "react";

const SwitchButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="switch-button">
      <label>
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default SwitchButton;
