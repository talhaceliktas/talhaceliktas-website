"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText } from "gsap/all";
import { findNavLocation } from "../_utils/helper";
import Link from "next/link";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const Intro = ({ setIntroIsVisible, introIsVisible }) => {
  const [visible, setVisible] = useState(introIsVisible);

  useEffect(() => {
    document.fonts.ready.then(() => {
      initAnimation();
    });
  }, []);

  function initAnimation() {
    let name = SplitText.create(".name", { type: "words, chars" });
    let surname = SplitText.create(".surname", { type: "words, chars" });

    const tl = gsap.timeline();

    tl.from(name.chars, {
      y: () => (Math.random() < 0.5 ? -120 : 120),
      stagger: 0.2,
      ease: "power1.out",
    })
      .to(".name-underline", { width: "100%", duration: 0.3 }, "-=0.3")
      .from(surname.chars, {
        y: () => (Math.random() < 0.5 ? -120 : 120),
        stagger: 0.2,
        ease: "power1.out",
      })
      .to(name.chars, {
        scrambleText: { text: "", chars: "XO" },
        stagger: { each: 0.1, from: "random" },
      })
      .to(".surname", {
        x: () => findNavLocation().x,
        y: () => findNavLocation().y,
        duration: 1,
        fontSize: "2.5rem",
      });

    surname.chars.forEach((char, i) => {
      tl.to(
        char,
        {
          scrambleText: { text: "celiktas"[i], chars: "XO" },
          duration: 0.05,
        },
        `${!i ? ">" : "<-0.1"}`
      );
    });

    tl.to(".intro", {
      autoAlpha: 0,
      duration: 1,
      onComplete: () => {
        setVisible(false);
        setIntroIsVisible(false);
      },
    });
  }

  if (!visible) return null;

  return (
    <div className="fixed bg-background z-50 intro">
      <div className="flex flex-col gap-y-3 h-screen w-screen justify-center items-center relative">
        <h3 className="text-9xl font-light overflow-hidden relative font-moneral name">
          TALHA
          <span className="absolute left-4 bottom-0 w-0 h-[1px] bg-white name-underline"></span>
        </h3>
        <Link
          href="#"
          className="text-9xl font-light overflow-hidden font-moneral surname"
        >
          CELIKTAS
        </Link>
      </div>
    </div>
  );
};

export default Intro;
