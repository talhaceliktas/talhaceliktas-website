"use client";

import React, { useState } from "react";
import IDEButtons from "./IDEButtons";
import IDEPages from "./IDEPages";
import IDELocation from "./IDELocation";

const IDEBox = ({ openedPages, setOpenedPages, children }) => {
  return (
    <div className="mt-60 flex justify-center my-0 mx-auto max-w-[1280px] p-10 bg-[#282C34] rounded-md relative">
      <IDEButtons />
      <IDEPages openedPages={openedPages} setOpenedPages={setOpenedPages} />
      <IDELocation />
      <div>{children}</div>
    </div>
  );
};

export default IDEBox;
