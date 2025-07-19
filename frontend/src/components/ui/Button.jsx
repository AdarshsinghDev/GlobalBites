import React from "react";
import { Link } from "react-router-dom";

const Button = ({ btnText, btnType, btnIcon }) => {
  return (
    <button
      type={btnType}
      className="flex items-center text-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      <span>{btnText}</span>
    </button>
  );
};

export default Button;
