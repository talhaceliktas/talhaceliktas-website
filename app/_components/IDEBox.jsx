"use client";

import React, { useState } from "react";
import IDEButtons from "./IDEButtons";
import IDEPages from "./IDEPages";
import IDELocation from "./IDELocation";

const IDEBox = ({ openedPages, setOpenedPages, children }) => {
  return (
    <div className="mt-60 flex my-0 mx-auto max-w-[1280px] bg-[#282C34] rounded-md  h-[400px] flex-col gap-y-2">
      <IDEButtons />
      <IDEPages openedPages={openedPages} setOpenedPages={setOpenedPages} />
      <IDELocation />

      <div>{children}</div>
    </div>
  );
};

export default IDEBox;
