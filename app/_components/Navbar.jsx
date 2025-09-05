"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";

gsap.registerPlugin(SplitText);

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      const originalText = link.textContent;
      const hoverText = link.dataset.hover || originalText;

      link.innerHTML = `
      <span class="original split relative z-10">${originalText}</span>
      <span class="hover split absolute left-0 top-0 z-10">${hoverText}</span>
      <span id="nav-${originalText}" class="absolute left-0 bottom-1 h-[1px] w-0 bg-white z-20"></span>
    `;

      const originalSplit = SplitText.create(link.querySelector(".original"), {
        type: "chars",
      });
      const hoverSplit = SplitText.create(link.querySelector(".hover"), {
        type: "chars",
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        originalSplit.chars,
        { yPercent: -100, stagger: 0.02, ease: "power3.out" },
        0
      )
        .fromTo(
          hoverSplit.chars,
          { yPercent: 100 },
          { yPercent: 0, stagger: 0.02, ease: "power3.out" },
          0
        )
        .to(
          `#nav-${originalText}`,
          { width: "100%", duration: 0.3, ease: "power3.out" },
          0.25
        );

      const handleMouseEnter = () => gsap.delayedCall(0.15, () => tl.play());
      const handleMouseLeave = () => tl.reverse();

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex items-center z-10 justify-around">
      <Link href="#" className="text-[2.5rem] font-light font-moneral logo">
        celiktas
      </Link>
      <div className="text-[1.3rem] font-normal font-moneral flex gap-x-6">
        <Link href="about" className="nav-link overflow-hidden relative">
          About
        </Link>
        <Link href="portfolio" className="nav-link overflow-hidden relative">
          Portfolio
        </Link>
        <Link href="skills" className="nav-link overflow-hidden relative">
          Skills
        </Link>
        <Link href="contact" className="nav-link overflow-hidden relative">
          Contact
        </Link>
      </div>
      <a
        href="https://github.com/talhaceliktas"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center gap-x-2 overflow-hidden relative text-xl text-blue-400 font-open-sans font-semibold hover:text-blue-500 duration-300"
      >
        <FiGithub size={30} />
        GitHub
      </a>
    </nav>
  );
};

export default Navbar;
