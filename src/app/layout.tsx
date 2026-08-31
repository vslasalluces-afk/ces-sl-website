import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CESAssistant from "@/components/CESAssistant";
import CookieConsent from "@/components/CookieConsent";
import SessionProvider from "@/components/SessionProvider";
import { OrganizationJsonLd } from "@/components/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8B195",
};

export const metadata: Metadata = {
  title: {
    default: "CES SL – Transforming Communities. Empowering Lives.",
    template: "%s | CES SL",
  },
  description:
    "Christian Extension Services works with vulnerable communities in Sierra Leone through training, empowerment and sustainable development initiatives. More than 46 years of community service.",
  keywords: [
    "CES",
    "Christian Extension Services",
    "Sierra Leone",
    "NGO Sierra Leone",
    "community development",
    "sustainable development Sierra Leone",
    "Koinadugu",
    "Christian organisation Sierra Leone",
    "women empowerment Sierra Leone",
    "VSLA Sierra Leone",
    "farmer field schools",
    "rural development Africa",
  ],
  authors: [{ name: "Christian Extension Services" }],
  creator: "Christian Extension Services",
  publisher: "Christian Extension Services",
  metadataBase: new URL("https://cessl.org"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "fr": "/fr",
      "es": "/es",
      "de": "/de",
      "zh": "/zh",
    },
  },
  openGraph: {
    type: "website",
    siteName: "CES SL",
    title: "CES SL – Transforming Communities. Empowering Lives.",
    description:
      "Christian Extension Services works with vulnerable communities in Sierra Leone through training, empowerment and sustainable development initiatives.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CES SL – Transforming Communities. Empowering Lives.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CES SL – Transforming Communities. Empowering Lives.",
    description:
      "Christian Extension Services works with vulnerable communities in Sierra Leone through training, empowerment and sustainable development initiatives.",
    images: ["/og-image.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <OrganizationJsonLd />
      </head>
      <body className="bg-warm-white text-charcoal antialiased min-h-screen flex flex-col">
        <SessionProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <CESAssistant />
          <CookieConsent />
        </SessionProvider>
      </body>
    </html>
  );
}
