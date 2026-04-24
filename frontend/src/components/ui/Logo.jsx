import React from "react";

const Logo = ({ logoStyle = "", size = 56, alt = "GlobalBites Logo" }) => {
  return (
    <div
      className={`flex items-center ${logoStyle}`}
      aria-label="GlobalBites"
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <img
        src="/logo.png"
        alt={alt}
        width={size}
        height={size}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
};

export default Logo;
