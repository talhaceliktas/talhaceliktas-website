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
        0,
      )
        .fromTo(
          hoverSplit.chars,
          { yPercent: 100 },
          { yPercent: 0, stagger: 0.02, ease: "power3.out" },
          0,
        )
        .to(
          `#nav-${originalText}`,
          { width: "100%", duration: 0.3, ease: "power3.out" },
          0.25,
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
    <nav className="fixed top-0 left-0 z-10 flex h-20 w-full items-center justify-around">
      <Link href="#" className="font-moneral logo text-[2.5rem] font-light">
        celiktas
      </Link>
      <div className="font-moneral flex gap-x-6 text-[1.3rem] font-normal">
        <Link href="about" className="nav-link relative overflow-hidden">
          About
        </Link>
        <Link href="portfolio" className="nav-link relative overflow-hidden">
          Portfolio
        </Link>
        <Link href="skills" className="nav-link relative overflow-hidden">
          Skills
        </Link>
        <Link href="contact" className="nav-link relative overflow-hidden">
          Contact
        </Link>
      </div>
      <a
        href="https://github.com/talhaceliktas"
        target="_blank"
        rel="noopener noreferrer"
        className="font-open-sans relative flex items-center justify-center gap-x-2 overflow-hidden text-xl font-semibold text-blue-400 duration-300 hover:text-blue-500"
      >
        <FiGithub size={30} />
        GitHub
      </a>
    </nav>
  );
};

export default Navbar;
