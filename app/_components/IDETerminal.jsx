import React from "react";

const IDETerminal = ({ children }) => {
  return (
    <>
      <ul className="text-primary-600 ml-3 flex gap-x-4 text-xs uppercase">
        <li className="cursor-pointer">Problems</li>
        <li className="cursor-pointer">Terminal</li>
        <li className="text-primary-100 cursor-pointer underline">Footer</li>
      </ul>
      {children}
    </>
  );
};

export default IDETerminal;
