import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Link from "next/link"; // Use Next.js Link for better SEO performance

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "MetaTube Inspector | Free YouTube Metadata & SEO Analyzer",
    template: "%s | MetaTube Inspector",
  },
  description: "MetaTube Inspector is a free online tool to extract, analyze, and view YouTube video metadata, tags, descriptions, and SEO details. Optimize your video strategy.",
  keywords: [
    "YouTube metadata checker",
    "YouTube SEO tool",
    "video tag extractor",
    "MetaTube Inspector",
    "YouTube analyzer",
    "YouTube video details",
    "free YouTube tool",
  ],
  metadataBase: new URL('https://metatube-inspector.vercel.app/'),
  openGraph: {
    title: "MetaTube Inspector: Free YouTube Metadata & Tag Checker",
    description: "Extract, analyze, and view hidden YouTube video metadata instantly.",
    url: "https://metatube-inspector.vercel.app/",
    siteName: "MetaTube Inspector",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico?v=2",
  },
  other: {
    'google-site-verification': 'XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MetaTube Inspector",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <Header />

        <main className="container mx-auto p-4 flex-1">
          {children}
        </main>
        
        <footer className="w-full text-center py-12 border-t mt-12 bg-muted/10">
            <div className="container mx-auto px-4 flex flex-col gap-6">
              <div className="space-y-2">
                <p className="font-semibold text-lg text-foreground">MetaTube Inspector</p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Helping creators optimize their reach through transparent metadata analysis.
                </p>
              </div>

              {/* Navigation Links - AdSense Requirement */}
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
                <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
              </nav>

              <div className="flex flex-col gap-4 pt-4 border-t border-muted">
                <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
                  <p>&copy; {new Date().getFullYear()} MetaTube Inspector.</p>
                  <span>•</span>
                  <a href="https://github.com/shubh962/metatube-inspector" target="_blank" rel="noreferrer" className="hover:text-primary underline underline-offset-4">GitHub Repository</a>
                </div>

                {/* TaskGuru Integration */}
                <p className="text-xs text-muted-foreground/80">
                  A project by{" "}
                  <a 
                    href="https://www.taskguru.online/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary font-semibold hover:underline"
                  >
                    TaskGuru Online
                  </a>
                </p>
              </div>
            </div>
        </footer>

        <Toaster />
      </body>
    </html>
  );
}
