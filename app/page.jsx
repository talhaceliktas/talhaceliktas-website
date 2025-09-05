"use client";

import { useState } from "react";
import About from "./_components/About";
import Intro from "./_components/Intro";
import Navbar from "./_components/Navbar";
import IDEBox from "./_components/IDEBox";

const pages = [
  { name: "About", opened: true },
  { name: "Portfolio", opened: false },
  { name: "Skills", opened: true },
  { name: "Contact", opened: false },
];

export default function Home() {
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
          <About />
        </IDEBox>
      )}
    </main>
  );
}
