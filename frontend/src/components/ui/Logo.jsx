import React from "react";
import { ChefHat } from "lucide-react";

const Logo = ({ logoStyle, logoIconSize, logoIconPad }) => {
  return (
    <div className={`flex items-center justify-center mb-4`}>
      <div className={`bg-green-500 p-3 rounded-full mr-3 shadow-lg ${logoIconPad}`}>
        <ChefHat className="text-white" size={logoIconSize} />
      </div>
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
