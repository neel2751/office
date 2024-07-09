import React from "react";

const Button = ({ text, cls, type = "button", onclick, children }) => {
  return (
    <button onClick={onclick} type={type} className={cls}>
      {text}
      {children}
    </button>
  );
};

export default Button;
