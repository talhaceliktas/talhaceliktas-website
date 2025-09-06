"use client";

import Intro from "./Intro";
import Navbar from "./Navbar";
import IDEBox from "./IDEBox";
import { useStore } from "../store/store";
import { Toaster } from "react-hot-toast";

export default function HomeLayout({ children }) {
  const { introIsVisible, ideIsFullScreen } = useStore();

  return (
    <main>
      <Intro />
      <Navbar />
      {!introIsVisible && <IDEBox>{children}</IDEBox>}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            backgroundColor: "var(--color-primary-700)",
            color: "var(--color-primary-50)",
          },
          duration: 2000,
        }}
      />
    </main>
  );
}
