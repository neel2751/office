"use client";
import Link from "next/link";
import React from "react";

const Button = ({
  text,
  cls,
  type = "button",
  onclick,
  disabled = "",
  svgOrder,
  children,
}) => {
  return (
    <button
      onClick={onclick}
      type={type}
      className={`${cls} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      // disabled={disabled}
      disabled={disabled ? disabled : false}
    >
      {svgOrder ? (
        <>
          {text}
          {children}
        </>
      ) : (
        <>
          {children}
          {text}
        </>
      )}
    </button>
  );
};

export const ButtonLink = ({ title, href, cls, order, children }) => {
  return (
    <Link
      href={href || "/"}
      className={`${cls} bg-neutral-800 text-white p-2.5 text-sm rounded-lg cursor-pointer`}
    >
      {order ? (
        <>
          {children}
          {title || "Home"}
        </>
      ) : (
        <>
          {title || "Home"}
          {children}
        </>
      )}
    </Link>
  );
};

export default Button;
