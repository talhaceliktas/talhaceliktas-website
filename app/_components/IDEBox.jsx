"use client";

import React from "react";
import IDEButtons from "./IDEButtons";
import IDEPages from "./IDEPages";
import IDELocation from "./IDELocation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrambleTextPlugin);

const IDEBox = ({ children }) => {
  const path = usePathname();
  const pathName = path.replace("/", "");

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power2.out" },
    });

    tl.from(".ide-box", { opacity: 0, y: 50 })
      .from(
        ".ide-button",
        {
          autoAlpha: 0,
          stagger: 0.2,
        },
        "-=0.2"
      )
      .from(".ide-pages", { xPercent: 100, stagger: 0.2, autoAlpha: 0 })
      .from(
        ".ide-location",
        {
          xPercent: -10,
          opacity: 0,
          duration: 1,
          ease: "back(2)",
        },
        "-=0.7"
      )
      .to(".about-title-1", {
        scrambleText: {
          text: `app > ${!!pathName ? `${pathName} >` : ""}`,
          chars: "XO",
          revealDelay: 0.1,
          speed: 0.2,
        },
      })
      .to(
        ".about-title-2",
        {
          scrambleText: {
            text: "page.jsx",
            chars: "XO",
            revealDelay: 0.1,
            speed: 0.2,
          },
        },
        "+=0.1"
      );
  });

  return (
    <div className="mt-60 flex my-0 mx-auto max-w-[1280px] bg-[#282C34] rounded-md h-[400px] flex-col gap-y-2 ide-box">
      <IDEButtons />
      <IDEPages />
      <IDELocation />

      <div>{children}</div>
    </div>
  );
};

export default IDEBox;
