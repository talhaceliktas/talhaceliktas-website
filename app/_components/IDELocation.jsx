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
        text: `app > ${pathName} > `,
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
      "+=0.1" // ">” yerine küçük bir delay ile animasyonu başlat
    );
  }, [pathName]);

  return (
    <div className="w-full flex items-center">
      <h2 className="text-xl text-react-blue flex items-center gap-x-4">
        <span className="about-title-1">XOOXOXOXOXOOXO</span>
        <FaReact />
        <span className="about-title-2">XOXOXOXOXO</span>
      </h2>
    </div>
  );
};

export default IDELocation;
