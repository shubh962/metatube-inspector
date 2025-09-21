import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Free Metadata Extractor Online",
  description:
    "Extract, analyze, and view file metadata instantly with our free online metadata extractor. Supports images, PDFs, videos, audio, and documents.",
  keywords: [
    "metadata extractor",
    "online metadata extractor",
    "free metadata extractor",
    "extract metadata online",
    "image metadata extractor",
    "pdf metadata extractor",
    "video metadata extractor",
    "audio metadata extractor",
    "document metadata extractor",
    "file metadata viewer",
    "meta data analyzer",
    "jpg metadata extractor",
    "png metadata extractor",
    "mp4 metadata extractor",
    "doc metadata extractor",
    "xls metadata extractor",
    "metadata checker",
    "metadata reader",
    "metadata viewer online",
    "online metadata analyzer",
  ],
  openGraph: {
    title: "Free Metadata Extractor Online",
    description:
      "Extract, analyze, and view file metadata instantly with our free online metadata extractor.",
    url: "https://metatube-inspector.vercel.app/",
    siteName: "MetaTube Inspector",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Meta tags for SEO & Indexing */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU" />

        {/* ✅ SEO Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />

        {/* ✅ Canonical */}
        <link rel="canonical" href="https://metatube-inspector.vercel.app/" />

        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico?v=2" />

        {/* ✅ Open Graph */}
        <meta property="og:title" content={metadata.openGraph?.title} />
        <meta property="og:description" content={metadata.openGraph?.description} />
        <meta property="og:url" content={metadata.openGraph?.url} />
        <meta property="og:site_name" content={metadata.openGraph?.siteName} />
        <meta property="og:type" content={metadata.openGraph?.type} />
      </head>

      <body>
        <Header />

        <main className="container mx-auto p-4">
          {children}

          {/* ✅ Main Content Section for SEO */}
          <section className="mt-12 p-6 bg-gray-100 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold mb-4">Free Metadata Extractor Online</h1>
            <p className="mb-4">
              Use our <strong>Metadata Extractor</strong> to instantly extract, analyze, and view hidden metadata from your files. Supports <strong>images, PDFs, videos, audio, and documents</strong>.
              Reveal file creation date, author, device info, GPS location, and more.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Why Use Metadata Extractor?</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Check <strong>image metadata</strong> like camera model, resolution, and EXIF data.</li>
              <li>Extract <strong>PDF metadata</strong> such as title, author, and creation date.</li>
              <li>Analyze <strong>video metadata</strong> (MP4, AVI, MOV) for codec and duration details.</li>
              <li>View <strong>audio metadata</strong> like MP3 tags, album name, and bitrate.</li>
              <li>Inspect <strong>document metadata</strong> (DOC, XLS, PPT) for hidden information.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Features of Our Free Metadata Extractor</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>✔ 100% Free & Online</li>
              <li>✔ No installation required</li>
              <li>✔ Supports multiple file formats</li>
              <li>✔ Safe & secure file handling</li>
              <li>✔ Instant results with detailed file information</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Frequently Asked Questions</h2>
            <div className="mb-4">
              <h3 className="text-lg font-bold">1. What is metadata?</h3>
              <p>Metadata is hidden information stored inside files. For example, an image can contain details like camera type, date, and location.</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold">2. Is this Metadata Extractor safe?</h3>
              <p>Yes! Our tool processes files securely and does not store or share your data.</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold">3. Which file types are supported?</h3>
              <p>Images (JPG, PNG), PDFs, videos (MP4, AVI), audio (MP3, WAV), and documents (DOC, XLS, PPT).</p>
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Conclusion</h2>
            <p>
              Start using our <strong>Free Metadata Extractor Online</strong> today to uncover hidden details in your files. Perfect for photographers, students, security experts, and curious users alike.
            </p>
          </section>
        </main>

        <Toaster />
      </body>
    </html>
  );
}
