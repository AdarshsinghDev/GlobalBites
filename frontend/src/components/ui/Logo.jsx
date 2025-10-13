import React from "react";

const Logo = ({ logoStyle}) => {
  return (
    <div className={`flex items-center justify-center`}>
      <h1 className={`text-3xl font-bold ${logoStyle}`}>
        <span className="bg-green-500 text-white pl-1 rounded-tl-xl">
          Global
        </span>
        <span className="text-green-500 bg-white pr-1 rounded-br-xl">
          Bites
        </span>
      </h1>
    </div>
  );
};

export default Logo;
