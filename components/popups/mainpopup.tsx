import React from "react";

const Mainpopup = ({ visible }: any, { onClose }: any) => {
  const handleOnclose = (e: any) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;

  return (
    <div
      id="container"
      onClick={handleOnclose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-[400px] h-[50vh] bg-white p-6 rounded"></div>
    </div>
  );
};

export default Mainpopup;
