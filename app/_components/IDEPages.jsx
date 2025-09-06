import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FaReact } from "react-icons/fa";

const IDEPages = ({ openedPages, setOpenedPages }) => {
  const path = usePathname();
  const pathName = path.replace("/", "");

  useEffect(() => {
    setOpenedPages((pages) => {
      const pathLower = pathName.toLowerCase();

      if (pages.some((p) => p.toLowerCase() === pathLower)) return pages;

      const formattedPath =
        pathLower.charAt(0).toUpperCase() + pathLower.slice(1);

      return [...pages, formattedPath];
    });
  }, [pathName, setOpenedPages]);

  function closePage(pageName) {
    setOpenedPages((pages) => pages.filter((page) => page !== pageName));
  }

  return (
    <div className="absolute left-0 flex items-center text-xl text-react-blue bg-[#1f2228]">
      {openedPages.map((page) => (
        <Link
          className="flex items-center border-2 border-gray-800 justify-between relative"
          href={`/${page.toLowerCase()}`}
          key={page}
        >
          <div className="flex gap-x-2 py-2 pr-6 pl-2 items-center">
            <FaReact /> {page}
          </div>
          <button
            className="cursor-pointer text-[#585c64] mr-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closePage(page);
            }}
          >
            X
          </button>
          {page.toLowerCase() === pathName && (
            <span className="w-full h-[1px] bottom-0 left-0 bg-white absolute"></span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default IDEPages;
