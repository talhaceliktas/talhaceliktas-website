"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools, ScrollTrigger, SplitText } from "gsap/all";
import React from "react";

gsap.registerPlugin(SplitText, GSDevTools, ScrollTrigger);

const Page = () => {
  useGSAP(() => {
    const endValue = window.innerWidth < 768 ? "+=1000" : "+=800";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ide-box-children",
        scroller: ".ide-box-children",
        start: "top 0%",
        end: endValue,
        scrub: 1,
        pin: ".about-text",
        markers: true,
      },
    });

    let split = SplitText.create(".about-text", { type: "words" });

    tl.from(split.words, {
      y: 100,
      stagger: 0.2,
      autoAlpha: 0,
    })
      .to(
        ".scroll-to-magic",
        {
          y: -100,
          autoAlpha: 0,
          scale: 2,
          duration: 1,
        },
        0,
      )
      .to(
        ".about-div",
        {
          xPercent: -120,
          duration: 6,
        },
        0,
      );

    GSDevTools.create({ animation: tl });
  });

  return (
    <div className="about-div flex h-[100vh] w-[100vw]">
      <p className="mr-6 ml-10 whitespace-nowrap sm:ml-20 md:ml-40">
        Hey there! I'm Talha
      </p>
      <p className="scroll-to-magic text-base whitespace-nowrap text-red-500">
        Scroll down to see magic
      </p>
      <p className="about-text whitespace-nowrap">
        , a Full Stack Developer who loves turning ideas into reality. Hey
        there! I'm Talha, a Full Stack Developer who loves turning ideas into
        reality.
      </p>
    </div>
  );
};

export default Page;
