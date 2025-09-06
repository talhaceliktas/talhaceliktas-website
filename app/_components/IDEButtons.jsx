"use client";

import { useState } from "react";

const IDEButtons = () => {
  const [onHover, setOnHover] = useState();

  return (
    <div className="flex gap-x-2 mb-3 mt-4 ml-4">
      <button
        className={`bg-[#F84948] w-4 h-4 flex justify-center items-center text-[0.7rem] rounded-full font-bold cursor-pointer ${
          onHover ? "text-[#6A4F1A]" : "text-[#F84948]"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        X
      </button>
      <button
        className={`bg-[#FBBA41] w-4 h-4 flex justify-center items-center text-[0.7rem] rounded-full font-bold cursor-pointer ${
          onHover ? "text-[#6A4F1A]" : "text-[#FBBA41]"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        -
      </button>
      <button
        className={`bg-[#36C748] w-4 h-4 flex justify-center items-center text-[0.7rem] rounded-full font-bold cursor-pointer ${
          onHover ? "text-[#6A4F1A]" : "text-[#36C748]"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        ⤡
      </button>
    </div>
  );
};

export default IDEButtons;
