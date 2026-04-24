import React from "react";

const Button = ({
  btnText,
  btnType = "button",
  btnIcon,
  btnTextColor,
  btnBgColor,
  variant,
  className = "",
  disabled,
  onClick,
}) => {
  const legacyVariant =
    btnBgColor === "green"
      ? "primary"
      : btnBgColor === "red"
      ? "danger"
      : btnBgColor === "blue"
      ? "secondary"
      : null;

  const v = variant || legacyVariant || "primary";

  const base = "gb-btn";
  const styles =
    v === "secondary"
      ? "gb-btn-secondary"
      : v === "ghost"
      ? "gb-btn-ghost"
      : v === "danger"
      ? "inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-gbBtn bg-gb-error text-white hover:opacity-90 transition-opacity"
      : "gb-btn-primary";

  const textOverride =
    btnTextColor === "black"
      ? "text-gb-text"
      : btnTextColor === "gray"
      ? "text-gb-muted"
      : "";

  return (
    <button
      type={btnType}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${styles} ${textOverride} ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {btnIcon}
      <span>{btnText}</span>
    </button>
  );
};

export default Button;
