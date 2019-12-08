import React from "react";

const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = props => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
      {...props}
      type="button"
    >
      {props.children}
    </button>
  );
};

export default Button;
