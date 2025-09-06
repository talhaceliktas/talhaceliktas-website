import { useStore } from "../store/store";
import IDEPage from "./IDEPage";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const IDEPages = () => {
  const { openedPages, addPage } = useStore();
  const path = usePathname();
  const pathName = path.replace("/", "");

  useEffect(() => {
    if (pathName) addPage(pathName);
  }, [pathName, addPage]);

  return (
    <div className="flex items-center text-xl text-react-blue bg-[#1f2228]">
      {openedPages.map((page) => (
        <IDEPage page={page} key={page} />
      ))}
    </div>
  );
};

export default IDEPages;
