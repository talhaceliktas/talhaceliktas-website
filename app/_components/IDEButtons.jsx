"use client";

import { useState } from "react";
import { useStore } from "../store/store";
import toast from "react-hot-toast";

const IDEButtons = () => {
  const [onHover, setOnHover] = useState();
  const { changeIdeIsFullScreen } = useStore();

  return (
    <div className="mt-4 mb-3 ml-4 flex gap-x-2">
      <button
        className={`ide-button flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-[#F84948] text-[0.7rem] font-bold ${
          onHover ? "text-[#6A4F1A]" : "text-[#F84948]"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        onClick={() => toast.error("I wouldn’t recommend doing this. 🤔")}
      >
        X
      </button>
      <button
        className={`ide-button flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-[#FBBA41] text-[0.7rem] font-bold ${
          onHover ? "text-[#6A4F1A]" : "text-[#FBBA41]"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        onClick={() =>
          toast.error(
            "If you minimize the IDE, there’s no point in staying here, right? 😂",
          )
        }
      >
        -
      </button>
      <button
        className={`ide-button flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-[#36C748] text-[0.7rem] font-bold ${
          onHover ? "text-[#6A4F1A]" : "text-[#36C748]"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        onClick={changeIdeIsFullScreen}
      >
        ⤡
      </button>
    </div>
  );
};

export default IDEButtons;
