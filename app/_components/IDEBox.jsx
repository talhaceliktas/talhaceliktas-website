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
import IDETerminal from "./IDETerminal";
import Footer from "./Footer";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrambleTextPlugin);

const IDEBox = ({ children }) => {
  const path = usePathname();
  const pathName = path.replace("/", "");

  const { ideIsFullScreen, changeIdeIsFullScreen } = useStore();
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
          onComplete: () =>
            toast(
              (t) => (
                <p>
                  You can make the screen full-screen with the{" "}
                  <span className="mr-2 inline-block h-4 w-4 rounded-full bg-[#36C748]"></span>
                  or click
                  <button
                    className={`hover:bg-primary-600 ml-2 cursor-pointer rounded px-2 py-1 text-white duration-300 ${ideIsFullScreen ? "bg-primary-500" : "bg-gray-400"}`}
                    onClick={() => {
                      changeIdeIsFullScreen();
                      toast.dismiss(t.id);
                    }}
                  >
                    FullScreen
                  </button>
                </p>
              ),
              { duration: 5000 },
            ),
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
      width: "100%",
      transformOrigin: "50% 50%",
    })
      .to(
        ".ide-box-outside",
        {
          paddingTop: ideIsFullScreen ? "80px" : "160px",
        },
        0,
      )
      .to(
        boxRef.current,
        {
          maxWidth: ideIsFullScreen ? "100vw" : "1280px",
          maxHeight: ideIsFullScreen
            ? `calc(100dvh - 80px)`
            : window.innerWidth > 798
              ? "600px"
              : "500px",
        },
        0,
      );
  }, [ideIsFullScreen]);

  return (
    <div className={`ide-box-outside`}>
      <div
        ref={boxRef}
        className="ide-box bg-primary-700 font-jetbrains-mono mx-auto my-0 flex h-[4000px] min-w-[300px] flex-col gap-y-2 rounded-md"
      >
        <IDEButtons />

        <IDEPages />
        <IDELocation />
        <div
          className={`ide-box-children relative flex flex-1 overflow-x-hidden scroll-auto px-3 ${
            ideIsFullScreen
              ? "text-2xl sm:text-3xl md:text-4xl"
              : "text-xl sm:text-2xl md:text-3xl"
          }`}
        >
          {children}
        </div>
        <div className="bg-primary-800 flex flex-col gap-y-3 pt-2 pb-3">
          <IDETerminal>
            <Footer />
          </IDETerminal>
        </div>
      </div>
    </div>
  );
};

export default IDEBox;
