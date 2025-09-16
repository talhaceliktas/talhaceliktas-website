"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import NavLink from "./NavLink";
import MobileNavs from "./MobileNavs";
import MobileNavButton from "./MobileNavButton";

gsap.registerPlugin(SplitText);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animationsRef = useRef([]);
  const splitTextsRef = useRef([]);

  const cleanupAnimations = () => {
    animationsRef.current.forEach(({ timeline, events, element }) => {
      timeline.kill();
      if (events && events.length > 0) {
        events.forEach(({ event, handler }) => {
          element.removeEventListener(event, handler);
        });
      }
    });
    animationsRef.current = [];

    splitTextsRef.current.forEach((splitText) => {
      if (splitText && splitText.revert) {
        splitText.revert();
      }
    });
    splitTextsRef.current = [];
  };

  useEffect(() => {
    const checkMobile = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 768;

      setIsMobile(nowMobile);

      if (wasMobile !== nowMobile) {
        cleanupAnimations();
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      cleanupAnimations();
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      cleanupAnimations();
      return;
    }

    cleanupAnimations();

    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      const originalText = link.dataset.original || link.textContent.trim();
      const hoverText = link.dataset.hover || originalText;

      link.dataset.original = originalText;

      link.innerHTML = `
        <span class="original split relative z-10">${originalText}</span>
        <span class="hover split absolute left-0 top-0 z-10">${hoverText}</span>
        <span id="nav-${originalText.replace(/\s+/g, "-")}" class="absolute left-0 bottom-1 h-[1px] w-0 bg-white z-20"></span>
      `;

      const originalSplit = SplitText.create(link.querySelector(".original"), {
        type: "chars",
      });
      const hoverSplit = SplitText.create(link.querySelector(".hover"), {
        type: "chars",
      });

      splitTextsRef.current.push(originalSplit, hoverSplit);

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
          `#nav-${originalText.replace(/\s+/g, "-")}`,
          { width: "100%", duration: 0.3, ease: "power3.out" },
          0.25,
        );

      const handleMouseEnter = () => gsap.delayedCall(0.15, () => tl.play());
      const handleMouseLeave = () => tl.reverse();

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);

      animationsRef.current.push({
        timeline: tl,
        element: link,
        events: [
          { event: "mouseenter", handler: handleMouseEnter },
          { event: "mouseleave", handler: handleMouseLeave },
        ],
      });
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
        <NavLink href="playground">Playground</NavLink>
      </div>

      <div className="hidden items-center justify-center gap-x-6 md:flex">
        <a
          href="https://github.com/talhaceliktas"
          target="_blank"
          rel="noopener noreferrer"
          className="font-open-sans text-primary-300 hover:text-primary-400 relative hidden items-center justify-center gap-x-2 overflow-hidden text-xl font-semibold duration-300 md:flex"
        >
          <FiGithub size={30} />
          GitHub
        </a>
        <a
          href="/TalhaCeliktasCV.pdf"
          download
          className="bg-primary-400 text-primary-700 hover:bg-primary-500 cursor-pointer rounded-xl px-3 py-2 text-lg duration-300"
        >
          Download CV
        </a>
      </div>

      <MobileNavButton
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <MobileNavs
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </nav>
  );
};

export default Navbar;
