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
    <div className="text-primary-300 bg-primary-800 flex w-full items-center overflow-auto text-xl">
      {openedPages.map((page) => (
        <IDEPage page={page} key={page} />
      ))}
    </div>
  );
};

export default IDEPages;
