import React from "react";
import { Link } from "react-router-dom";

const Button = ({ btnText, btnType, btnIcon, btnTextColor, btnBgColor }) => {
  const bgColors = {
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  const textColors = {
    white: "text-white",
    black: "text-black",
    gray: "text-gray-700",
  };
  return (
    <button
      type={btnType}
      className={`flex items-center text-center justify-center space-x-2 px-4 py-2 text-sm font-medium ${textColors[btnTextColor]} ${bgColors[btnBgColor]}  rounded-sm transition-colors duration-200 shadow-sm hover:shadow-md`}
    >
      <span>{btnText}</span>
    </button>
  );
};

export default Button;
