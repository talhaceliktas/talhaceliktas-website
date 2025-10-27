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
  title: "Talha Celiktas – Portfolio",
  description:
    "Personal portfolio website of Talha Celiktas. Showcasing projects, skills, and technologies with a modern VS Code-inspired interface, 3D visuals, and smooth animations.",
  keywords: [
    "Talha Celiktas",
    "Portfolio",
    "Web Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Three.js",
    "GSAP",
  ],
  authors: [{ name: "Talha Celiktas", url: "https://talhaceliktas" }],
  creator: "Talha Celiktas",
  metadataBase: new URL("https://talhaceliktas"),
  openGraph: {
    title: "Talha Celiktas – Portfolio",
    description:
      "Explore Talha Celiktas' portfolio – featuring interactive projects, 3D designs, and modern frontend technologies.",
    url: "https://talhaceliktas",
    siteName: "Talha Celiktas – Portfolio",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.ico",
  },
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
