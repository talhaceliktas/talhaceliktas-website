"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import NavLink from "./NavLink";
import MobileNavs from "./MobileNavs";

gsap.registerPlugin(SplitText);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 z-10 flex h-20 w-full items-center justify-between px-4 md:justify-around md:px-0">
      <Link href="#" className="font-moneral logo text-[2.5rem] font-light">
        celiktas
      </Link>

      <div className="font-moneral hidden gap-x-6 text-[1.3rem] font-normal md:flex">
        <NavLink href="about">About</NavLink>
        <NavLink href="portfolio">Portfolio</NavLink>
        <NavLink href="skills">Skills</NavLink>
        <NavLink href="contact">Contact</NavLink>
        <NavLink href="playground">Playground</NavLink>
      </div>

      <a
        href="https://github.com/talhaceliktas"
        target="_blank"
        rel="noopener noreferrer"
        className="font-open-sans relative hidden items-center justify-center gap-x-2 overflow-hidden text-xl font-semibold text-blue-400 duration-300 hover:text-blue-500 md:flex"
      >
        <FiGithub size={30} />
        GitHub
      </a>

      <button
        className="z-50 flex h-8 w-8 flex-col items-center justify-center gap-1 md:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
          }`}
        />
      </button>

      <MobileNavs
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </nav>
  );
};

export default Navbar;
