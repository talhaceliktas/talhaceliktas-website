"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";

gsap.registerPlugin(ScrambleTextPlugin);

const skillsData = [
  {
    category: "Frontend Development",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "TailwindCSS",
      "GSAP",
      "Three.js",
    ],
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "C", "C++", "C#"],
  },
  {
    category: "Data Science & AI",
    skills: ["OpenCV", "Pandas", "PyTorch", "NumPy"],
  },
  {
    category: "Database",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Microsoft SQL Server",
      "Supabase",
    ],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "Vercel", "Netlify", "Postman", "Qt"],
  },
  {
    category: "Design & 3D",
    skills: ["Figma", "Blender"],
  },
];

const Page = () => {
  const containerRef = useRef();
  const titleRef = useRef();
  const categoriesRef = useRef([]);

  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
      );

      gsap.to(titleRef.current, {
        duration: 2,
        scrambleText: {
          text: "Skills & Technologies",
          chars: "01",
          revealDelay: 0.5,
          tweenLength: false,
        },
        delay: 0.5,
      });

      gsap.fromTo(
        categoriesRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          delay: 1,
        },
      );

      const skillItems = containerRef.current.querySelectorAll(".skill-item");
      gsap.fromTo(
        skillItems,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          delay: 1.5,
        },
      );
    },
    { scope: containerRef },
  );

  const handleSkillHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleSkillLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCategoryHover = (e) => {
    const skillItems = e.currentTarget.querySelectorAll(".skill-item");
    gsap.to(skillItems, {
      y: -5,
      duration: 0.3,
      stagger: 0.02,
      ease: "power2.out",
    });
  };

  const handleCategoryLeave = (e) => {
    const skillItems = e.currentTarget.querySelectorAll(".skill-item");
    gsap.to(skillItems, {
      y: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: "power2.out",
    });
  };

  return (
    <div ref={containerRef} className="w-full px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h1
          ref={titleRef}
          className="text-primary-100 mb-16 text-center text-4xl font-bold md:text-5xl lg:text-6xl"
        >
          Skills
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {skillsData.map((category, index) => (
            <div
              key={category.category}
              ref={(el) => (categoriesRef.current[index] = el)}
              className="bg-primary-800 text-primary-700 rounded-2xl border p-6 transition-all duration-300 md:p-8"
              onMouseEnter={handleCategoryHover}
              onMouseLeave={handleCategoryLeave}
            >
              <h2 className="text-primary-200 mb-6 text-center text-xl font-semibold md:text-2xl">
                {category.category}
              </h2>

              <div className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="skill-item bg-primary-700 text-primary-100 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg md:text-base"
                    onMouseEnter={handleSkillHover}
                    onMouseLeave={handleSkillLeave}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <div
                  className="h-1 w-12 rounded-full"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary-400), var(--color-primary-300))`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-primary-400 h-2 w-2 animate-pulse rounded-full opacity-60"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
