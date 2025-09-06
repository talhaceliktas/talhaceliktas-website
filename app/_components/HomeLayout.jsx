"use client";

import { useState } from "react";
import Intro from "./Intro";
import Navbar from "./Navbar";
import IDEBox from "./IDEBox";
import { useStore } from "../store/store";

export default function HomeLayout({ children }) {
  const { introIsVisible } = useStore();

  return (
    <main>
      <Intro />
      <Navbar />
      {!introIsVisible && <IDEBox>{children}</IDEBox>}
    </main>
  );
}
