import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Noise } from "@/components/Noise";
import { CustomCursor } from "@/components/CustomCursor";
import { MotionProvider } from "@/context/MotionContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Ardens Business Solutions | Infrastructure, CCTV, Fiber Networking & Co-working in Dehradun",
    template: "%s | Ardens Business Solutions"
  },
  description:
    "Ardens Business Solutions is a Dehradun-based multi-domain infrastructure company for CCTV installation, fiber networking, server setup, electrical solutions, civil work, office interiors, and co-working space.",
  keywords: [
    "Ardens Business Solutions",
    "CCTV installation Dehradun",
    "fiber networking Dehradun",
    "office interiors Dehradun",
    "server setup Dehradun",
    "co-working space Dehradun",
    "electrical solutions Dehradun",
    "civil construction Dehradun",
    "business infrastructure Uttarakhand"
  ],
  authors: [{ name: "Ardens Business Solutions" }],
  creator: "Ardens Business Solutions",
  publisher: "Ardens Business Solutions",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Ardens Business Solutions | Smart Infrastructure Solutions in Dehradun",
    description:
      "Premium civil, IT, electrical, CCTV, fiber networking, server setup, and workspace solutions for Dehradun businesses.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Enterprise server and infrastructure setup"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ardens Business Solutions | Dehradun Infrastructure Experts",
    description:
      "CCTV, fiber networking, civil construction, office interiors, electrical systems, and co-working space in Dehradun.",
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased selection:bg-blue-500/30 bg-background text-foreground">
        <MotionProvider>
          <Noise />
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
