"use client";

import { useEffect } from "react";
import { FaGithub, FaHeart, FaInstagram, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/all";
import { MdMail } from "react-icons/md";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Physics2DPlugin);

const Footer = () => {
  useEffect(() => {
    const footerHeart = document.getElementById("footerHeart");

    const handleClick = () => {
      const dotCount = gsap.utils.random(15, 30, 1);
      const colors = ["#EE4B2B", "#D22B2B", "#fffce1"];

      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        document.body.appendChild(dot);

        gsap.set(dot, {
          position: "fixed",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: gsap.utils.random(colors),
          top: event.clientY,
          left: event.clientX,
          scale: 0,
          pointerEvents: "none",
          zIndex: 9999,
        });

        gsap
          .timeline({
            onComplete: () => dot.remove(),
          })
          .to(dot, {
            scale: gsap.utils.random(0.3, 1),
            duration: 0.3,
            ease: "power3.out",
          })
          .to(
            dot,
            {
              duration: 2,
              physics2D: {
                velocity: gsap.utils.random(500, 1000),
                angle: gsap.utils.random(0, 360),
                gravity: 1500,
              },
              autoAlpha: 0,
              ease: "none",
            },
            "<",
          );
      }
    };

    footerHeart?.addEventListener("click", handleClick);
    return () => footerHeart?.removeEventListener("click", handleClick);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    gsap.set(".contacts > a", { autoAlpha: 0 });
    tl.from(
      ".contacts > a",
      {
        keyframes: {
          "0%": {
            x: -130,
            y: 0,
            scale: 0.2,
          },
          "50%": {
            y: -50,
          },
          "100%": {
            x: 0,
            y: 0,
            rotate: 360,
            autoAlpha: 1,
            scale: 1,
          },
        },
        stagger: 0.2,
      },
      1,
    );
  }, []);

  return (
    <div className="fixed bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-y-2">
      <div className="contacts flex items-center justify-center gap-x-2">
        <a
          href="mailto:celiktas.talha@icloud.com"
          target="_blank"
          className="text-primary-50 hover:text-primary-300 duration-300"
        >
          <MdMail size={30} />
        </a>
        <a
          href="https://github.com/talhaceliktas"
          target="_blank"
          className="text-primary-50 hover:text-primary-300 duration-300"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.instagram.com/sl3epwy/"
          target="_blank"
          className="text-primary-50 hover:text-primary-300 duration-300"
        >
          <FaInstagram size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/talhaceliktas/"
          target="_blank"
          className="text-primary-50 hover:text-primary-300 duration-300"
        >
          <FaLinkedin size={30} />
        </a>
      </div>

      <div className="flex items-center gap-x-2">
        coded with
        <FaHeart
          id="footerHeart"
          className="cursor-pointer"
          fill="red"
          size={20}
        />
      </div>
    </div>
  );
};

export default Footer;
