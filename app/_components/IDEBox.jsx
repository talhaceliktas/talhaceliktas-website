"use client";

import React, { useEffect, useRef } from "react";
import IDEButtons from "./IDEButtons";
import IDEPages from "./IDEPages";
import IDELocation from "./IDELocation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { usePathname } from "next/navigation";
import { useStore } from "../store/store";

gsap.registerPlugin(ScrambleTextPlugin);

const IDEBox = ({ children }) => {
  const path = usePathname();
  const pathName = path.replace("/", "");

  const { ideIsFullScreen } = useStore();
  const boxRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power2.out" },
    });

    tl.from(".ide-box", { opacity: 0, y: 50 })
      .from(".ide-button", { autoAlpha: 0, stagger: 0.2 }, "-=0.2")
      .from(".ide-pages", { xPercent: 100, stagger: 0.2, autoAlpha: 0 })
      .from(
        ".ide-location",
        { xPercent: -10, opacity: 0, duration: 1, ease: "back(2)" },
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

  useEffect(() => {
    if (!boxRef.current) return;

    const tl = gsap.timeline({
      defaults: {
        ease: "back(2)",
        transformOrigin: "50% 50% 50%",
        duration: 0.8,
      },
    });
    tl.to(boxRef.current, {
      width: ideIsFullScreen ? "95%" : "100%",
      transformOrigin: "50% 50%",
    })
      .to(
        ".ide-box-outside",
        {
          paddingTop: ideIsFullScreen ? "80px" : "240px",
        },
        0,
      )
      .to(
        boxRef.current,
        {
          maxWidth: ideIsFullScreen ? "100vw" : "1280px",
        },
        0,
      );
  }, [ideIsFullScreen]);

  return (
    <div className="ide-box-outside">
      <div
        ref={boxRef}
        className="ide-box bg-primary-700 mx-auto my-0 flex h-[400px] min-w-[300px] flex-col gap-y-2 rounded-md"
      >
        <IDEButtons />
        <IDEPages />
        <IDELocation />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default IDEBox;
