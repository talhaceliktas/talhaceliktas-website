"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools, SplitText } from "gsap/all";
import React from "react";
import AboutAnimation from "../_lib/tree/AboutAnimation";

gsap.registerPlugin(SplitText, GSDevTools);

const Page = () => {
  useGSAP(() => {
    const tl = gsap.timeline({});

    GSDevTools.create({ animation: tl });
  });

  return (
    <div className="about-div flex w-[100vw]">
      <p className="about-text">
        Hi, there! I'm, a Full Stack Developer who loves turning ideas into
        reality. Hey there! I'm Talha, a Full Stack Developer who loves turning
        ideas into reality. dfdf sdf sdf sdf
      </p>
      <div className="w-[300px]">
        <AboutAnimation />
      </div>
    </div>
  );
};

export default Page;
