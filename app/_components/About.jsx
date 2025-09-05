import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { FaReact } from "react-icons/fa";

gsap.registerPlugin(ScrambleTextPlugin);

const About = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".about-title-1", {
      scrambleText: {
        text: "app > _components > ",
        chars: "XO",
        revealDelay: 0.4,
        speed: 0.5,
      },
    }).to(
      ".about-title-2",
      {
        scrambleText: {
          text: "About.jsx",
          chars: "XO",
          revealDelay: 0.4,
          speed: 0.5,
        },
      },
      ">"
    );
  });

  return (
    <div className=" w-full flex">
      <h2 className="text-xl text-react-blue">
        <span className="about-title-1 ">XOOXOXOXOXOOXO</span>
        <FaReact className="inline mx-4" />
        <span className="about-title-2 ">XOXOXOXOXO</span>
      </h2>
    </div>
  );
};

export default About;
