"use client";

import AboutAnimation from "../_components/AboutAnimation";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin, SplitText } from "gsap/all";
import gsap from "gsap";
import { LuTextCursor } from "react-icons/lu";
import { useRef, useState } from "react";
import { useStore } from "../store/store";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

const Page = () => {
  const helperText1 = useRef();
  const helperText2 = useRef();
  const fullText = useRef();
  const [animationIsFinished, setAnimationIsFinished] = useState(false);

  const { ideIsFullScreen } = useStore();

  const sentences = [
    "Full Stack Developer",
    "UI/UX Designer",
    "React & Next.js",
    "TypeScript Expert",
  ];

  let mainTl = useRef();

  useGSAP(() => {
    setAnimationIsFinished(false);

    mainTl.current = gsap.timeline();

    const tl1 = gsap.timeline();

    gsap.fromTo(
      ".cursor-1, .cursor-2",
      { opacity: 0.6 },
      {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      },
    );

    tl1
      .to(
        helperText1.current,
        {
          duration: 1.2,
          scrambleText: "Hi there..!",
          yoyo: true,
          repeat: 1,
          delay: 0.5,
          chars: "01XO",
        },
        0,
      )
      .to(helperText1.current, {
        duration: 1.2,
        scrambleText: "I'm Talha Celiktas",
        delay: 0.5,
        chars: "01XO",
        ease: "power2.out",
        onStart: () => {
          gsap.fromTo(
            helperText1.current,
            { color: "#e23be4" },
            { color: "#4e85f2", duration: 1 },
          );
        },
      })
      .to(".cursor-1", { autoAlpha: 0 }, ">");

    const tl2 = gsap.timeline({ repeat: -1 });
    tl2.to(".cursor-2", { autoAlpha: 1 }, ">");
    sentences.forEach((sentence) => {
      tl2.to(
        helperText2.current,
        {
          duration: 1,
          scrambleText: { text: sentence, chars: "<>{}[]#!?" },
          ease: "power1.inOut",
          color: "#3a9cb9",
        },
        ">",
      );
      tl2.to({}, { duration: 2 });
    });

    let split = SplitText.create(fullText.current, { type: "words" });
    const tl3 = gsap.timeline();
    tl3.from(split.words, {
      y: 60,
      autoAlpha: 0,
      color: "#3a9cb9",
      filter: "blur(6px)",
      stagger: 0.05,
      ease: "power3.out",
      onComplete: () => setAnimationIsFinished(true),
    });

    mainTl.current.add(tl1);
    mainTl.current.add(tl2);
    mainTl.current.add(tl3, "<+1");
  });

  const skipAnimation = () => {
    if (mainTl.current) {
      mainTl.current.progress(1);
      setAnimationIsFinished(true);

      const skipTl = gsap.timeline();

      sentences.forEach((sentence) => {
        skipTl.to(
          helperText2.current,
          {
            duration: 1,
            scrambleText: { text: sentence, chars: "<>{}[]#!?" },
            ease: "power1.inOut",
            color: "#3a9cb9",
          },
          ">",
        );
        skipTl.to({}, { duration: 2 });
      });
    }
  };

  return (
    <div className="about-div text-primary-50 relative flex w-full justify-between gap-x-2">
      <div className="flex min-w-0 flex-1 flex-col space-y-2">
        <div className="flex items-center">
          <span
            ref={helperText1}
            className={`text-lg whitespace-nowrap ${ideIsFullScreen ? "md:text-4xl lg:text-6xl" : "md:text-2xl lg:text-4xl"}`}
          >
            &#8203;
          </span>
          <LuTextCursor className="cursor-1 ml-1 flex-shrink-0 text-lg md:text-2xl lg:text-3xl" />
        </div>
        <div className="flex items-center">
          <span
            ref={helperText2}
            className={`text-sm md:text-xl lg:text-2xl ${
              ideIsFullScreen
                ? "sm:text-lg md:text-2xl lg:text-3xl"
                : "md:text-2xl"
            } min-w-0 truncate`}
          />
          <LuTextCursor className="cursor-2 invisible ml-1 flex-shrink-0 text-lg md:text-xl lg:text-2xl" />
        </div>
        <div
          className={`md:text-base" mt-5 text-sm ${ideIsFullScreen ? "lg:text-2xl" : "lg:text-xl"}`}
        >
          <p ref={fullText}>
            I'm Talha, a Full Stack Developer who loves turning ideas into
            reality. I specialize in building responsive, user-friendly web
            applications and exploring new technologies to create innovative
            solutions. Whether it's designing intuitive interfaces or optimizing
            backend performance, I enjoy every step of the development process.
          </p>
        </div>
        {!animationIsFinished && (
          <div className="relative flex-1">
            <button
              onClick={skipAnimation}
              className="absolute right-4 bottom-4 cursor-pointer px-3 py-1 text-sm text-white duration-300 hover:bg-gray-600"
            >
              skip animation?
            </button>
          </div>
        )}
      </div>
      <div className="w-28 flex-shrink-0 sm:w-44 md:w-96">
        <AboutAnimation />
      </div>
    </div>
  );
};

export default Page;
