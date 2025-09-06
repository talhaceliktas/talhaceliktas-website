"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText } from "gsap/all";
import { findNavLocation } from "../_utils/helper";
import Link from "next/link";
import { useStore } from "../store/store";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const Intro = () => {
  const { setIntroIsVisible, introIsVisible } = useStore();

  useEffect(() => {
    document.fonts.ready.then(() => {
      initAnimation();
    });
  }, []);

  if (!introIsVisible) return null;

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
        `${!i ? ">" : "<-0.1"}`,
      );
    });

    tl.to(".intro", {
      autoAlpha: 0,
      duration: 1,
      onComplete: () => {
        setIntroIsVisible(false);
      },
    });
  }

  if (!setIntroIsVisible) return null;

  return (
    <div className="bg-background intro fixed z-50">
      <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-y-3">
        <h3 className="font-moneral name relative overflow-hidden text-9xl font-light">
          TALHA
          <span className="name-underline absolute bottom-0 left-4 h-[1px] w-0 bg-white"></span>
        </h3>
        <Link
          href="#"
          className="font-moneral surname overflow-hidden text-9xl font-light"
        >
          CELIKTAS
        </Link>
      </div>
      <button
        className="fixed right-5 bottom-5 cursor-pointer"
        onClick={() => setIntroIsVisible(false)}
      >
        skip intro?
      </button>
    </div>
  );
};

export default Intro;
