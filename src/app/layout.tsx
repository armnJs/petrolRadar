import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premium Petrol Radar by Armaan Mangaonkar | High Octane India",
  description:
    "India's first interactive map by Armaan Mangaonkar for locating high-octane (XP100, Power 99, Speed 97) and low-ethanol fuel stations. Real-time tracking across 120+ stations.",
  keywords: [
    "Armaan Mangaonkar",
    "Armaan Mangaonkar projects",
    "Armaan Mangaonkar portfolio",
    "XP100",
    "Power 99",
    "Speed 97",
    "high octane fuel India",
    "low ethanol petrol",
    "E20 fuel stations",
    "premium petrol finder",
    "IOCL HPCL BPCL Shell",
  ],
  authors: [{ name: "Armaan Mangaonkar", url: "https://armaan-mangaonkar.vercel.app" }],
  creator: "Armaan Mangaonkar",
  publisher: "Armaan Mangaonkar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Premium Petrol Radar by Armaan Mangaonkar",
    description:
      "Find XP100, Power 99, Speed 97, and E20 fuel stations across India. Created by Armaan Mangaonkar.",
    type: "website",
    locale: "en_IN",
    url: "https://armaan-mangaonkar.vercel.app",
    siteName: "Premium Petrol Radar by Armaan Mangaonkar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Petrol Radar by Armaan Mangaonkar",
    description: "Locate high octane fuel stations in India.",
    creator: "@armaanmangaonkar",
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
  // Geo tags for India
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "geo.position": "20.5937;78.9629",
    "ICBM": "20.5937, 78.9629",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Premium Petrol Radar",
              "url": "https://armaan-mangaonkar.vercel.app",
              "author": {
                "@type": "Person",
                "name": "Armaan Mangaonkar",
                "url": "https://armaan-mangaonkar.vercel.app"
              },
              "description": "Interactive map for locating high-octane and low-ethanol fuel stations in India, developed by Armaan Mangaonkar.",
              "applicationCategory": "MapsApplication",
              "operatingSystem": "Web",
              "contentLocation": {
                "@type": "Country",
                "name": "India"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-[family-name:var(--font-inter)] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
