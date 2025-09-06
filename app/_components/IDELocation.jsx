import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { usePathname } from "next/navigation";
import { FaReact } from "react-icons/fa";

gsap.registerPlugin(ScrambleTextPlugin);

const IDELocation = () => {
  const path = usePathname();
  const pathName = path.replace("/", "");

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".about-title-1", {
      scrambleText: {
        text: `app > ${!!pathName ? `${pathName} >` : ""}`,
        chars: "XO",
        revealDelay: 0.1,
        speed: 0.2,
      },
    }).to(
      ".about-title-2",
      {
        scrambleText: {
          text: "page.jsx",
          chars: "XO",
          revealDelay: 0.1,
          speed: 0.2,
        },
      },
      "+=0.1",
    );
  }, [pathName]);

  return (
    <div className="ide-location ml-3 flex items-center">
      <h2 className="text-md text-primary-300 flex items-center gap-x-2">
        <span className="about-title-1">XOOXOXOXOXOOXO</span>
        <FaReact />
        <span className="about-title-2">XOXOXOXOXO</span>
      </h2>
    </div>
  );
};

export default IDELocation;
