import Preloader from "@/components/PreLoader";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";

// ✅ SEO + Favicon Config
export const metadata = {
  metadataBase: new URL("https://asharaf.vercel.app"),

  title: {
    default:
      "Mohamed Asharaf VP | Front-End Developer | Next.js | React | GSAP | Three.js | TypeScript",
    template: "%s | Mohamed Asharaf VP",
  },

  description:
    "Portfolio of Mohamed Asharaf VP, a Front-End Developer from Tirur, Kerala. Specialized in React, Next.js, GSAP animations, Three.js, and modern UI development.",

  keywords: [
    "Mohamed Asharaf VP",
    "Asharaf VP",
    "Front-End Developer",
    "Frontend Developer Kerala",
    "React Developer",
    "Next.js Developer",
    "GSAP Developer",
    "Three.js Developer",
    "TypeScript Developer",
    "Portfolio Website",
  ],

  authors: [{ name: "Mohamed Asharaf VP" }],
  creator: "Mohamed Asharaf VP",

  //  Favicon + Icons
  icons: {
    icon: [
      { url: "/favicon.ico" }, // best for browsers
      { url: "/favicon.png", type: "image/png" }, // your MA logo png
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asharaf.vercel.app",
    title: "Mohamed Asharaf VP - Front-End Developer",
    description:
      "Building scalable and modern web apps with React, Next.js, GSAP, and Three.js. View my projects and experience.",
    siteName: "Mohamed Asharaf VP Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohamed Asharaf VP Portfolio",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

//  Recommended for mobile + theme
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Preloader />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
