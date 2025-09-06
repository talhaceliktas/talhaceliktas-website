import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useStore } from "../store/store";
import { FaReact } from "react-icons/fa";
import { MdReportGmailerrorred } from "react-icons/md";
const pages = ["about", "portfolio", "skills", "contact"];

const IDEPage = ({ page }) => {
  const path = usePathname();
  const pathName = path.replace("/", "");

  const pageIsCorrect = pages.includes(page.toLowerCase());

  const router = useRouter();
  const { removePage } = useStore();

  const handleRemovePage = (page) => {
    removePage(page, (remainingPages) => {
      if (page.toLowerCase() === pathName) {
        if (remainingPages.length > 0) {
          router.push(
            `/${remainingPages[remainingPages.length - 1].toLowerCase()}`
          );
        } else {
          router.push("/");
        }
      }
    });
  };

  return (
    <div className="flex items-center border-2 border-gray-800 justify-between relative ide-pages">
      <Link
        href={`/${page.toLowerCase()}`}
        className={`flex gap-x-2 py-2 pr-6 pl-2 items-center flex-1 ${
          !pageIsCorrect && "text-red-500"
        }`}
      >
        {pageIsCorrect ? (
          <>
            <FaReact />
            {page}
          </>
        ) : (
          <>
            <MdReportGmailerrorred />
            Error
          </>
        )}
        {page.toLowerCase() === pathName && (
          <span className="w-full h-[1px] bottom-0 left-0 bg-white absolute"></span>
        )}
      </Link>
      <button
        className="cursor-pointer text-[#585c64] mr-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleRemovePage(page);
        }}
      >
        X
      </button>
    </div>
  );
};

export default IDEPage;
