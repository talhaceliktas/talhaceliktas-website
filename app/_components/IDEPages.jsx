import React from "react";
import { FaReact } from "react-icons/fa";

const IDEPages = ({ openedPages, setOpenedPages }) => {
  function closePage(pageName) {
    setOpenedPages((pages) => pages.filter((page) => page.name !== pageName));
  }

  return (
    <div className="absolute left-0 flex items-center text-xl text-react-blue bg-[#1f2228]">
      {openedPages.map((page) =>
        page.opened ? (
          <div
            key={page.name}
            className="flex items-center border-2 border-gray-800 justify-between"
          >
            <div className="flex gap-x-2 py-2 pr-6 pl-2 items-center">
              <FaReact /> {page.name}
            </div>
            <button
              className="cursor-pointer text-[#585c64] mr-2"
              onClick={() => closePage(page.name)}
            >
              X
            </button>
          </div>
        ) : null
      )}
    </div>
  );
};

export default IDEPages;
