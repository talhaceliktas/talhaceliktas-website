"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaExternalLinkAlt, FaCertificate } from "react-icons/fa";
import Certifications from "../_components/Certifications.jsx";
import Projects from "../_components/Projects.jsx";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef(null);
  const projectRefs = useRef([]);
  const certRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            {
              opacity: 0,
              y: 50,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                scroller: containerRef.current?.parentElement,
              },
            },
          );
        }
      });

      certRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            {
              opacity: 0,
              x: index % 2 === 0 ? -30 : 30,
              rotation: index % 2 === 0 ? -5 : 5,
            },
            {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 0.6,
              delay: index * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
                toggleActions: "play none none reverse",
                scroller: containerRef.current?.parentElement,
              },
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-7xl space-y-12 p-4">
      <section className="space-y-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Featured Projects
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>
        <Projects projectRefs={projectRefs} />
      </section>
      <Certifications certRefs={certRefs} />
    </div>
  );
};

export default Portfolio;
