import Preloader from "@Components/PreLoader";
import "./globals.css";
import SmoothScroll from "@/Components/SmoothComponents";
import { ThemeProvider } from "@/Components/ThemeProvider";

// 1. The SEO Configuration
export const metadata = {
  metadataBase: new URL('https://rinshad.com'), //UY: Replace with your actual domain later
  title: {
    default: "Mohammed Rinshad | Full Stack Developer .NET & React",
    template: "%s | Mohammed Rinshad"
  },
  description: "Portfolio of Mohammed Rinshad, a Full Stack Developer from Tirur, Kerala. Expert in ASP.NET Core, React, and Clean Architecture.",
  keywords: [
    "Mohammed Rinshad", 
    "Rinshad Developer", 
    "Full Stack Developer Kerala", 
    ".NET Developer Malappuram", 
    "React Developer Tirur", 
    "ASP.NET Core Expert"
  ],
  authors: [{ name: "Mohammed Rinshad" }],
  creator: "Mohammed Rinshad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rinshad.com",
    title: "Mohammed Rinshad - Full Stack Developer",
    description: "Building scalable .NET & React applications. View my projects and experience.",
    siteName: "Mohammed Rinshad Portfolio",
    images: [
      {
        url: "/og-image.jpg", // We will create this image later
        width: 1200,
        height: 630,
        alt: "Mohammed Rinshad Portfolio",
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