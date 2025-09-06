"use client";

import { useState } from "react";
import Intro from "./Intro";
import Navbar from "./Navbar";
import IDEBox from "./IDEBox";

const pages = ["About", "Portfolio", "Skills", "Contact"];

export default function HomeLayout({ children }) {
  const [introIsVisible, setIntroIsVisible] = useState(false);
  const [openedPages, setOpenedPages] = useState(pages);

  return (
    <main>
      <Intro
        setIntroIsVisible={setIntroIsVisible}
        introIsVisible={introIsVisible}
      />
      <Navbar />
      {!introIsVisible && (
        <IDEBox openedPages={openedPages} setOpenedPages={setOpenedPages}>
          {children}
        </IDEBox>
      )}
    </main>
  );
}
