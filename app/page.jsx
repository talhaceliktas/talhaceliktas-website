import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div>
        <p className="text-base sm:text-xl md:text-2xl">
          You can navigate between the menus by scrolling through the items
          above. You can switch to full screen using the
          <span className="h-4 w-4 bg-green-400"></span> button.
        </p>
      </div>
      <div className="w- mt-8">
        <p className="text-primary-50 text-base">Quick Links</p>
        <div className="text-primary-500 flex flex-col gap-y-3 divide-y-2 divide-gray-500">
          <Link href="about" className="hover:text-primary-600 duration-300">
            About
          </Link>
          <Link
            href="portfolio"
            className="hover:text-primary-600 duration-300"
          >
            Portfolio
          </Link>
          <Link href="Skills" className="hover:text-primary-600 duration-300">
            Skills
          </Link>
          <Link
            href="Playground"
            className="hover:text-primary-600 duration-300"
          >
            Playground
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
