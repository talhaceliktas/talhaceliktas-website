"use client";

import AboutAnimation from "../_lib/tree/AboutAnimation";
import { useGSAP } from "@gsap/react";
import { GSDevTools, ScrambleTextPlugin } from "gsap/all";
import gsap from "gsap";
import { LuTextCursor } from "react-icons/lu";
import { useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin, GSDevTools);

const Page = () => {
  const helperText1 = useRef();
  const helperText2 = useRef();
  const helperText3 = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".cursor", {
      opacity: 0,
      repeat: 500,
      yoyo: true,
      duration: 1,
    });

    // Hi There..! - I'am Talha Celiktas.

    tl.to(
      helperText1.current,
      {
        duration: 1.2,
        scrambleText: "Hi there..!",
        yoyo: true,
        repeat: 1,
        delay: 0.5,
      },
      0,
    ).to(
      helperText1.current,
      {
        duration: 1.2,
        scrambleText: "I'm Talha Celiktas",
        yoyo: true,
        repeat: 1,
        delay: 0.5,
        repeatDelay: 1,
      },
      ">",
    );

    GSDevTools.create({ animation: tl });
  });
  // Text
  //  I'm Talha, a Ful Stack Developer who loves turning ideas into reality.
  //   I specialize in building responsive, user-friendly web applications and
  //   exploring new technologies to create innovative solutions. Whether it's
  //   designing intuitive interfaces or optimizing backend performance, I
  //   enjoy every step of the development process.

  return (
    <div className="about-div flex w-full justify-between gap-x-2">
      <p className="about-text text-base md:text-2xl md:leading-10 lg:text-4xl lg:leading-14">
        <span className="inline-flex items-center">
          <span ref={helperText1}>&#8203;</span>
          <span ref={helperText2}></span>
          <span ref={helperText3}></span>
          <LuTextCursor className="cursor ml-1 text-xl md:text-3xl lg:text-4xl" />
        </span>
      </p>
      <div className="w-28 sm:w-44 md:w-96">
        <AboutAnimation />
      </div>
    </div>
  );
};

export default Page;
