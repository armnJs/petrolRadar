import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#020617",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://petrol-radar.vercel.app"),
  title: "Premium Petrol Radar | Real-Time High Octane Fuel Tracking India",
  description:
    "India's premier map for high-octane (XP100) & low-ethanol fuel stations. Real-time tracking & ML analytics by Armaan Mangaonkar.",
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://petrol-radar.vercel.app",
    },
  },
  keywords: [
    "Armaan Mangaonkar",
    "Armaan Mangaonkar projects",
    "Armaan Mangaonkar portfolio",
    "XP100",
    "Power 99",
    "Speed 97",
    "high octane fuel India",
    "low ethanol petrol",
    "E20 ethanol blend",
    "premium petrol finder",
    "high-compression engines",
    "green transition",
    "machine learning radar",
    "ultra-premium fuel supply",
    "BS-VI Stage 2",
    "Facebook Prophet forecasting",
    "XGBoost demand models",
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
    title: "Premium Petrol Radar | Real-Time High Octane Fuel Tracking India",
    description:
      "India's premier map for high-octane (XP100) & low-ethanol fuel stations. Real-time tracking & ML analytics by Armaan Mangaonkar.",
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
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
              });
              document.addEventListener('keydown', function(e) {
                // Prevent F12
                if (e.key === 'F12') {
                  e.preventDefault();
                }
                // Prevent Ctrl+Shift+I / Cmd+Option+I
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
                  e.preventDefault();
                }
                // Prevent Ctrl+Shift+C / Cmd+Option+C
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
                  e.preventDefault();
                }
                // Prevent Ctrl+U / Cmd+U (View Source)
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
                  e.preventDefault();
                }
              });
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Premium Petrol Radar",
                "url": "https://petrol-radar.vercel.app",
                "author": {
                  "@type": "Person",
                  "name": "Armaan Mangaonkar",
                  "url": "https://armaan-mangaonkar.vercel.app"
                },
                "description": "Interactive map for locating high-octane and low-ethanol fuel stations in India.",
                "applicationCategory": "MapsApplication",
                "operatingSystem": "Web",
                "contentLocation": {
                  "@type": "Country",
                  "name": "India"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Premium Petrol Radar Network",
                "image": "https://petrol-radar.vercel.app/icon.tsx",
                "url": "https://petrol-radar.vercel.app",
                "telephone": "",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "20.5937",
                  "longitude": "78.9629"
                }
              }
            ])
          }}
        />
      </head>
      <body 
        className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-[family-name:var(--font-inter)] transition-colors duration-300 select-none"
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
