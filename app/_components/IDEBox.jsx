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
        "-=0.2",
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
        "-=0.7",
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
        "+=0.1",
      );
  });

  return (
    <div className="ide-box mx-auto my-0 mt-60 flex h-[400px] max-w-[1280px] flex-col gap-y-2 rounded-md bg-[#282C34]">
      <IDEButtons />
      <IDEPages />
      <IDELocation />

      <div>{children}</div>
    </div>
  );
};

export default IDEBox;
