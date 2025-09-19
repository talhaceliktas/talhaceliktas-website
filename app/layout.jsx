import HomeLayout from "./_components/HomeLayout";
import "./globals.css";

import { Open_Sans, Press_Start_2P, JetBrains_Mono } from "next/font/google";

export const open_sans = Open_Sans();
export const press_start_2p = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});
export const jetbrains_mono = JetBrains_Mono();

export const metadata = {
  title: "celiktas",
  description:
    "I'm Talha Celiktas, a full stack developer and UI/UX designer who turns ideas into reality. I specialize in building responsive, user-friendly web applications and exploring new technologies to create innovative solutions. From designing intuitive interfaces to optimizing backend performance, I enjoy every step of the development process.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="tc-new-price">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/pp-neue-montreal"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <HomeLayout>{children}</HomeLayout>
      </body>
    </html>
  );
}
