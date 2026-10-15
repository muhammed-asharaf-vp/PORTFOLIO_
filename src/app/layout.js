import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// ✅ SEO + Favicon Config
export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Mohamed Asharaf VP | Front-End Developer | Next.js | React | GSAP | Three.js | TypeScript",
    template: `%s | ${SITE_NAME}`,
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

  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,

  alternates: { canonical: "/" },

  //  Favicon + Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",

  // og:image comes from app/opengraph-image.jsx
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Mohamed Asharaf VP - Front-End Developer",
    description:
      "Building scalable and modern web apps with React, Next.js, GSAP, and Three.js. View my projects and experience.",
    siteName: `${SITE_NAME} Portfolio`,
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

// Pinch-zoom stays enabled (blocking it fails accessibility audits)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
