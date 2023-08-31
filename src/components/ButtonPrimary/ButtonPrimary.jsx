import s from "./style.module.css";
import React from "react";

export default function ButtonPrimary({
  className,
  type,
  children,
  onClick,
  isDisabled,
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={`btn btn-primary ${s.button} ${className}`}
    >
      {children}
    </button>
  );
}
