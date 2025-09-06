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
    <div className="text-react-blue flex items-center bg-[#1f2228] text-xl">
      {openedPages.map((page) => (
        <IDEPage page={page} key={page} />
      ))}
    </div>
  );
};

export default IDEPages;
