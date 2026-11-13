import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// JetBrains Mono (OFL), latin subset, variable 100–800. Kept in the repo instead of
// next/font/google so dev and builds never fall back to Arial when Google Fonts
// can't be reached (the wider fallback overflowed the hero skill pills).
const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-latin.woff2",
  weight: "100 800",
  variable: "--font-jetbrains",
  display: "swap",
});

// Fontshare (free for commercial use). One font per request: the API only reads the first `f[]`
const FONTSHARE = [
  "https://api.fontshare.com/v2/css?f[]=panchang@800&display=swap",
  "https://api.fontshare.com/v2/css?f[]=general-sans@300,400,700&display=swap",
];

// ✅ SEO + Favicon Config
export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Mohamed Asharaf VP | Front-End Developer | Next.js | React | GSAP | Three.js | TypeScript",
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Portfolio of Mohamed Asharaf VP, a Front-End Developer from Palakkad, Kerala. Specialized in React, Next.js, GSAP animations, Three.js, and modern UI development.",

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
  // The site starts light and ignores the OS theme, so the browser chrome stays white too
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        {/* Preloader already played this session (or reduced motion): hide it from the very
            first paint so a refresh never flashes the overlay before React hydrates. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.setAttribute('data-js','1');try{if(sessionStorage.getItem('preloader_done')==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-pl','done')}}catch(e){}",
          }}
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        {FONTSHARE.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
