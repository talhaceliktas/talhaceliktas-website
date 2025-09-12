"use client";

import React from "react";
import AboutAnimation from "../_lib/tree/AboutAnimation";

const Page = () => {
  return (
    <div className="about-div flex w-full gap-x-2">
      <p className="about-text text-base md:text-2xl">
        Hi there! I'm Talha, a Full Stack Developer who loves turning ideas into
        reality. I specialize in building responsive, user-friendly web
        applications and exploring new technologies to create innovative
        solutions. Whether it's designing intuitive interfaces or optimizing
        backend performance, I enjoy every step of the development process.
      </p>
      <div className="w-28 sm:w-44 md:w-96">
        <AboutAnimation />
      </div>
    </div>
  );
};

export default Page;
