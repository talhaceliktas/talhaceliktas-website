import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useStore } from "../store/store";
import { FaReact } from "react-icons/fa";
import { MdReportGmailerrorred } from "react-icons/md";
import { pages } from "@/app/_utils/constants";

const IDEPage = ({ page }) => {
  const path = usePathname();
  const pathName = path.replace("/", "");

  const pageIsCorrect = pages.some(
    (p) => p.toLowerCase() === page.toLowerCase(),
  );

  const router = useRouter();
  const { removePage } = useStore();

  const handleRemovePage = (page) => {
    removePage(page, (remainingPages) => {
      if (page.toLowerCase() === pathName) {
        if (remainingPages.length > 0) {
          router.push(
            `/${remainingPages[remainingPages.length - 1].toLowerCase()}`,
          );
        } else {
          router.push("/");
        }
      }
    });
  };

  return (
    <div className="ide-pages relative flex items-center justify-between border-2 border-gray-800 text-base md:text-xl">
      <Link
        href={`/${page.toLowerCase()}`}
        className={`mr-4 flex flex-1 items-center gap-x-2 py-2 pl-2 md:mr-6 ${
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
          <span className="absolute bottom-0 left-0 h-[1px] w-full bg-white"></span>
        )}
      </Link>
      <button
        className="text-primary-600 mr-2 cursor-pointer"
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
