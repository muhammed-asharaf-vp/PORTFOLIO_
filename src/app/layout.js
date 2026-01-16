import Preloader from "@/components/PreLoader";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";



// 1. The SEO Configuration
export const metadata = {
  metadataBase: new URL('https://asharaf.vercel.app'),
  title: {
    default: "Mohamed Asharaf VP | Front-End Developer | Next.js  | React | GSAP | Three.js | TypeScript ",
    template: "%s | Mohamed Asharaf VP"
  },
  description: "Portfolio of Mohamed Asharaf VP, a Front-End Developer from Tirur, Kerala. Expert in React , React.",
  keywords: [
    "Mohamed Asharaf VP", 
    "Asharaf Developer", 
    "Front-End Developer Kerala", 
    "React Developer Malappuram", 
    "React Developer Tirur", 
    "React  Expert"
  ],
  authors: [{ name: "Mohamed Asharaf VP" }],
  creator: "Mohamed Asharaf VP",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Asharaf.com",
    title: "Mohamed Asharaf VP - Front-End Developer",
    description: "Building scalable React & React applications. View my projects and experience.",
    siteName: "Mohamed Asharaf VP Portfolio",
    images: [
      {
        url: "/og-image.jpg", // We will create this image later
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Preloader />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}