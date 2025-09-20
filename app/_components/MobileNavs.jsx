import React, { useEffect, useRef } from "react";
import NavLink from "./NavLink";
import { FiGithub } from "react-icons/fi";
import gsap from "gsap";

const MobileNavs = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const githubRef = useRef(null);

  menuItemsRef.current = [];

  const addToRefs = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const menuItems = menuItemsRef.current;
    const github = githubRef.current;

    if (isMobileMenuOpen) {
      const tl = gsap.timeline();

      tl.fromTo(
        overlay,
        {
          opacity: 0,
          backdropFilter: "blur(0px)",
        },
        {
          opacity: 1,
          backdropFilter: "blur(8px)",
          duration: 0.3,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        menuItems,
        {
          y: 50,
          opacity: 0,
          rotationX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.1,
          scale: 1.3,
          ease: "back.out(1.7)",
        },
        0.1,
      );

      tl.fromTo(
        github,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1.3,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.3,
      );
    } else {
      const tl = gsap.timeline();

      tl.to([...menuItems, github], {
        y: -30,
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in",
      });

      tl.to(
        overlay,
        {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.2,
          ease: "power2.in",
        },
        0.1,
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <div
      ref={overlayRef}
      className={`bg-opacity-95 fixed inset-0 bg-black backdrop-blur-sm md:hidden ${isMobileMenuOpen ? "visible" : "invisible"} `}
      style={{ opacity: 0 }} // Initial opacity 0 for GSAP
    >
      <div className="flex h-full flex-col items-center justify-center space-y-8">
        <div className="font-moneral flex flex-col items-center gap-y-6 text-[1.5rem] font-normal">
          <div ref={addToRefs}>
            <NavLink href="about" onClick={toggleMobileMenu}>
              About
            </NavLink>
          </div>
          <div ref={addToRefs}>
            <NavLink href="portfolio" onClick={toggleMobileMenu}>
              Portfolio
            </NavLink>
          </div>
          <div ref={addToRefs}>
            <NavLink href="skills" onClick={toggleMobileMenu}>
              Skills
            </NavLink>
          </div>
          <div ref={addToRefs}>
            <NavLink href="playground" onClick={toggleMobileMenu}>
              Playground
            </NavLink>
          </div>
          <div ref={addToRefs}>
            <a
              href="/TalhaÇeliktaşCV.pdf"
              download
              className="bg-primary-400 text-primary-700 hover:bg-primary-500 cursor-pointer rounded-xl px-3 py-2 text-lg"
            >
              Download CV
            </a>
          </div>
        </div>

        <a
          ref={githubRef}
          href="https://github.com/talhaceliktas"
          target="_blank"
          rel="noopener noreferrer"
          className="font-open-sans hover:text-primary-400 text-primary-300 mt-10 flex items-center justify-center gap-x-2 text-xl font-semibold transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          <FiGithub size={30} />
          GitHub
        </a>
      </div>
    </div>
  );
};

export default MobileNavs;
