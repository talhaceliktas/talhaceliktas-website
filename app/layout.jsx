import HomeLayout from "./_components/HomeLayout";
import AnalyticsTracker from "./_components/AnalyticsTracker";
import "./globals.css";

import Script from "next/script";
import { Open_Sans, Press_Start_2P, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>

      <body className="antialiased">
        <Suspense>
          <AnalyticsTracker />
          <HomeLayout>{children}</HomeLayout>
        </Suspense>
      </body>
    </html>
  );
}
